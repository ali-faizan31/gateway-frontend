import React, { useEffect } from 'react'
import { FHeader, FButton, FItem } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useHistory, useLocation, Link } from 'react-router-dom';
import { PATH_AUTH, PATH_DASHBOARD } from '../../routes/paths';
import { MetaMaskConnector } from "../../container-components";
import { ConnectWalletDialog }  from "../../utils/connect-wallet/ConnectWalletDialog";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/rootReducer";
import { logout } from "../../_apis/OnboardingCrud";
import toast, { Toaster } from "react-hot-toast"; 
import { localStorageHelper } from "../../utils/global.utils"; 
import { COMMUNITY_ROLE_TAG, ME_TAG, TOKEN_TAG, ORG_ROLE_TAG } from '../../utils/const.utils';


const DashboardHeader = ({title}:any) => {
  const { pathname } = useLocation();
  const history = useHistory(); 
  const isPublic = pathname.includes('pub'); 
  const { isConnected, isConnecting } = useSelector((state: RootState) => state.walletConnector);
  const { meV2 } = useSelector((state: RootState) => state.walletAuthenticator);
    

  useEffect(() => {  
    if (meV2 && meV2.role === COMMUNITY_ROLE_TAG) {
      if (isConnecting === false && isConnected === false) {
        handleLogout();
      }
    }
  }, [isConnected, isConnecting])
  

  const showLogoutButton = () => { 
    if (isPublic) {
      return false;
    }
    return true;
  };

  const handleCommunityMemberLogout = async ( values: any ) => {
    try {
     const res = await logout(values, localStorageHelper.getToken() )
     return res?.data?.body;
   } catch (e: any) { 
    toast.error(`Error Occured: ${e?.response?.data?.status?.message}`)
   }
 }


  const handleLogout = async () => { 
    let data = {}; 
    try {
    // let logoutResponse =  localStorageHelper.token() && await handleCommunityMemberLogout(data);
    // console.log(logoutResponse)
    if (localStorageHelper.load(ME_TAG)?.role === ORG_ROLE_TAG){
      history.push(PATH_AUTH.orgLogin)
    }
    localStorageHelper.removeItem(ME_TAG);
    localStorageHelper.removeItem(TOKEN_TAG);

    } catch (e) {

    }
  };

  console.log(localStorageHelper.load(ME_TAG))

  return (
    <> 
    <FHeader showLogo={false} titleText={title}>       
      <FItem align="right" display={"flex"}>
        {localStorageHelper.load(ME_TAG)?.role === ORG_ROLE_TAG && <FButton
          title="Logout"
          postfix={<RiLogoutCircleRLine />}
          onClick={handleLogout}
        ></FButton>}   
        {localStorageHelper.load(ME_TAG)?.role !== ORG_ROLE_TAG && <> <MetaMaskConnector.WalletConnector
            WalletConnectView={FButton}
            WalletConnectModal={ConnectWalletDialog}
          />
        <Link
              to={PATH_DASHBOARD.general.profile}
              style={{
                border: "1px solid #cba461",
                minWidth: "45px",
                height: "45px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaUserCircle color="#cba461" size={"40px"} />
            </Link> 
            </>}
      </FItem>
    </FHeader>
    </>
  )
}

export default DashboardHeader
