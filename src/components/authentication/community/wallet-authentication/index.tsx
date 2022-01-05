import React, { useState } from "react";
import { FContainer, FCard, FCardTitle, FButton, FGrid, FGridItem } from "ferrum-design-system";
import { Web3AuthWrapper } from "./WalletAuthenticationForm";
import { ClipLoader } from "react-spinners";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const user = localStorage.getItem('me');
  const parsedUser = user && JSON.parse(user);
  const token = localStorage.getItem('token');


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
          <FGrid>
            <FGridItem alignX="center" className={"f-mt-1"}>
              <Web3AuthWrapper View={AuthenticationProp} email={parsedUser?.email} user={parsedUser} token={token} setIsVerified={setIsVerified} />
            </FGridItem>
          </FGrid>
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default Index;
