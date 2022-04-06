import React from "react";
import { FInputText, FGrid, FGridItem, FButton } from "ferrum-design-system";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { ResendEmailVerifyCode } from "../../../_apis/OnboardingCrud";
import { PATH_AUTH } from "../../../routes/paths";
import { ClipLoader } from "react-spinners";
import { T } from '../../../utils/translationHelper';

const ResendEmailVerificationForm = () => {
  const history = useHistory();

  const onSubmit = async (values: any) => {
    await ResendEmailVerifyCode(values)
      .then((response: any) => {
        toast.success(response?.data?.status?.message);
        history.push(PATH_AUTH.emailVerify);
      })
      .catch((e) => {
        if (e.response) {
          if (e?.response?.data?.status?.phraseKey !== '') {
            const fetchedMessage = T(e?.response?.data?.status?.phraseKey);
            toast.error(fetchedMessage);
          } else {
            toast.error(e?.response?.data?.status?.message);
          }
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const initialValues = {
    email: "",
  };

  const verifyCodeSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const {
    // reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(verifyCodeSchema),
  });

  return (
    <>
      <Toaster />
      <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
        <FGrid>
          <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
            <FInputText
              label="Email"
              name="email"
              type="email"
              placeholder="Email"
              register={register}
              error={errors["email"]?.message ? errors["email"]?.message : ""}
            />
          </FGridItem>
        </FGrid>
        <FButton
          type="submit"
          title={"Submit"}
          className={"w-100 f-mt-1"}
          postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}
        ></FButton>
      </form>
    </>
  );
};

export default ResendEmailVerificationForm;
