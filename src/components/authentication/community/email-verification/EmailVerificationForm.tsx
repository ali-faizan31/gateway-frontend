import React, { useState } from "react";
import { FCard, FContainer, FInputTextField, FLayout, FMain, FGrid, FGridItem, FButton } from "ferrum-design-system";
import { useHistory, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { communityMemberEmailVerify } from "../../../../_apis/OnboardingCrud";
import { PATH_AUTH } from "../../../../routes/paths";
import * as validations from "../../../../utils/validations";
import ClipLoader from "react-spinners/ClipLoader";

const EmailVerificationForm = (children: any) => {
  const { parsedUser } = children;
  const history = useHistory();

  const onSubmit = async (values: any) => {
    values.email = parsedUser.email;
    await communityMemberEmailVerify(values)
      .then((response: any) => {
        localStorage.removeItem('me');
        localStorage.removeItem('token');
        const { user } = response.data.body;
        const { token } = response.data.body;
        localStorage.setItem('me', JSON.stringify(user));
        localStorage.setItem('token', token);
        toast.success(response?.data?.status?.message)
        history.push(PATH_AUTH.communityWalletAuthentication);
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
      <FGrid size={1}>
        <FGridItem alignX="center">
          <FInputTextField
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
      <FGrid>
        <FGridItem alignX="center">
          <FButton type="submit" title={"Verify"} className={"f-mt-1"} postfix={ isSubmitting && <ClipLoader color="#fff" size={20}/>}></FButton>
        </FGridItem>
      </FGrid>
      <FGrid>
        <FGridItem alignX="center" className={"f-mt-1"}>
          Don’t have a code? &nbsp;
          <Link to={PATH_AUTH.communityResendCode}>
            Resend code
          </Link>
        </FGridItem>
      </FGrid>
    </form>
  </>);
};

export default EmailVerificationForm;
