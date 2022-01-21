import React from 'react'
import { FLayout, FContainer, FMain, ThemeBuilder, FHeader, FButton, FInputText, FItem, FSider, FSiderItem } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useHistory, useLocation } from 'react-router';
import { PATH_AUTH } from '../../routes/paths';

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const isMultiLeaderboard = pathname.includes('/pub/multi/leaderboard');
  const isPublic = pathname.includes('pub');

  const showLogoutButton = () => {
    if (isMultiLeaderboard) {
      return true;
    }
    if (isPublic) {
      return false;
    }
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem("me");
    localStorage.removeItem("token");  
    history.push(PATH_AUTH.orgLogin);
  };

  return (
    <FHeader showLogo={false}> 
      {showLogoutButton() ? <FItem align="right">
        <FButton
          title="Logout"
          postfix={<RiLogoutCircleRLine />}
          onClick={handleLogout}
        ></FButton> 
      </FItem> : ""}
    </FHeader>
  )
}

export default DashboardHeader
