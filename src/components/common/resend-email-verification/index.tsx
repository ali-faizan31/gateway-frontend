import React from "react";
import ResendEmailVerificationForm from "./ResendEmailVerificationForm";
import { FContainer, FCard, FCardTitle } from "ferrum-design-system";

const index = () => {
  return (
    <FContainer width={600}>
          <h2 className="f-mb-2">Resend Code! Please input your email. </h2>
      <p className="grey-secondary"> We will email you confirmation code. </p>
      <ResendEmailVerificationForm />
    </FContainer>
  );
};

export default index;
