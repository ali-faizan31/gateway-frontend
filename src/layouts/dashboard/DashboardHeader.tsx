import React from 'react'
import { FLayout, FContainer, FMain, ThemeBuilder, FHeader, FButton, FInputText, FItem, FSider, FSiderItem } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLocation } from 'react-router';

const DashboardHeader = () => {
  const { pathname } = useLocation();
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
    // navigate(PATH_AUTH.communityLogin);
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
