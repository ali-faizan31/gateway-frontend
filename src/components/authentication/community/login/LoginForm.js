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
import { connectWeb3 } from "../../../../utils/connetWalletHelper";

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

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: initialValues });

  const checkIsUserWalletAddressAuthenticated = async (userId, walletInformation) => {
    try {
      const res = await walletAddressAuthenticateCheckOnSignin(userId,  walletInformation?.address, walletInformation?.network, applicationUserToken  );
      return res.data.body.isAuthenticated;
    } catch (e) {
      console.log(e.response.data.status.message);
      throw e?.response?.data?.status?.message;
    }
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

const checkWalletAddress = async (user , token, response, walletInformation) => { 
    try {
    let isAuthenticated = await checkIsUserWalletAddressAuthenticated(user._id, walletInformation );
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

  const onSubmit = async (values) => { 
    let walletInformation = await connectWeb3(setAddress, setConnected, setWeb3, setNetwork, toast); 
    await communityMemberLogin(values)
      .then((response) => {
        const { user } = response.data.body;
        const { token } = response.data.body;
        localStorage.setItem("me", JSON.stringify(user));
        if (token) {
          if (user.isEmailAuthenticated === true) {
              checkWalletAddress(user, token, response, walletInformation);
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
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
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