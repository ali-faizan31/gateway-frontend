import React, { useState, useEffect } from "react";
import {
  FInputText,
  FGrid,
  FGridItem,
  FButton,
  FItem,
} from "ferrum-design-system";
import { useHistory, Link } from "react-router-dom";
import { RiEyeOffFill, RiEyeLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { organizationAdminLogin } from "../../../../_apis/OnboardingCrud";
import {
  PATH_AUTH,
  PATH_DASHBOARD,
  //   PATH_PUBLIC_USER,
} from "../../../../routes/paths";
import * as validations from "../../../../utils/validations";
import ClipLoader from "react-spinners/ClipLoader";
import {
  getAccessTokenForApplicationUser,
} from "../../../../_apis/WalletAuthencation";
import { ME_TAG, TOKEN_TAG } from "../../../../utils/const.utils";
import { walletConnectorActions } from "../../../../container-components/wallet-connector";
import * as walletAuthenticatorActions from "../../../common/wallet-authentication/redux/walletAuthenticationActions";
import { useDispatch, useSelector } from "react-redux";
import { getErrorMessage } from "../../../../utils/global.utils";
import { RootState } from "../../../../redux/rootReducer";

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [viewPassword, setViewPassword] = useState(false);
  const [applicationUserToken, setApplicationUserToken] = useState("");
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  useEffect(() => {
    getAccessToken();
  }, []);

  const initialValues = {
    email: "",
    password: "",
  };

  const {
    // reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({ defaultValues: initialValues });

  const getAccessToken = () => {
    getAccessTokenForApplicationUser()
      .then((res: any) => {
        if (res?.data?.body?.token) {
          setApplicationUserToken(res.data.body.token);
        }
      })
      .catch((e: any) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  // const checkIsUserWalletAddressAuthenticated = async (
  //   userId: any,
  //   walletInformation: any
  // ) => {
  //   try {
  //     const res = await walletAddressAuthenticateCheckOnSignin(
  //       userId,
  //       walletInformation?.address,
  //       walletInformation?.network.toString(),
  //       applicationUserToken
  //     );
  //     return res.data.body.isAuthenticated;
  //   } catch (e: any) {
  //     throw e?.response?.data?.status?.message;
  //   }
  // };

  // const checkWalletAddress = async (
  //   user: any,
  //   token: any,
  //   response: any,
  //   walletInformation: any
  // ) => {
  //   try {
  //     let isAuthenticated = await checkIsUserWalletAddressAuthenticated(
  //       user._id,
  //       walletInformation
  //     );
  //     if (isAuthenticated === true) {
  //       localStorage.setItem(TOKEN_TAG, token);
  //       toast.success(response.data.status.message);
  //       // history.push(PATH_PUBLIC_USER.multiLeaderboard.detailLeaderBoardByProvidedId);
  //       history.push(PATH_DASHBOARD.general.leaderboardManagement);
  //     } else {
  //       toast.error("Please connect and authenticate your wallet first!");
  //       history.push(PATH_AUTH.walletAuthentication);
  //     }
  //   } catch (e) {
  //     toast.error(`Error Occured ${e}`);
  //   }
  // };

  const removeOldSession = () => {
    localStorage.removeItem(TOKEN_TAG);
    localStorage.removeItem(ME_TAG);
    dispatch(walletConnectorActions.resetWalletConnector());
    dispatch(
      walletAuthenticatorActions.resetWalletAuthentication({
        userToken: applicationUserToken,
      })
    );
    dispatch(
      walletAuthenticatorActions.removeSession({
        userToken: applicationUserToken,
      })
    );
  };

  const onSubmit = async (values: any) => {
    // let walletInformation = await connectWeb3(setAddress, setConnected, setWeb3, setNetwork, toast);
    removeOldSession();
    await organizationAdminLogin(values)
      .then((response: any) => {
        const { user } = response.data.body;
        const { token } = response.data.body;
        localStorage.setItem(ME_TAG, JSON.stringify(user));
        localStorage.setItem(TOKEN_TAG, token);
        dispatch(walletAuthenticatorActions.saveME({ meV2: user }));
        dispatch(walletAuthenticatorActions.saveToken({ tokenV2: token, })
        );
        if (token) {
          history.push(PATH_DASHBOARD.general.leaderboardManagement);
          //     if (user.isEmailAuthenticated === true) {
          //         checkWalletAddress(user, token, response, walletInformation);
          //      } else {
          //         toast.error('Please verify your email first!');
          //         history.push(PATH_AUTH.emailResendCode);
          //     }
        }
      })
      .catch((e: any) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  return (
    <>
      <Toaster />
      <form
        autoComplete="true"
        onSubmit={handleSubmit((values) => onSubmit(values))}
      >
        <FGrid className={"f-mt-1"}>
          <FGridItem size={[12]}>
            <FInputText
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
                maxLength: { value: 50, message: validations.MAX_LENGTH("50") },
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
            <FInputText
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
              }}
              error={
                errors["password"]?.message ? errors["password"]?.message : ""
              }
            />
          </FGridItem>
        </FGrid>
        <FButton
          type="submit"
          title={"Login"}
          className={"w-100 f-mt-1"}
          postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
        ></FButton>
        <FItem align={"center"} className={"f-mt-1 w-100"}>
          Don’t have an account?
          <Link
            className="primary-color text-decoration-none "
            to={PATH_AUTH.orgRegister}
          >
            Get started
          </Link>
        </FItem>
      </form>
    </>
  );
};

export default LoginForm;
