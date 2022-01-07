import React, { useState } from "react";
import { FInputTextField, FGrid, FGridItem, FButton, FItem} from "ferrum-design-system";
import { useHistory } from "react-router-dom";
import {
    RiEyeOffFill,
    RiEyeLine,
} from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { communityMemberLogin } from "../../../../_apis/OnboardingCrud";
import { PATH_AUTH, PATH_PUBLIC_USER } from "../../../../routes/paths";
import * as validations from "../../../../utils/validations";
import ClipLoader from "react-spinners/ClipLoader";

const LoginForm = () => {
    const history = useHistory();
    const [viewPassword, setViewPassword] = useState(false);

    const initialValues = {
        email: '',
        password: ''
    };


    const {
        reset,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm({ defaultValues: initialValues }); 

    const onSubmit = async (values: any) => { 
        await communityMemberLogin(values)
            .then((response: any) => {
                const { user } = response.data.body;
                const { token } = response.data.body;
                localStorage.setItem('me', JSON.stringify(user));
                if (token) {
                    if (user.isEmailAuthenticated === true) {
                        // if (user.isWalletAddressAuthenticated === true) {
                            localStorage.setItem('token', token);
                            toast.success(response.data.status.message);
                            history.push(PATH_PUBLIC_USER.multiLeaderboard.detailLeaderBoardById);
                        // } else {
                        //     toast.error('Please connect and authenticate your wallet first!');
                        //     history.push(PATH_AUTH.communityWalletAuthentication);
                        // }
                    } else {
                        toast.error('Please verify your email first!');
                        history.push(PATH_AUTH.communityResendCode);
                    }
                }
            })
            .catch((e) => {
                if (e.response) {
                    toast.error(e.response?.data?.status?.message);
                } else {
                    toast.error("Something went wrong. Try again later!");
                }
            })
    };

    return (<>
        <Toaster />
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
            <FGrid className={"f-mt-1"}>
                <FGridItem size={[12]}>
                    <FInputTextField
                        label="Email"
                        name="email"
                        type="email"
                        className={"w-100"}
                        placeholder="Please enter you email"
                        register={register}
                        validations={{
                            required: {
                                value: true,
                                message: "Email is required",
                            },
                            minLength: { value: 3, message: validations.MIN_LENGTH("3") },
                            maxLength: { value: 50, message: validations.MAX_LENGTH("50") },
                            pattern: {
                                value: validations.EMAIL_REGEX,
                                message: "Invalid email format",
                            },
                        }}
                        error={errors["email"]?.message ? errors["email"]?.message : ""}
                    />
                </FGridItem>
            </FGrid>
            <FGrid>
                <FGridItem size={[12]} >
                    <FInputTextField
                        label="Password"
                        name="password"
                        className={"f-mt-1"}
                        type={!viewPassword ? "password" : "text"}
                        placeholder="Password"
                        register={register}
                        postfix={viewPassword ? <RiEyeLine /> : <RiEyeOffFill/>}
                        postfixAction={() => {
                            setViewPassword(!viewPassword);
                        }}
                        validations={{
                            required: {
                                value: true,
                                message: "Password is required",
                            },
                            minLength: { value: 3, message: validations.MIN_LENGTH("3") },
                            maxLength: { value: 20, message: validations.MAX_LENGTH("20") },
                            // pattern: {
                            //     value: validations.PASSWORD_REGEX,
                            //     message:
                            //         "Password must be at least six characters long, Contain letters and numbers",
                            // },
                        }}
                        error={
                            errors["password"]?.message ? errors["password"]?.message : ""
                        }
                    />
                </FGridItem>
            </FGrid>
            <FItem align="center" className={"w-100"} >
                    <FButton type="submit" title={"Login"} className={"f-mt-1"} postfix={ isSubmitting && <ClipLoader color="#fff" size={20}/>}></FButton>
                </FItem>
        </form>
    </>);
};

export default LoginForm;
