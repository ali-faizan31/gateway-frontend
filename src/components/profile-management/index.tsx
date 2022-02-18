import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EmailSection from "./email-forms";
import { mockGetToken, getMe } from "../../_apis/ProfileCrud";
import {
  FContainer,
  FButton,
  FGrid,
  FGridItem,
  FCard,
} from "ferrum-design-system";

const ProfileSettings = () => {
  let isLoading = false;
  const [profileToken, setprofileToken] = useState("");
  const [user, setUser] = useState({ email: "" });
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    const token = localStorage.getItem("token");
    isLoading = true;
    await getMe(token)
      .then((response: any) => {
        setUser(response.data.body.user);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      })
      .finally(() => {
        isLoading = false;
      });
  };

  const walletAuthentication = async () => {
    const signature = "xyz";
    const token = localStorage.getItem("token");
    await mockGetToken(token, { signature })
      .then((response: any) => {
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
        isLoading = false;
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
            getUserInfo={getUserInfo}
            initialEmail={user.email}
          />
        </FCard>
      </FContainer>
    </>
  );
};

export default ProfileSettings;
