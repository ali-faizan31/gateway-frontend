import React from "react";
import ResendEmailVerificationForm from "./ResendEmailVerificationForm";
import { FContainer, FCard, FCardTitle } from "ferrum-design-system";

const index = () => {
  return (
    <FContainer type="fluid">
      <FContainer width={1000}>
        <FCard variant="primary">
          <FCardTitle>
            <h3>Please input your email! </h3>
          </FCardTitle>
          <h5> We will email you confirmation code. </h5>
          <ResendEmailVerificationForm />
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default index;
