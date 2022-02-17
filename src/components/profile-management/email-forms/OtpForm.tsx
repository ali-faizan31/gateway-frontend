import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { FButton, FGrid, FInputText, FGridItem } from "ferrum-design-system";

const OtpFrom = ({ verifyOTP }: any) => {
  const initialValues = { otp: "" };
  const registerSchema = Yup.object().shape({
    otp: Yup.string().required("OTP is required"),
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
      <form autoComplete="true" onSubmit={handleSubmit(verifyOTP)}>
        <FGrid>
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-1"}>
            <FInputText
              label="OTP"
              name="otp"
              placeholder="xxxxxxx"
              register={register}
              error={errors["otp"]?.message ? errors["otp"]?.message : ""}
            />
          </FGridItem>
        </FGrid>
        <FButton
          type="submit"
          className={"w-100 f-mt-2 f-mb-1"}
          title={"Send OTP"}
          postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
        ></FButton>
      </form>
    </>
  );
};

export default OtpFrom;
