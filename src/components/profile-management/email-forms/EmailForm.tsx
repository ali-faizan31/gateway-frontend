import React from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ClipLoader from "react-spinners/ClipLoader";
import { FButton, FGrid, FInputText, FGridItem } from "ferrum-design-system";
import { CgEnter } from "react-icons/cg";

interface EmailFromProps {
  sendOTP: (value: any) => Promise<void>;
  sendBtnText: string
}

const EmailFrom = ({ sendOTP, sendBtnText }: EmailFromProps) => {
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
          <FGridItem size={[8, 8, 8]} alignY={"center"} className={"f-mt-1"}>
            <h2 className={"primary-color"}>Register your Email</h2>
          </FGridItem>
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-2"}>
            <FInputText
              label="Email"
              name="email"
              placeholder="Please enter your email"
              register={register}
              error={errors["email"]?.message ? errors["email"]?.message : ""}
            />
          </FGridItem>
          <FGridItem className={"f-mt-2"} alignX={"end"} alignY={"end"} dir={"row"} size={[12, 12, 12]}>

            <FButton
              type={"submit"}
              className={"btn-create f-ml-1"}
              title={sendBtnText}
              postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
              prefix={<CgEnter />}
            ></FButton>

            <FButton
              type={"button"}
              className={"btn-create f-ml-1"}
              title={"Cancel"}  
            ></FButton>
          </FGridItem>
        </FGrid>

      </form>
    </>
  );
};

export default EmailFrom;
