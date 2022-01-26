import React, { useState, useEffect } from 'react';
import { FCard, FContainer, FInputTextField, FLayout, FItem, FGrid, FGridItem, FButton } from "ferrum-design-system";
import { useHistory, Link, useParams } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { RiEyeOffFill, RiEyeLine } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { authenticateForgotPasswordLink, resetPassword } from "../../../../_apis/OnboardingCrud";
import { PATH_AUTH } from "../../../../routes/paths";
import ClipLoader from "react-spinners/ClipLoader";

const ResetPasswordForm = (props: any) => {
  const { token }: any = useParams();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const initialValues = {
    newPassword: '',
    confirmPassword: ''
  };

  const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().required("Confirm Password is required").when("newPassword", {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("newPassword")],
        "Password and Confirm Password don't match"
      ),
    })
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: initialValues, resolver: yupResolver(resetPasswordSchema) });


  const onSubmit = async (values: any) => { 
    console.log(values)
    try {
      if (token) {
        let data = { token: token };
        let authenticateLinkResponse = await authenticateForgotPasswordLink(data);
        let accessToken = authenticateLinkResponse?.data?.body?.token;
        let resetPasswordResponse = await resetPassword(values, accessToken);
        console.log(resetPasswordResponse);
        props.setIsPasswordChanged(true);
      }
    } catch (e: any) {
console.log(e);
      console.log(e.response.data.status.message)
      toast.error(`Error occured: ${e?.response?.data?.status?.message}! `);
    } 
  };

  return (<>
    <Toaster />
    <FContainer width={700}>
      <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
        <FGrid>
          <FGridItem size={[12]} className={"f-mt-1"}>
            <FInputTextField
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
                errors["newPassword"]?.message ? errors["newPassword"]?.message : ""
              }
            />
          </FGridItem>
        </FGrid>
        <FGrid>
          <FGridItem size={[12]} className={"f-mt-1"}>
            <FInputTextField
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
                errors["confirmPassword"]?.message ? errors["confirmPassword"]?.message : ""
              }
            />
          </FGridItem>
        </FGrid>
        <FGrid >
          <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
            <FButton type="submit" title={"Reset Password"} postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}></FButton>
          </FGridItem>
        </FGrid>
      </form>
    </FContainer>
  </>
  )
};

export default ResetPasswordForm;
