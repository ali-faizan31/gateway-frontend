import React  from "react";
import {  FInputText, FItem, FGrid, FGridItem, FButton } from "ferrum-design-system";
import { useHistory, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { EmailVerify } from "../../../_apis/OnboardingCrud";
import { PATH_AUTH } from "../../../routes/paths"; 
import ClipLoader from "react-spinners/ClipLoader";
import { ME_TAG, TOKEN_TAG } from "../../../utils/const.utils";

const EmailVerificationForm = (children: any) => {
  const { parsedUser } = children;
  const history = useHistory();

  const onSubmit = async (values: any) => {
    values.email = parsedUser.email;
    await EmailVerify(values)
      .then((response: any) => {
        localStorage.removeItem(ME_TAG);
        localStorage.removeItem(TOKEN_TAG);
        const { user } = response.data.body;
        const { token } = response.data.body;
        localStorage.setItem(ME_TAG, JSON.stringify(user));
        localStorage.setItem(TOKEN_TAG, token);
        toast.success(response?.data?.status?.message)
        history.push(PATH_AUTH.walletAuthentication);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      })
  };

  const initialValues = {
    emailVerificationCode: '',
    email: ''
  };


  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: initialValues });

  return (<>
    <Toaster />
    <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
      <FGrid >
        <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
          <FInputText
            label="Email Verification Code"
            name="emailVerificationCode"
            type="Number"
            placeholder="Email Verification Code"
            register={register}
            validations={{
              required: {
                value: true,
                message: "Email Verification Code is required",
              },
            }}
            error={
              errors["emailVerificationCode"]?.message ? errors["emailVerificationCode"]?.message : ""
            }
          />
        </FGridItem>
      </FGrid>
      <FButton type="submit" title={"Verify"} className={"w-100 f-mt-1"}  postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}></FButton>
      <FItem align={"center"} className={"f-mt-1 w-100"} >
        Don’t have a code? &nbsp;
        <Link className="primary-color text-decoration-none " to={PATH_AUTH.emailResendCode}>
          Resend code
        </Link>
      </FItem>
    </form>
  </>);
};

export default EmailVerificationForm;
