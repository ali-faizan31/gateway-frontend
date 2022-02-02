import React from "react";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { FContainer, FItem, FCardTitle } from "ferrum-design-system";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "../../../../routes/paths";

const index = () => {

    return (
        <FContainer width={600}>
            <FItem >
                <h2 className="f-mb-2">Forgot Password ? Please input your email!</h2>
                <p className="grey-secondary"> We will email you reset password link.</p>
            </FItem>
            <ForgotPasswordForm />
        </FContainer>
    );
};

export default index;
