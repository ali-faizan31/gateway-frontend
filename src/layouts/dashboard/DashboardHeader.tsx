import React, { useEffect, useState } from "react";
import { FHeader, FButton, FItem, FCard } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useHistory, Link, useLocation } from "react-router-dom";
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
import { MetaMaskConnector } from "../../container-components";
import { ConnectWalletDialog } from "../../utils/connect-wallet/ConnectWalletDialog";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getCABNInformation, getTokenInformationFromWeb3, localStorageHelper, TruncateWithoutRounding } from "../../utils/global.utils";
import {
  COMMUNITY_ROLE_TAG,
  ME_TAG,
  TOKEN_TAG,
  ORG_ROLE_TAG,
  tokenFRMBSCMainnet,
  tokenFRMxBSCMainnet,
  APELPCFRMBNBTokenContractAddress,
  APELPCFRMxBNBTokenContractAddress,
  cFRMTokenContractAddress,
  cFRMxTokenContractAddress,
} from "../../utils/const.utils";
import { getFormattedBalance, getFormattedWalletAddress } from "../../utils/global.utils";
import * as CrucibleActions from "../../components/crucible/redux/CrucibleActions";

const DashboardHeader = ({ title }: any) => {
  const dispatch = useDispatch();
  const { pathname } = useLocation(); 
  const history = useHistory();
  const isPublic = pathname.includes("pub");
  const { isConnected, isConnecting, walletAddress, walletBalance, networkClient } = useSelector((state: RootState) => state.walletConnector);
  const { meV2, currentNetworkInformation } = useSelector((state: RootState) => state.walletAuthenticator);
  const { tokenData, isProcessed, isProcessing } = useSelector((state: RootState) => state.crucible); 

  useEffect(() => {
    if (meV2 && meV2.role === COMMUNITY_ROLE_TAG) {
      if (isConnecting === false && isConnected === false) {
        handleLogout();
      }
    }
    // eslint-disable-next-line
  }, [isConnected, isConnecting]);

  useEffect(() => {
    if (networkClient && isProcessed === true && isProcessing === false) {
      loadTokenData(networkClient);
    }
  }, [networkClient, isProcessed, isProcessing]);
  
  const handleLogout = async () => {
    // let data = {};
    try {
      // let logoutResponse =  localStorageHelper.token() && await handleCommunityMemberLogout(data);
      // console.log(logoutResponse)
      if (localStorageHelper.load(ME_TAG)?.role === ORG_ROLE_TAG) {
        history.push(PATH_AUTH.orgLogin);
      }
      localStorageHelper.removeItem(ME_TAG);
      localStorageHelper.removeItem(TOKEN_TAG);
    } catch (e) {}
  };

  const loadTokenData = async (networkClient: any) => {
    const tokens = [
      {
        token: "cFRM",
        currency: cFRMTokenContractAddress,
      },
      {
        token: "cFRMx",
        currency: cFRMxTokenContractAddress,
      },
      {
        token: "APELPCFRMBNB",
        currency: APELPCFRMBNBTokenContractAddress,
      },
      {
        token: "APELPCFRMxBNB",
        currency: APELPCFRMxBNBTokenContractAddress,
      },
      {
        token: "FRMBSC",
        currency: tokenFRMBSCMainnet,
      },
      {
        token: "FRMxBSC",
        currency: tokenFRMxBSCMainnet,
      },
    ];

    for (let item of tokens) {
      const tokenDetails = await getTokenInformationFromWeb3(networkClient, walletAddress, item.currency);
      const cabnDetails = await getCABNInformation(item.currency); 
      let finalData = { ...tokenDetails, ...cabnDetails };
      if (!!finalData) {
        dispatch(
          CrucibleActions.updateTokenData({
            token: item.token,
            ...finalData,
          })
        );
      }
    }
  };

  return (
    <>
      <FHeader showLogo={false} titleText={title}>
        {localStorageHelper.load(ME_TAG)?.role === ORG_ROLE_TAG && !isPublic && (
          <FItem align="right" display={"flex"}>
            <FButton title="Logout" postfix={<RiLogoutCircleRLine />} onClick={handleLogout}></FButton>
          </FItem>
        )}
        {localStorageHelper.load(ME_TAG)?.role !== ORG_ROLE_TAG && (
          <FItem align="right" display={"flex"} className="no-left-margin">
            <>
              {walletAddress && (
                <>
                  <FCard variant={"primary"} className={"no-left-margin custom-padding-0 custom-border-radius-4 custom-min-width-270"}>
                    <FItem display={"flex"} alignY="center">
                      <FCard variant={"primary"} className={"d-flex custom-padding-10 overflow-visible"}>
                        <img src={tokenData["FRMBSC"]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} />
                        {tokenData["FRMBSC"] && TruncateWithoutRounding(tokenData["FRMBSC"]?.balance, 3)}
                        <p className="primary-color f-pl--4"> {tokenData["FRMBSC"]?.symbol ? tokenData["FRMBSC"]?.symbol : tokenData["FRMBSC"]?.tokenSymbol}</p>
                      </FCard>
                      <FCard variant={"primary"} className={"d-flex custom-padding-10 overflow-visible"}>
                        {tokenData["FRMxBSC"]?.logo && <img src={tokenData["FRMxBSC"]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} />}
                        {tokenData["FRMxBSC"] && TruncateWithoutRounding(tokenData["FRMxBSC"]?.balance, 3)}
                        <p className="primary-color f-pl--4"> {tokenData["FRMxBSC"]?.symbol ? tokenData["FRMxBSC"]?.symbol : tokenData["FRMxBSC"]?.tokenSymbol}</p>
                      </FCard>
                    </FItem>
                  </FCard>
                  <FCard variant={"secondary"} className={"no-left-margin custom-padding-1 custom-border-radius-4 custom-min-width-270"}>
                    <FItem display={"flex"} alignY="center">
                      <FCard variant={"secondary"} className={"d-flex custom-padding-10 overflow-visible"}>
                        <img
                          src={currentNetworkInformation && currentNetworkInformation?.networkCurrencyAddressByNetwork?.currency?.logo}
                          height="22px"
                          width="22px"
                          style={{ marginRight: "3px" }}
                        />
                        {getFormattedWalletAddress(walletAddress)}
                      </FCard>
                      <FCard className={"no-left-margin custom-padding-10 d-flex custom-border-radius-4"} variant={"primary"}>
                        {TruncateWithoutRounding(getFormattedBalance(walletBalance), 3)} {currentNetworkInformation && currentNetworkInformation?.mainnetCurrencySymbol}
                      </FCard>
                    </FItem>
                  </FCard>
                </>
              )}
              <MetaMaskConnector.WalletConnector
                WalletConnectView={FButton}
                WalletConnectModal={ConnectWalletDialog}
                isAuthenticationNeeded={true}
                WalletConnectViewProps={{
                  className: isConnected ? "no-left-margin connect-button-left-borders" : "no-left-margin",
                }}
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
            </>
          </FItem>
        )}
      </FHeader>
    </>
  );
};

export default DashboardHeader;
