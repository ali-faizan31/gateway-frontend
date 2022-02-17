import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { FButton, FGrid, FInputText, FGridItem } from "ferrum-design-system";

interface EmailFromProps {
  sendOTP: (value: any) => Promise<void>;
}

const EmailFrom = ({ sendOTP }: EmailFromProps) => {
  const initialValues = {
    email: "",
  };
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(registerSchema),
  });

  return (
    <>
      <form autoComplete="true" onSubmit={handleSubmit(sendOTP)}>
        <FGrid>
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-1"}>
            <FInputText
              label="Email"
              name="email"
              placeholder="someone@email.com"
              register={register}
              error={errors["email"]?.message ? errors["email"]?.message : ""}
            />
          </FGridItem>
        </FGrid>
        <FButton
          type={"submit"}
          className={"w-100 f-mt-2 f-mb-1"}
          title={"Send OTP"}
          postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
        ></FButton>
      </form>
    </>
  );
};

export default EmailFrom;
