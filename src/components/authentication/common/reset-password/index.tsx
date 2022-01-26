import React, { useState } from "react";
import ResetPasswordForm from "./ResetPasswordForm";
import { FContainer, FItem, FCardTitle } from "ferrum-design-system";
import { Link } from "react-router-dom";
import { PATH_AUTH } from "../../../../routes/paths";

const Index = () => {
    const [isPasswordChanged, setIsPasswordChanged] = useState(false);

    return (
        <FContainer width={600}>
            {isPasswordChanged ?
                <FItem align={"center"} className={"f-mt-1 w-100"} >
                     <h2 className="f-mb-2">Your Password has been changed. </h2>
                     You can 
                    <Link className="primary-color text-decoration-none " to={PATH_AUTH.communityLogin}>
                        Login
                    </Link>
                    again here.
                </FItem>
                :
                <>
                    <FItem >
                        <h2 className="f-mb-2">Reset Password! Enter new password here</h2>
                    </FItem>
                    <ResetPasswordForm setIsPasswordChanged={setIsPasswordChanged} />
                </>}
        </FContainer>
    );
};

export default Index;
