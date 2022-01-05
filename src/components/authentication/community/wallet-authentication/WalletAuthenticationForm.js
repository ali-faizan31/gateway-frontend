import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verify } from 'jsonwebtoken';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import toast, { Toaster } from "react-hot-toast";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
import { walletAuthenticationBackendURL } from "../../../../utils/const.utils";
import { PATH_PUBLIC_USER } from "../../../../routes/paths";
import { updateUser } from "../../../../_apis/OnboardingCrud";

const FetchApi = async (req) => {
  try {
    const res = await fetch(walletAuthenticationBackendURL, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(req),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resText = await res.text();
    if (Math.round(res.status / 100) === 2) {
      return resText ? JSON.parse(resText) : undefined;
    }
    const error = resText;
    try {
      const jerror = JSON.parse(error);
    } catch (e) {
      console.log(
        `Server returned an error when calling + ${req} ${JSON.stringify({
          status: res.status,
          statusText: res.statusText,
          error,
        })} ${new Error()}`
      );
      throw new Error(error);
    }
  } catch (e) {
    console.log(`Error calling api with  + ${JSON.stringify(req)}, ${e}`);
    throw e;
  }
};

export const web3AuthSlice = createSlice({
  name: "web3åAuthSlice",
  initialState: {
    address: "",
    email: "",
  },
  reducers: {
    addressInfoFetched: (state, action) => {
      state.address = action.payload.address;
      state.email = action.payload.email;
    },
  },
});

const Actions = web3AuthSlice.actions;

const checkSession = async () => {
  const session = await localStorage.getItem('token'); 
  if(session){
      try {
          const isValid = verify(session||'','secret');
          if(isValid.data){
              return isValid.data
          }
          return false
      } catch (error) {
          return false
      }       
  }
  return false
}
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        1: "https://mainnet.infura.io/v3/498f412c002d42d8ba75293910cae6f8",
        4: "https://rinkeby.infura.io/v3/498f412c002d42d8ba75293910cae6f8",
        56: "https://bsc-dataseed.binance.org/",
        97: "https://bsc-dataseed.binance.org/",
      },
    },
  },
};

const web3Modal = () =>
  new Web3Modal({
    cacheProvider: true,
    providerOptions, // required
  });

function initWeb3(provider) {
  const web3 = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  });

  return web3;
}

export function Web3AuthWrapper(props) {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("ETHEREUM");
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const history = useHistory();

  const connectWeb3 = async () => {
    setLoading(true);
    try {
      const modal = web3Modal();
      const provider = await modal.connect();
      const web3 = await initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.chainId();
      await subscribeProvider(provider, web3);
      const address = accounts[0];
      setWeb3(web3);
      setNetwork(network);
      setConnected(true);
      setAddress(address);
      console.log(address, "====");
    } catch (e) {
      toast.error(`Error Occured ${e}`);
      console.log(e, "error====");
    } finally {
      setLoading(false);
    }
  };

  const disconnectWeb3 = async () => {
    const modal = web3Modal();
    await modal.clearCachedProvider();
  };

  const validateUserAddr = async () => {
    setLoading(true);
    if (props.email && props.user && props.token) {
      await dispatch(validateAddress({ web3, address, email: props.email }));
      await disconnectWeb3();
    } else {
      toast.error(`User not found!`);
    }
    setLoading(false);
  };

  const validateAddress = createAsyncThunk("connect", async (payload) => {
    try {
      const session = await checkSession();
      console.log("session", session);
      if (session) {
        return;
      }
      const data = {
        command: "authenticateAddress",
        data: { address: payload.address, email: payload.email || "" },
      };
      const res = await FetchApi(data);
      if (payload.web3) {
        const connection = payload.web3;
        const accounts = (await connection?.eth.getAccounts()) || "";
        const from = accounts[0];
        const msg = `0x${Buffer.from(
          `This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.${res.nonce}`,
          "utf8"
        ).toString("hex")}`;

        try {
          await connection.currentProvider.sendAsync(
            {
              method: "personal_sign",
              params: [
                msg,
                from,
                "This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.",
              ],
            },
            async (err, result) => {
              console.log(result);
              if (result.result) {
                const data = {
                  command: "verifySignature",
                  data: {
                    signature: result.result,
                    info: {
                      nonce: res.nonce,
                      address: from,
                      email: payload.email || "test@gmail.com",
                    },
                  },
                };
                const response = await FetchApi(data);
                console.log(response, "response=====");
                if (response.user.nonce) {
                  setUserData(response.user);
                }
              }
            }
          );
        } catch (e) {
          console.log(
            `Signature Verification failed, kindly ensure you are connected to right account ${e}`
          );
          toast.error(
            `Signature Verification failed, kindly ensure you are connected to right account ${e}`
          );
        }
      }
    } catch (e) {
      toast.error(`Error occured ${e}`);
      console.log(e, "error occured");
    }
  });

  const subscribeProvider = async (provider, web3) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => disconnectWeb3());
    provider.on("onConnect", async (accounts) => {
      console.log(accounts, "pppp");
      setAddress(accounts[0]);
    });

    provider.on("accountsChanged", async (accounts) => {
      console.log(accounts);
      setAddress(accounts[0]);
      setConnected(false);
    });
    provider.on("chainChanged", async (chainId) => {
      const networkId = await web3.eth.net.getId();
      setNetwork(chainId);
      console.log(networkId);
    });

    provider.on("networkChanged", async (networkId) => {
      const chainId = await web3.eth.chainId();
      setNetwork(chainId);
    });
  };

  useEffect(() => {
    if (userData.email) {
      UpdateUserWithWalletAddress(userData);
    }
  }, [userData]);

  const UpdateUserWithWalletAddress = (user) => {
    user.isWalletAddressAuthenticated = true;
    user.walletAddress = user?.address;
    user.firstName = props?.user?.firstName;
    user.lastName = props?.user?.lastName;
    updateUser(user, props.token)
      .then((response) => {
        const { user } = response.data.body;
        localStorage.setItem("me", JSON.stringify(user));
        toast.success(response.data.status.message);
        history.push(PATH_PUBLIC_USER.multiLeaderboard.root);
      })
      .catch((e) => {
        console.log(e);
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  return (
    <>
      <props.View
        connected={connected.toString()}
        network={network}
        onClick={() => (!connected ? connectWeb3() : validateUserAddr())}
        loading={loading}
        text={connected ? "Validate Address" : "Connect Wallet to Validate"}
      />
    </>
  );
}
