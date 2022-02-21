import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import EmailSection from "./email-forms";
import { mockGetToken, getMe } from "../../_apis/ProfileCrud";
import { CgEnter } from "react-icons/cg";
import { AiFillWarning } from "react-icons/ai";
import { FiRefreshCcw } from "react-icons/fi";
import { RootStateOrAny, useSelector } from "react-redux";
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

const ProfileSettings = () => {
  const {walletAddress} = useSelector(
    (state: RootState)=> state.walletConnector
  )
  
  let isLoading = false;
  const [profileToken, setprofileToken] = useState("");
  const [user, setUser] = useState({ email: "" });
  const [errorModal, setErrorModal] = useState({show:false, message:''})
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
    setErrorModal({show:false, message:""})   
    
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
     <Toaster />
      <FContainer width={1000} >
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
              value={user.email}            
            />
          </FGridItem>
      
            <FGridItem  className={"f-mt-2"} alignX={"end"} alignY={"end"} dir={"row"} size={[12, 12, 12]}>
              {isLoading}           
                <FButton
                variant={"secondary"}
                prefix={<CgEnter />}
                  type="button"
                  className={"btn-create f-ml-1 "}
                  disabled={isLoading}
                  onClick={walletAuthentication}
                  title={"Edit Profile"}
                  outlined
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
