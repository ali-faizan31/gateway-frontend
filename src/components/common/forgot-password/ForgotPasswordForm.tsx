import React from "react";
import {
  //   FCard,
  FContainer,
  FInputText,
  //   FLayout,
  //   FItem,
  FGrid,
  FGridItem,
  FButton,
} from "ferrum-design-system";
// import { useHistory, Link } from "react-router-dom";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { sendForgotPasswordLink } from "../../../_apis/OnboardingCrud";
// import { PATH_AUTH } from "../../../routes/paths";
// import * as validations from "../../../utils/validations";
import ClipLoader from "react-spinners/ClipLoader";
import { T } from '../../../utils/translationHelper';

const ForgotPasswordForm = () => {
  //   const history = useHistory();

  const onSubmit = async (values: any) => {
    values.role = "communityMember";
    values.url = `${window.location.origin.toString()}/auth/reset-password/`;
    console.log(values);
    await sendForgotPasswordLink(values)
      .then((response: any) => {
        toast.success(response?.data?.status?.message);
        reset();
      })
      .catch((e: any) => {
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

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required("Email is required")
      .email("Email must be a valid email address"),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(forgotPasswordSchema),
  });

  return (
    <>
      <Toaster />
      <FContainer width={700}>
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <FGrid>
            <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
              <FInputText
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
                }}
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
      </FContainer>
    </>
  );
};

export default ForgotPasswordForm;
