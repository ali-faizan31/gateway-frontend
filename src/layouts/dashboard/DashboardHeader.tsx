import React from 'react'
import { FLayout, FContainer, FMain, ThemeBuilder, FHeader, FButton, FInputText, FItem, FSider, FSiderItem } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useHistory, useLocation, Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { MetaMaskConnector } from "../../container-components";
import { ConnectWalletDialog }  from "../../utils/connect-wallet/ConnectWalletDialog";
import { useSelector } from 'react-redux';
import { RootState } from "../../redux/rootReducer";


const DashboardHeader = () => {
  const { pathname } = useLocation();
  const history = useHistory(); 
  const isPublic = pathname.includes('pub');
  const { isConnected, currentWalletNetwork, walletAddress, walletBalance, currentWallet } = useSelector((state: RootState) => state.walletConnector);

  console.log(isConnected, currentWalletNetwork, walletAddress, walletBalance, currentWallet);

  const showLogoutButton = () => { 
    if (isPublic) {
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("me");
    localStorage.removeItem("token");
    history.push(PATH_AUTH.communityLogin);
  };

  return (
    <FHeader showLogo={false}> 
      <FItem align="right">
        <FButton
          title="Logout"
          postfix={<RiLogoutCircleRLine />}
          onClick={handleLogout}
        ></FButton>   
        <MetaMaskConnector.WalletConnector
            WalletConnectView={FButton}
            WalletConnectModal={ConnectWalletDialog}
          />
      </FItem>
    </FHeader>
  )
}

export default DashboardHeader
