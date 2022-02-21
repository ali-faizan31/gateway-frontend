import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EmailForm from "./EmailForm";
import OtpFrom from "./OtpForm";
import { sendOTP, updateEmail } from "../../../_apis/ProfileCrud";
import { FButton, FGrid, FGridItem, FDialog } from "ferrum-design-system";
import { AiOutlineMail } from "react-icons/ai";

interface EmailSectionProps {
  profileToken: string;
  setProfileToken: Function;
  getUserInfo: Function;
}

const EmailSection = ({
  profileToken,
  setProfileToken,
  getUserInfo,
}: EmailSectionProps) => {
  const [emailedTo, setEmailedTo] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailBtnText, setEmailBtnText] = useState("Register");


  const resendCode =  ()=>{
    setOtpSent(false)
    setEmailBtnText("Resend Code")
  }

  const handleSendOTP = async (values: any) => {    
    const token = localStorage.getItem("token");
    await sendOTP(token, profileToken, values)
      .then((response: any) => {
        setEmailedTo( values.email)
        setOtpSent(true);        
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const verifyOTP = async (value: any) => {   
    let token = localStorage.getItem("token");
    await updateEmail(token, profileToken, value)
      .then((response: any) => {
        closeForm();
        setProfileToken("");
        getUserInfo();
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const closeForm = () => {
  
    setOtpSent(false);
  };

  return (
    <>
     <Toaster />          
        {!otpSent ? (
          <EmailForm sendOTP={handleSendOTP}  sendBtnText={emailBtnText}/>
        ) : (
          <OtpFrom verifyOTP={verifyOTP} emailedTo={emailedTo} resendCode={resendCode} />
        )}
     
    </>
  );
};

export default EmailSection;
