import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import EmailSection from "./email-forms";
import { mockGetToken, getMe } from "../../_apis/ProfileCrud";
import { CgEnter } from "react-icons/cg";
import { AiFillWarning } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import {RootState} from "../../redux/rootReducer"
import {
  FContainer,
  FButton,
  FGrid,
  FGridItem,
  FInputText,
  FDialog,
  FItem
} from "ferrum-design-system";
import { generateNonceForCommunityMember } from "../../_apis/WalletAuthencation"

import { localStorageHelper } from "../../utils/global.utils";
import * as walletAuthenticatorActions from "../common/wallet-authentication/redux/walletAuthenticationActions";
import { TOKEN_TAG } from "../../utils/const.utils";

const ProfileSettings = () => {
  const {walletAddress} = useSelector(
    (state: RootState)=> state.walletConnector
  )

  const walletAuthenticator= useSelector(
    (state: RootState)=> state.walletAuthenticator
  )
  
  
  let isLoading = false;
  const dispatch = useDispatch();
  const [profileToken, setprofileToken] = useState("");
  const [user, setUser] = useState({ email: "" });
  const [errorModal, setErrorModal] = useState({show:false, message:''})

useEffect(() => {
    if(walletAuthenticator.profileToken || localStorageHelper.getToken(TOKEN_TAG)){     
      getUserInfo();
    }  
    setprofileToken(walletAuthenticator.profileToken)
  }, [walletAuthenticator, localStorageHelper.getToken(TOKEN_TAG)]);

  useEffect(() => {
    getUserInfo();
  },[])


  const getUserInfo = async () => { 
    isLoading = true;
    localStorageHelper.getToken(TOKEN_TAG) && await getMe(localStorageHelper.getToken(TOKEN_TAG))
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
    localStorageHelper.getToken(TOKEN_TAG) &&  getNonce(localStorageHelper.getToken(TOKEN_TAG));    
    setErrorModal({show:false, message:""})   
  };

  return (
    <>      
     <Toaster />
      <FContainer type={"fluid"} >
      {!profileToken ? (
          <FGrid className={"f-mb-1"}>           
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-2"}>
            <FInputText
              label="Wallet"
              name="wallet"
              placeholder={walletAddress}
              disabled={true}  
                        
            />
          </FGridItem>
          <FGridItem size={[12, 12, 12]} alignX="center" className={"f-mt-2"}>
            <FInputText
              label="Email"
              name="email"
              placeholder=""
              disabled={true}  
              value={user.email?user.email:"You do not have a registered email."}            
            />
          </FGridItem>
      
            <FGridItem  className={"f-mt-2"} alignX={"end"} alignY={"end"} dir={"row"} size={[12, 12, 12]}>
              {isLoading}     
                <FButton 
                prefix={<CgEnter />}
                  type="button"
                  className={" f-ml-1 "}
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
       <FDialog show={errorModal.show} size={"medium"}  className="bg-white">  
       <FItem align={"center"}>   
        <AiFillWarning className={" f-mb--5"} size={100}  color={"black"} style={{marginTop:-20}} />
         <p className={"f-mb-2 font-size-20"} style={{color: "black"}}>{errorModal.message}</p>
         <FButton
                  prefix={<FiRefreshCcw />}
                  type="button"
                  className={"btn-create f-ml-1 f-mb-1 "}
                  onClick={walletAuthentication}
                  title={"Retry Authentication"}                  
                ></FButton>   
                </FItem>       
          </FDialog>  
      </FContainer>
    </>
  );
};

export default ProfileSettings;
