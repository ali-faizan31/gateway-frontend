import React from "react";
import EmailVerificationForm from "./EmailVerificationForm";
import { FContainer, FCard, FCardTitle } from "ferrum-design-system";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "../../../../routes/paths";

const index = () => {
  const user = localStorage.getItem('me');
  const parsedUser = user && JSON.parse(user); 

  return (
    <FContainer type="fluid">
      <FContainer width={700}>
        <FCard variant="primary">
          {parsedUser ? <><FCardTitle >
            <h3>Please check your email! </h3>
          </FCardTitle>
            <h5>We have emailed a 6-digit confirmation code to <u>{parsedUser?.email}</u>, please enter the code in below box to verify your
              email.</h5>

            <EmailVerificationForm parsedUser={parsedUser} /> </> : "No User found"}
        </FCard>
      </FContainer>
    </FContainer>
  );
};

export default index;
