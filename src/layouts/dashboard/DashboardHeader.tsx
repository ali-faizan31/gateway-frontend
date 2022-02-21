import React, { useEffect } from 'react'
import { FHeader, FButton, FItem } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useHistory, useLocation, Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { MetaMaskConnector } from "../../container-components";
import { ConnectWalletDialog }  from "../../utils/connect-wallet/ConnectWalletDialog";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/rootReducer";
import { logout } from "../../_apis/OnboardingCrud";
import toast, { Toaster } from "react-hot-toast"; 
import { localStorageHelper } from "../../utils/global.utils"; 


const DashboardHeader = () => {
  const { pathname } = useLocation();
  const history = useHistory(); 
  const isPublic = pathname.includes('pub'); 
  const { isConnected, isConnecting, currentWalletNetwork, walletAddress, walletBalance, currentWallet  } = useSelector((state: RootState) => state.walletConnector);
  const { nonce, signature, applicationUserToken, isAllowedonGateway, allowedNetworksonGateway, profileToken, error} = useSelector((state: RootState) => state.walletAuthenticator);
   

  useEffect(() => {
    console.log( nonce, 'sig', signature, 'token',applicationUserToken, 'prof', profileToken, isAllowedonGateway, allowedNetworksonGateway, "authentication state",)
  }, [nonce, signature, applicationUserToken, isAllowedonGateway, allowedNetworksonGateway, profileToken])
  

  useEffect(() => { 
    console.log(isConnected, isConnecting)
    if (isConnecting === false && isConnected === false ){
      handleLogout(); 
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
    console.log('logout');
    let data = {}; 
    try {
    // let logoutResponse =  localStorageHelper.token() && await handleCommunityMemberLogout(data);
    // console.log(logoutResponse)
    localStorageHelper.removeItem('me');
    localStorageHelper.removeItem('token');
    } catch (e) {

    }
  };

  return (
    <FHeader showLogo={false}> 
      <FItem align="right">
        {/* <FButton
          title="Logout"
          postfix={<RiLogoutCircleRLine />}
          onClick={handleLogout}
        ></FButton>    */}
        <MetaMaskConnector.WalletConnector
            WalletConnectView={FButton}
            WalletConnectModal={ConnectWalletDialog}
          /> 
      </FItem>
    </FHeader>
  )
}

export default DashboardHeader
