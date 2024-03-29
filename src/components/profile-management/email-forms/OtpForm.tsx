import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { FButton, FGrid, FInputText, FGridItem } from "ferrum-design-system";
import {Link} from 'react-router-dom'

interface OtpFromProps {
  verifyOTP: (value: any) => Promise<void>;
  resendCode: (value: any) => void;
  emailedTo: string;
  onCancelClick: Function;

}

const OtpFrom = ({ verifyOTP, emailedTo, resendCode, onCancelClick }: OtpFromProps) => {
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
        <FGridItem size={[12, 12, 12]}  className={"f-mt-1"}>
          <h2 className={"primary-color"}>Please check your email!</h2>
          </FGridItem>
          <FGridItem size={[12, 12, 12]} className={"f-mt-2 font-size-16"}>
          <p>We have emailed a 6-digit confirmation code to {emailedTo}, please enter the code in below <br /> box to verify your email</p>
       
          </FGridItem>
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-2"}>
            <FInputText
              label="Email Verification Code"
              name="otp"
              placeholder="Email Verification Code"
              register={register}
              error={errors["otp"]?.message ? errors["otp"]?.message : ""}
            />
          </FGridItem>
          <FGridItem  className={"f-mt-2"} alignX={"end"} alignY={"center"} dir={"row"} size={[12, 12, 12]}>
           <p>Don't have a code? </p> 
           <Link className={"f-link f-pl--5 "} to="#" onClick={resendCode}>Resend Code</Link>
          <FButton 
          type="submit"
          className={"btn-create f-ml-3"}
          title={"Verify your Email"}
          postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
        ></FButton>
        <FButton
              type={"button"}
              className={"btn-create f-ml-1"}
              title={"Cancel"}
              onClick={onCancelClick}  
            ></FButton>
         </FGridItem>
        </FGrid>
        
      </form>
    </>
  );
};

export default OtpFrom;
