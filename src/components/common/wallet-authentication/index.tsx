import React, { useState, useEffect } from "react";
import {
  FContainer,
  // FCard,
  FCardTitle,
  FButton,
  // FGrid,
  // FGridItem,
  // FItem,
} from "ferrum-design-system";
import { Web3AuthWrapper } from "./WalletAuthenticationForm";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getAccessTokenForApplicationUser } from "../../../_apis/WalletAuthencation";
import { ME_TAG, TOKEN_TAG } from "../../../utils/const.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getErrorMessage } from "../../../utils/global.utils";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [applicationUserToken, setApplicationUserToken] = useState("");
  const user = localStorage.getItem(ME_TAG);
  const parsedUser = user && JSON.parse(user);
  const token = localStorage.getItem(TOKEN_TAG);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  useEffect(() => {
    getAccessToken();
  }, []);

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

  const AuthenticationProp = (props: any) => (
    <FButton
      postfix={props.loading && <ClipLoader color="#fff" size={20} />}
      className={"w-100 f-mt-1"}
      disabled={props.loading}
      type="submit"
      {...props}
      title={props.text}
    ></FButton>
  );

  return (
    <FContainer width={500}>
      {isVerified ? (
        <>
          <h2 className="f-mb-2">Wallet Connected!</h2>
          <p className="grey-secondary">
            Now it's time to authenticate ownership of your Wallet.{" "}
          </p>
        </>
      ) : (
        <>
          <FCardTitle>
            <h2 className="f-mb-2"> Connect Wallet! </h2>
          </FCardTitle>
          <p className="grey-secondary">
            {" "}
            Please connect your wallet for the authentication process.{" "}
          </p>
        </>
      )}
      <Web3AuthWrapper
        View={AuthenticationProp}
        email={parsedUser?.email}
        user={parsedUser}
        token={token}
        setIsVerified={setIsVerified}
        applicationUserToken={applicationUserToken}
      />
    </FContainer>
  );
};

export default Index;
