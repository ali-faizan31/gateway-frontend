import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EmailForm from "./EmailForm";
import { useSelector } from "react-redux";
import OtpFrom from "./OtpForm";
import { sendOTP, updateEmail } from "../../../_apis/ProfileCrud";
// import { FButton, FGrid, FGridItem, FDialog } from "ferrum-design-system";
// import { AiOutlineMail } from "react-icons/ai";
// import { TOKEN_TAG } from "../../../utils/const.utils";
import { RootState } from "../../../redux/rootReducer";
import { getErrorMessage } from "../../../utils/global.utils";


interface EmailSectionProps {
  profileToken: string;
  setProfileToken: Function;
  getUserInfo: Function;
  onCancelClick: Function;
}

const EmailSection = ({
  profileToken,
  setProfileToken,
  getUserInfo,
  onCancelClick,
}: EmailSectionProps) => {
  const [emailedTo, setEmailedTo] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [emailBtnText, setEmailBtnText] = useState("Register");
  const walletAuthenticator = useSelector(
    (state: RootState) => state.walletAuthenticator
  );
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  const resendCode = () => {
    setOtpSent(false);
    setEmailBtnText("Resend Code");
  };

  const handleSendOTP = async (values: any) => {
    await sendOTP(walletAuthenticator.tokenV2, profileToken, values)
      .then((response: any) => {
        setEmailedTo(values.email);
        setOtpSent(true);
      })
      .catch((e: any) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  const verifyOTP = async (value: any) => {
    await updateEmail(walletAuthenticator.tokenV2, profileToken, value)
      .then((response: any) => {
        closeForm();
        setProfileToken("");
        getUserInfo();
      })
      .catch((e: any) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  const closeForm = () => {
    setOtpSent(false);
  };

  return (
    <>
      <Toaster />
      {!otpSent ? (
        <EmailForm
          sendOTP={handleSendOTP}
          onCancelClick={onCancelClick}
          sendBtnText={emailBtnText}
        />
      ) : (
        <OtpFrom
          verifyOTP={verifyOTP}
          onCancelClick={onCancelClick}
          emailedTo={emailedTo}
          resendCode={resendCode}
        />
      )}
    </>
  );
};

export default EmailSection;
