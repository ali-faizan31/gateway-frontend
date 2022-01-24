import React from "react";
import LoginForm from "./LoginForm";
import { FContainer, FItem, FCardTitle } from "ferrum-design-system";

const index = () => {
  return ( 
      <FContainer width={600}>
        <FItem >
          <h2 className="f-mb-2">Welcome to the Ferrum Network Gateway (BETA) </h2>
          <p className="grey-secondary"> Access presales, rewards and so much more through the Gateway. </p>
        </FItem>
        <LoginForm /> 
    </FContainer>
  );
};

export default index;
