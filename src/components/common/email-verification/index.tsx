import React from "react";
import EmailVerificationForm from "./EmailVerificationForm";
import {
  FContainer,
  // FCard,
  // FCardTitle
} from "ferrum-design-system";
// import { Link } from "react-router-dom";
// import { PATH_AUTH } from "../../../routes/paths";
import { ME_TAG } from "../../../utils/const.utils";

const index = () => {
  const user = localStorage.getItem(ME_TAG);
  const parsedUser = user && JSON.parse(user);

  return (
    <FContainer width={600}>
      {parsedUser ? (
        <>
          <h2 className="f-mb-2">Please check your email! </h2>
          <p className="grey-secondary">
            We have emailed a 6-digit confirmation code to{" "}
            <u>{parsedUser?.email}</u>, please enter the code in below box to
            verify your email.
          </p>
          <EmailVerificationForm parsedUser={parsedUser} />{" "}
        </>
      ) : (
        "No User found"
      )}
    </FContainer>
  );
};

export default index;
