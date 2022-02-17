import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EmailSection from "./email-forms";
import { mockGetToken } from "../../_apis/ProfileCrud";
import {
  FContainer,
  FButton,
  FGrid,
  FGridItem,
  FCard,
} from "ferrum-design-system";

const ProfileSettings = () => {
  const [profileToken, setprofileToken] = useState("");
  let pToken = localStorage.getItem("profileToken");
  useEffect(() => {
    if (pToken) {
      setprofileToken(pToken);
    } else {
      setprofileToken("");
    }
  }, [pToken]);

  let isLoading = false;
  let user = localStorage.getItem("me");
  const email = user ? JSON.parse(user).email : "";

  const walletAuthentication = async () => {
    const signature = "xyz";
    const token = localStorage.getItem("token");
    await mockGetToken(token, { signature })
      .then((response: any) => {
        localStorage.setItem("profileToken", response.data.body.token);
        setprofileToken(response.data.body.token);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      })
      .finally(() => {
        isLoading = true;
      });
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <FContainer width={600}>
        <FCard>
          <FGrid className={"f-mb-1"}>
            <FGridItem size={[6, 12, 12]} alignX="start" alignY={"end"}>
              <h1>Profile</h1>
            </FGridItem>
            <FGridItem
              alignX={"end"}
              alignY={"end"}
              dir={"row"}
              size={[6, 12, 12]}
            >
              {isLoading}
              {!profileToken && (
                <FButton
                  type="button"
                  className={"btn-create f-ml-1 "}
                  disabled={isLoading}
                  onClick={walletAuthentication}
                  title={"Edit Profile"}
                ></FButton>
              )}
            </FGridItem>
          </FGrid>
          <EmailSection
            profileToken={profileToken}
            setProfileToken={setprofileToken}
            initialEmail={email}
          />
        </FCard>
      </FContainer>
    </>
  );
};

export default ProfileSettings;
