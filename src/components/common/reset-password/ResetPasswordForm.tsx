import React, { useState } from "react";
import {
  FContainer,
  FInputText,
  FGrid,
  FGridItem,
  FButton,
} from "ferrum-design-system";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiEyeOffFill, RiEyeLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import {
  authenticateForgotPasswordLink,
  resetPassword,
} from "../../../_apis/OnboardingCrud";
// import { PATH_AUTH } from "../../../routes/paths";
import ClipLoader from "react-spinners/ClipLoader";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getErrorMessage } from "../../../utils/global.utils";

const ResetPasswordForm = (props: any) => {
  const { token }: any = useParams();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required("New Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .when("newPassword", {
        is: (val: any) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref("newPassword")],
          "Password and Confirm Password don't match"
        ),
      }),
  });

  const {
    // reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit = async (values: any) => {
    console.log(values);
    try {
      if (token) {
        let data = { token: token };
        let authenticateLinkResponse = await authenticateForgotPasswordLink(
          data
        );
        let accessToken = authenticateLinkResponse?.data?.body?.token;
        let resetPasswordResponse = await resetPassword(values, accessToken);
        console.log(resetPasswordResponse);
        props.setIsPasswordChanged(true);
      }
    } catch (e: any) {
      getErrorMessage(e, activeTranslation)
    }
  };

  return (
    <>
      <Toaster />
      <FContainer width={700}>
        <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
          <FGrid>
            <FGridItem size={[12]} className={"f-mt-1"}>
              <FInputText
                label="Password"
                name="newPassword"
                type={!viewPassword ? "password" : "text"}
                placeholder="Password"
                register={register}
                postfix={viewPassword ? <RiEyeLine /> : <RiEyeOffFill />}
                postfixAction={() => {
                  setViewPassword(!viewPassword);
                }}
                error={
                  errors["newPassword"]?.message
                    ? errors["newPassword"]?.message
                    : ""
                }
              />
            </FGridItem>
          </FGrid>
          <FGrid>
            <FGridItem size={[12]} className={"f-mt-1"}>
              <FInputText
                label="Confirm Password"
                name="confirmPassword"
                type={!viewConfirmPassword ? "password" : "text"}
                placeholder="Confirm Password"
                register={register}
                postfix={viewConfirmPassword ? <RiEyeLine /> : <RiEyeOffFill />}
                postfixAction={() => {
                  setViewConfirmPassword(!viewConfirmPassword);
                }}
                error={
                  errors["confirmPassword"]?.message
                    ? errors["confirmPassword"]?.message
                    : ""
                }
              />
            </FGridItem>
          </FGrid>
          <FButton
            type="submit"
            className={"w-100 f-mt-1"}
            title={"Reset Password"}
            postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
          ></FButton>
        </form>
      </FContainer>
    </>
  );
};

export default ResetPasswordForm;
