import ForgotPasswordForm from "./ForgotPasswordForm";
import { FContainer, FItem  } from "ferrum-design-system"; 

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
