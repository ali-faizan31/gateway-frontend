import React from "react";
import LoginForm from "./LoginForm";
import { FContainer, FCard, FCardTitle } from "ferrum-design-system";

const index = () => {
  return (
    <FContainer type="fluid">
      <FContainer width={700}>
        <FCard variant="primary">
          <FCardTitle >
            <h3>Sign in to Leaderboard! </h3>
          </FCardTitle>
          <h5> Enter your details below. </h5>
          <LoginForm />
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default index;
