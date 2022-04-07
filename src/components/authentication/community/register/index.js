import React from "react";
import RegisterForm from "./RegisterForm";
import {
  FContainer, 
  FItem,
} from "ferrum-design-system";

const index = () => {
  return (
    <>
      <FContainer width={600}>
        <FItem className={"f-mb-2"}>
          <h2> Let's Get Started</h2>
        </FItem>
        <RegisterForm />
      </FContainer>
    </>
  );
};

export default index;
