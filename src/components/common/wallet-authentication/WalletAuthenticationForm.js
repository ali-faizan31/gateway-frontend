import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { verify } from 'jsonwebtoken';
import { useHistory } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";
import toast, { Toaster } from "react-hot-toast";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider"; 
import { PATH_DASHBOARD, PATH_PUBLIC_USER } from "../../../routes/paths";
import { checkUniqueWalletAddressAndAuthenticated, saveAddressAndGenerateNonce, getIp, verifySignatureAndUpdateNonce } from "../../../_apis/WalletAuthencation";
 
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
      props.setIsVerified(true);
      setAddress(address); 
    } catch (e) {
      toast.error(`Error Occured ${e}`); 
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

    if (props.email && props.user) {
      await dispatch(validateAddress({ web3, address, network, email: props.email, applicationUserToken: props.applicationUserToken, user: props.user }));
      await disconnectWeb3();
    } else {
      toast.error(`User not found!`);
    }
    setLoading(false);
  };

  const isUserWalletAddressUniqueAndAuthenticated = async (address, network, applicationUserToken) => {
    try {
      const res = await checkUniqueWalletAddressAndAuthenticated(`${address}`, network, applicationUserToken)
      return res.data.body.isUnique;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }
  
  const saveUserWalletAddressAndGenerateNonce = async (userId, values, applicationUserToken) => { 
    try {
      const res = await saveAddressAndGenerateNonce(userId, values, applicationUserToken)
      return res?.data?.body?.address?.nonce;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }

  const saveUserSignatureAndGenerateNonce = async (userId, values, applicationUserToken) => {
     try {
      const res = await verifySignatureAndUpdateNonce(userId, values, applicationUserToken)
      return res?.data?.body;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }

  const validateAddress = createAsyncThunk("connect", async (payload) => {
    try {
      const session = await checkSession(); 
      if (session) {
        return;
      }  

      const uniqueResponse = await isUserWalletAddressUniqueAndAuthenticated(payload.address, payload.network.toString(), payload.applicationUserToken)

      if ( uniqueResponse === true){
        const ipResponse = await getIp();
        const ipAddress = ipResponse?.data?.ip;
        const data = { address: payload.address , ferrumNetworkIdentifier: payload.network.toString(), lastConnectedIpAddress: ipAddress};
      
         const nonceResponse = await saveUserWalletAddressAndGenerateNonce(payload.user._id, data, payload.applicationUserToken);
          
         if (payload.web3) {
          const connection = payload.web3;
          const accounts = (await connection?.eth.getAccounts()) || "";
          const from = accounts[0];
          const msg = `0x${Buffer.from(
            `This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.${nonceResponse}. id: ${payload.network}`,
            "utf8"
          ).toString("hex")}`;

          try {
            await connection.currentProvider.sendAsync(
              {
                method: "personal_sign",
                params: [msg, from, "This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner."],
              },
              async (err, result) => { 
                if (result.result) {
                  const data = {signature: result.result,address: payload.address , ferrumNetworkIdentifier: payload.network.toString(), ipAddress: ipAddress }
                  try {
                    const saveResponse = await saveUserSignatureAndGenerateNonce(payload.user._id, data, payload.applicationUserToken); 
                     if (saveResponse && saveResponse.address.nonce){
                      if ( props && props.user && props.user.role === "organizationAdmin") {
                      history.push(PATH_DASHBOARD.general.leaderboardManagement) 
                      } else if (props && props.user && props.user.role === "communityMember") {
                        history.push(PATH_PUBLIC_USER.multiLeaderboard.detailLeaderBoardByProvidedId);
                      }
                    }
                  } catch (e) {
                    toast.error(`Error occured ${e}`); 
                  }
                }
              }
            )
          }  catch (e) { 
            toast.error(`Signature Verification failed, kindly ensure you are connected to right account ${e}`);
          }
        }
      } else {
        throw "Address not unique"
      } 
    } catch (e) {
      toast.error(`Error occured ${e}`); 
    }
  });

  const subscribeProvider = async (provider, web3) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => disconnectWeb3());
    provider.on("onConnect", async (accounts) => { 
      setAddress(accounts[0]);
    });

    provider.on("accountsChanged", async (accounts) => { 
      setAddress(accounts[0]);
      setConnected(false);
      props.setIsVerified(false);
    });
    provider.on("chainChanged", async (chainId) => {
      const networkId = await web3.eth.net.getId();
      setNetwork(chainId); 
    });

    provider.on("networkChanged", async (networkId) => {
      const chainId = await web3.eth.chainId();
      setNetwork(chainId);
    });
  };
 

  return (
    <>
    <Toaster/>
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
