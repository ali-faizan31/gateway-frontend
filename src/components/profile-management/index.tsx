import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import EmailSection from "./email-forms";
import { mockGetToken, getMe } from "../../_apis/ProfileCrud";
import { generateNonceForCommunityMember } from "../../_apis/WalletAuthencation"
import { FContainer, FButton, FGrid, FGridItem, FCard, } from "ferrum-design-system";
import { localStorageHelper } from "../../utils/global.utils";
import * as walletAuthenticatorActions from "../common/wallet-authentication/redux/walletAuthenticationActions";

const ProfileSettings = () => {
  let isLoading = false;
  const dispatch = useDispatch();
  const [profileToken, setprofileToken] = useState("");
  const [user, setUser] = useState({ email: "" });

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => { 
    isLoading = true;
    localStorageHelper.getToken("communityMemberToken") && await getMe(localStorageHelper.getToken("communityMemberToken"))
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

  const getNonce = async (communityMemberToken: any) => { 
    generateNonceForCommunityMember(communityMemberToken)
    .then((res: any) => {
      if (res && res.data && res.data.body && res.data.body.nonce) { 
        dispatch( walletAuthenticatorActions.saveNonce({ nonce: res.data.body.nonce }) );  
        dispatch( walletAuthenticatorActions.getSignatureFromMetamask({getSignatureFromMetamask: true}))
      }
    })
    .catch((e) => {
      if (e.response) {
        toast.error(` Error Occured: nonce ${e?.response?.data?.status?.message}`);
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    });
  }

  const walletAuthentication = async () => {
    localStorageHelper.getToken("communityMemberToken") &&  getNonce(localStorageHelper.getToken("communityMemberToken"));
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
      <FContainer width={600}>
        <FCard>
          <FGrid className={"f-mb-1"}>
            <FGridItem size={[6, 12, 12]} alignX="start" alignY={"end"}>
              <h1>Profile</h1>
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6, 12, 12]} >
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
