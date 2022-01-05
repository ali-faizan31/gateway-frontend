import React, { useState } from "react";
import { FInputTextField, FGrid, FGridItem, FButton } from "ferrum-design-system";
import { useHistory } from "react-router-dom";
import {
  RiEyeOffFill,
  RiEyeLine,
} from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { communityMemberRegister } from "../../../../_apis/OnboardingCrud";
import { PATH_AUTH } from "../../../../routes/paths";
import * as validations from "../../../../utils/validations";
import ClipLoader from "react-spinners/ClipLoader";

const RegisterForm = () => {
  const history = useHistory();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewConfirmPassword, setViewConfirmPassword] = useState(false);

  const onSubmit = async (values: any) => { 
    await communityMemberRegister(values)
      .then((response: any) => {
        const { user } = response.data.body;
        const { token } = response.data.body;
        localStorage.setItem('me', JSON.stringify(user));
        localStorage.setItem('token', token);
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    telegramHandle: '',
  };

  const registerSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required').min(2, 'Too Short!').max(50, 'Too Long!'),
    lastName: Yup.string().required('Last name is required').min(2, 'Too Short!').max(50, 'Too Long!'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password hehe is required'),
    confirmPassword: Yup.string().required("Confirm Password is required").when("password", {
      is: (val: any) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Password and Confirm Password don't match"
      ),
    }),
    telegramHandle: Yup.string().required('Telegram handle is required. Include @ with your username.').matches(/^@[A-Za-z0-9_]{5,32}(\s+)?$/, "Please enter Valid Telegram Handle"),
  })

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: initialValues, resolver: yupResolver(registerSchema) });

  return (<>
    <Toaster />
    <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
      <FGrid size={2}>
        <FGridItem alignX="center" >
          <FInputTextField
            label="First name"
            name="firstName"
            placeholder="First Name"
            register={register} 
            error={
              errors["firstName"]?.message ? errors["firstName"]?.message : ""
            }
          />
        </FGridItem>
        <FGridItem >
          <FInputTextField
            label="Last name"
            name="lastName"
            placeholder="Last name"
            register={register} 
            error={errors["lastName"]?.message ? errors["lastName"]?.message : ""}
          />
        </FGridItem>
      </FGrid>
      <FGrid className={"f-mt-1"}>
        <FGridItem alignX="center">
          <FInputTextField
            label="Email"
            name="email"
            type="email"
            placeholder="Email"
            register={register} 
            error={errors["email"]?.message ? errors["email"]?.message : ""}
          />
        </FGridItem>
      </FGrid>
      <FGrid size={2} className={"f-mt-1"}>
        <FGridItem >
          <FInputTextField
            label="Password"
            name="password"
            type={!viewPassword ? "password" : "text"}
            placeholder="Password"
            register={register}
            postfix={viewPassword ? <RiEyeLine /> : <RiEyeOffFill />}
            postfixAction={() => {
              setViewPassword(!viewPassword);
            }} 
            error={
              errors["password"]?.message ? errors["password"]?.message : ""
            }
          />
        </FGridItem>
        <FGridItem >
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
      <FGrid>
        <FGridItem alignX="center" className={"f-mt-1"}>
          <FInputTextField
            label="Telegram handle"
            name="telegramHandle"
            placeholder="Telegram handle including @"
            register={register} 
            error={
              errors["telegramHandle"]?.message ? errors["telegramHandle"]?.message : ""
            }
          />
        </FGridItem>
      </FGrid>
      <FGrid>
        <FGridItem alignX="center" className={"f-mt-1"}>
          <FButton type="submit" title={"Register"} postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}></FButton>
        </FGridItem>
      </FGrid>
    </form>
  </>);
};

export default RegisterForm;
