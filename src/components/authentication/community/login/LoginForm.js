import React, { useState, useEffect } from "react";
import {
  FInputTextField,
  FGrid,
  FContainer,
  FGridItem,
  FButton,
  FItem,
} from "ferrum-design-system";
import { useHistory, Link } from "react-router-dom";
import { RiEyeOffFill, RiEyeLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { communityMemberLogin } from "../../../../_apis/OnboardingCrud";
import { walletAddressAuthenticateCheckOnSignin, getAccessTokenForApplicationUser } from "../../../../_apis/WalletAuthencation";
import { PATH_AUTH, PATH_PUBLIC_USER } from "../../../../routes/paths";
import * as validations from "../../../../utils/validations";
import ClipLoader from "react-spinners/ClipLoader";
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";

const LoginForm = () => {
  const history = useHistory();
  const [viewPassword, setViewPassword] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("ETHEREUM");
  const [web3, setWeb3] = useState(null);
  const [applicationUserToken, setApplicationUserToken] = useState("");

  useEffect(() => {
    getAccessToken();
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

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

  const connectWeb3 = async (values) => { 
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
      onSubmit(values, network, address);
    } catch (e) {
      toast.error(`Error Occured ${e}`); 
    }
  };

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: initialValues });

  const checkIsUserWalletAddressAuthenticated = async (userId, address,  ferrumNetworkIdentifier,  applicationUserToken  ) => {
    try {
      const res = await walletAddressAuthenticateCheckOnSignin(userId,address, 4 , applicationUserToken  );
      return res.data.body.isAuthenticated;
    } catch (e) {
      console.log(e.response.data.status.message);
      throw e?.response?.data?.status?.message;
    }
  };

  const disconnectWeb3 = async () => {
    const modal = web3Modal();
    await modal.clearCachedProvider();
  };

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
 
  const getAccessToken = () => {
    getAccessTokenForApplicationUser()
      .then((res) => {
        if (res?.data?.body?.token) {
          setApplicationUserToken(res.data.body.token);
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.status.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

const checkWalletAddress = async (user , token, response, network, address) => { 
    try {
    let isAuthenticated = await checkIsUserWalletAddressAuthenticated(user._id, address, network, applicationUserToken  );
    if (isAuthenticated === true) {
        localStorage.setItem("token", token);
        toast.success(response.data.status.message);
        history.push(PATH_PUBLIC_USER.multiLeaderboard.detailLeaderBoardByProvidedId);
    } else {
        toast.error("Please connect and authenticate your wallet first!");
        history.push(PATH_AUTH.communityWalletAuthentication);
    } }catch (e){
        toast.error(`Error Occured ${e}`); 
    }
}

  const onSubmit = async (values, network, address) => { 
    await communityMemberLogin(values)
      .then((response) => {
        const { user } = response.data.body;
        const { token } = response.data.body;
        localStorage.setItem("me", JSON.stringify(user));
        if (token) {
          if (user.isEmailAuthenticated === true) {
              checkWalletAddress(user, token, response, network, address);
          } else {
            toast.error("Please verify your email first!");
            history.push(PATH_AUTH.communityResendCode);
          }
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      }); 
  };

  return (
    <>
      <Toaster />
      <FContainer width={700}>
        <form autoComplete="true" onSubmit={handleSubmit(connectWeb3)}>
          <FGrid className={"f-mt-1"}>
            <FGridItem size={[12]}>
              <FInputTextField
                label="Email"
                name="email"
                type="email"
                className={"w-100"}
                placeholder="Please enter you email"
                register={register}
                validations={{
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  minLength: { value: 3, message: validations.MIN_LENGTH("3") },
                  maxLength: {
                    value: 50,
                    message: validations.MAX_LENGTH("50"),
                  },
                  pattern: {
                    value: validations.EMAIL_REGEX,
                    message: "Invalid email format",
                  },
                }}
                error={errors["email"]?.message ? errors["email"]?.message : ""}
              />
            </FGridItem>
          </FGrid>
          <FGrid>
            <FGridItem size={[12]}>
              <FInputTextField
                label="Password"
                name="password"
                className={"f-mt-1"}
                type={!viewPassword ? "password" : "text"}
                placeholder="Password"
                register={register}
                postfix={viewPassword ? <RiEyeLine /> : <RiEyeOffFill />}
                postfixAction={() => {
                  setViewPassword(!viewPassword);
                }}
                validations={{
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: { value: 3, message: validations.MIN_LENGTH("3") },
                  maxLength: {
                    value: 20,
                    message: validations.MAX_LENGTH("20"),
                  },
                  // pattern: {
                  //     value: validations.PASSWORD_REGEX,
                  //     message:
                  //         "Password must be at least six characters long, Contain letters and numbers",
                  // },
                }}
                error={
                  errors["password"]?.message ? errors["password"]?.message : ""
                }
              />
            </FGridItem>
          </FGrid>
          <FGrid>
            <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
              <FButton
                type="submit"
                title={"Login"}
                className={"f-mt-1"}
                postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
              ></FButton>
            </FGridItem>
          </FGrid>
          <FItem align={"center"} className={"f-mt-1 w-100"}>
            Don’t have an account?
            <Link
              className="primary-color text-decoration-none "
              to={PATH_AUTH.communityRegister}
            >
              Get started
            </Link>
          </FItem>
        </form>
      </FContainer>
    </>
  );
};

export default LoginForm;
