import React from "react";
import { FContainer, FCard, FCardTitle, FButton } from "ferrum-design-system";
import { Web3AuthWrapper } from "./WalletAuthenticationForm";

const index = () => {
  const user = localStorage.getItem('me');
  const parsedUser = user && JSON.parse(user); 
  const token = localStorage.getItem('token');

  const AuthenticationProp = (props: any) => <FButton loading={props.loading} disabled={props.loading} type="submit" {...props} title={props.text}></FButton>


  return (
    <FContainer type="fluid">
      <FContainer width={1000}>
        <FCard variant="primary">
          <FCardTitle>
            <h3> Connect Wallet! </h3>
          </FCardTitle>
          <h5> Please connect your wallet for the authentication process. </h5>
          <Web3AuthWrapper View={AuthenticationProp} email={parsedUser?.email} user={parsedUser} token={token} />
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default index;
