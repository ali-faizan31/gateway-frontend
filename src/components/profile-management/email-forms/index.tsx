import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EmailForm from "./EmailForm";
import OtpFrom from "./OtpForm";
import { sendOTP, updateEmail } from "../../../_apis/ProfileCrud";
import {
  FCard,
  FButton,
  FGrid,
  FGridItem,
  FDialog,
} from "ferrum-design-system";
import { AiOutlineMail } from "react-icons/ai";

const EmailSection = ({ profileToken, setProfileToken, initialEmail }: any) => {
  const [showForm, setShowForm] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async (values: any) => {
    const token = localStorage.getItem("token");
    await sendOTP(token, profileToken, values)
      .then((response: any) => {
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
    setShowForm(false);
    setOtpSent(false);
    localStorage.removeItem("profileToken");
    setProfileToken("");
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <FGrid>
        <FGridItem size={[8, 8, 8]} alignY={"center"} className={"f-mt-1"}>
          <AiOutlineMail className="f-mr-1" size={30} />
          <span className="font-size-18">
            {initialEmail ? initialEmail : "Please add Email"}
          </span>
        </FGridItem>
        <FGridItem size={[4, 4, 4]} alignX="right">
          {profileToken && (
            <FButton
              onClick={() => setShowForm(true)}
              type="submit"
              title={"Update"}
            ></FButton>
          )}
        </FGridItem>
      </FGrid>
      <FDialog
        title={initialEmail ? "Update Email" : "Add Email"}
        show={showForm}
        onHide={closeForm}
        size={"small"}
      >
        {!otpSent ? (
          <EmailForm sendOTP={handleSendOTP} />
        ) : (
          <OtpFrom verifyOTP={verifyOTP} />
        )}
      </FDialog>
    </>
  );
};

export default EmailSection;
