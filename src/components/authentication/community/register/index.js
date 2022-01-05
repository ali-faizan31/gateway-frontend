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
    <FContainer type="fluid">
      <FContainer width={700}>
        <FCard variant="primary">
          <RegisterForm />
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default index;
