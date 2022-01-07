import React, { useState, useEffect } from "react";
import { FContainer, FCard, FCardTitle, FButton, FGrid, FGridItem, FItem } from "ferrum-design-system";
import { Web3AuthWrapper } from "./WalletAuthenticationForm";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";
import { getAccessTokenForApplicationUser } from "../../../../_apis/WalletAuthencation";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [applicationUserToken, setApplicationUserToken] = useState("");
  const user = localStorage.getItem('me');
  const parsedUser = user && JSON.parse(user);
  const token = localStorage.getItem('token');

  useEffect(() => {
   getAccessToken();
  }, [])

  const getAccessToken = () => {
    getAccessTokenForApplicationUser()
      .then((res: any) => {
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
  }

  const AuthenticationProp = (props: any) => <FButton postfix={ props.loading && <ClipLoader color="#fff" size={20} />}  disabled={props.loading} type="submit" {...props} title={props.text}></FButton>


  return (
    <FContainer type="fluid">
      <FContainer width={700}>
        <FCard variant="primary">
          {isVerified ? (
            <>
              <FCardTitle>
                <h3>Wallet Connected!</h3>
              </FCardTitle>
              <h5>Now it's time to authenticate ownership of your Wallet. </h5>
            </>
          ) : (
            <> <FCardTitle>
              <h3> Connect Wallet! </h3>
            </FCardTitle>
              <h5> Please connect your wallet for the authentication process. </h5>
            </>)}
            <FItem align="center" className={"w-100 f-mt-1"} >
              <Web3AuthWrapper View={AuthenticationProp} email={parsedUser?.email} user={parsedUser} token={token} setIsVerified={setIsVerified} applicationUserToken = {applicationUserToken} />
             </FItem>
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default Index;
