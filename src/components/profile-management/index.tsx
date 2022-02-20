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
  FInputText
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
    setprofileToken('test');
    
    // const signature = "xyz";
    // const token = localStorage.getItem("token");
    // await mockGetToken(token, { signature })
    //   .then((response: any) => {
    //     setprofileToken(response.data.body.token);
    //   })
    //   .catch((e) => {
    //     if (e.response) {
    //       toast.error(e.response?.data?.status?.message);
    //     } else {
    //       toast.error("Something went wrong. Try again later!");
    //     }
    //   })
    //   .finally(() => {
    //     isLoading = false;
    //   });
  };

  return (
    <>      
     <Toaster />
      <FContainer width={1000}>
      {!profileToken ? (
          <FGrid className={"f-mb-1"}>           
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-2"}>
            <FInputText
              label="Wallet"
              name="wallet"
              placeholder=""
              disabled={true}  
              value="xxxx"            
            />
          </FGridItem>
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-2"}>
            <FInputText
              label="Email"
              name="email"
              placeholder=""
              disabled={true}  
              value={user.email}            
            />
          </FGridItem>
      
            <FGridItem  className={"f-mt-2"} alignX={"end"} alignY={"end"} dir={"row"} size={[12, 12, 12]}>
              {isLoading}           
                <FButton
                  type="button"
                  className={"btn-create f-ml-1 "}
                  disabled={isLoading}
                  onClick={walletAuthentication}
                  title={"Edit Profile"}
                ></FButton>         
            </FGridItem>
          </FGrid>      
       ):(
        <EmailSection
        profileToken={profileToken}
        setProfileToken={setprofileToken}
        getUserInfo={getUserInfo}
      
      />
       )}
      </FContainer>
    </>
  );
};

export default ProfileSettings;
