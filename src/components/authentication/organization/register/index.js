import React from "react";
import RegisterForm from "./RegisterForm";
import {
  FContainer,
  FCard,
  FLayout,
  FMain,
  FGrid,
  FGridItem,
  FItem,
} from "ferrum-design-system";

const index = () => {
  return (
      <FContainer width={600}>
        <FCard variant="primary"> 
          <RegisterForm />
        </FCard>
      </FContainer>
  );
};

export default index;
