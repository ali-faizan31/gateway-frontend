import React from 'react'
import { FLayout, FContainer, FMain, ThemeBuilder, FHeader, FButton, FInputText, FItem, FSider, FSiderItem } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useHistory, useLocation, Link } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';

const DashboardHeader = () => {
  const { pathname } = useLocation();
  const history = useHistory(); 
  const isPublic = pathname.includes('pub');

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
      {showLogoutButton() ? <FItem align="right">
        <FButton
          title="Logout"
          postfix={<RiLogoutCircleRLine />}
          onClick={handleLogout}
        ></FButton>
      </FItem> :
        <FItem align="right"> 
          <Link
            className="primary-color text-decoration-none "
            to={PATH_AUTH.communityLogin}
          >
            Login
          </Link>
        </FItem>}
    </FHeader>
  )
}

export default DashboardHeader
