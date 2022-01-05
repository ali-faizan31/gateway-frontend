import React, { useState } from "react";
import { FCard, FContainer, FInputTextField, FLayout, FMain, FGrid, FGridItem, FButton } from "ferrum-design-system";
import { useHistory, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { communityMemberResendVerifyCode } from "../../../../_apis/OnboardingCrud";
import { PATH_AUTH } from "../../../../routes/paths";
import * as validations from "../../../../utils/validations";

const ResendEmailVerificationForm = () => {
  const history = useHistory();

  const onSubmit = (values: any) => {
    console.log(values) 
    // history.push(PATH_AUTH.communityVerify);
    communityMemberResendVerifyCode(values)
      .then((response: any) => { 
        toast.success(response?.data?.status?.message)
        history.push(PATH_AUTH.communityVerify);
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
    email: ''
  };


  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ defaultValues: initialValues });

  return (<>
    <Toaster />
    <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
      <FGrid size={1}>
        <FGridItem alignX="center">
          <FInputTextField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
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
            error={
              errors["email"]?.message ? errors["email"]?.message : ""
            }
          />
        </FGridItem>
      </FGrid>
      <FGrid>
        <FGridItem alignX="center">
          <FButton type="submit" title={"Submit"} onClick={handleSubmit(onSubmit)}></FButton>
        </FGridItem>
      </FGrid> 
    </form>
  </>);
};

export default ResendEmailVerificationForm;
