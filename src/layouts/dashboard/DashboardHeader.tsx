import React, { useEffect, useState } from "react";
import { FHeader, FButton, FItem, FCard } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useHistory, Link, useLocation } from "react-router-dom";
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
import { MetaMaskConnector } from "../../container-components";
import { ConnectWalletDialog } from "../../utils/connect-wallet/ConnectWalletDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
// import { logout } from "../../_apis/OnboardingCrud";
import toast from "react-hot-toast";
import { localStorageHelper, TruncateWithoutRounding } from "../../utils/global.utils";
import { COMMUNITY_ROLE_TAG, ME_TAG, TOKEN_TAG, ORG_ROLE_TAG, tokenFRMBSCMainnet, tokenFRMxBSCMainnet } from "../../utils/const.utils";
import { getFormattedBalance, getFormattedWalletAddress } from "../../utils/global.utils";
import FerrumJson from "../../utils/FerrumToken.json";
import { AbiItem } from "web3-utils";
import { Big } from "big.js";
import { getNetworkInformationForPublicUser } from "../../_apis/NetworkCrud";
import { getCABNInformationForPublicUser } from "../../_apis/CABNCrud";

const DashboardHeader = ({ title }: any) => {
  const { pathname } = useLocation();
  // const dispatch = useDispatch();
  const history = useHistory();
  const isPublic = pathname.includes("pub");
  const [networkResponse, setNetworkResponse] = useState<any>({});
  const { isConnected, isConnecting, walletAddress, walletBalance, networkClient, currentWalletNetwork } = useSelector((state: RootState) => state.walletConnector);
  const { meV2 } = useSelector((state: RootState) => state.walletAuthenticator);

  const [FRMTokenInfo, setFRMTokenInfo] = useState<any>({});

  const [FRMxTokenInfo, setFRMxTokenInfo] = useState<any>({});

  useEffect(() => {
    if (currentWalletNetwork) {
      getCurrentNetworkInformation(currentWalletNetwork);
    }
  }, [currentWalletNetwork]);

  const getCurrentNetworkInformation = async (currentWalletNetwork: any) => {
    let networkResponse = await getNetworkInformationForPublicUser(currentWalletNetwork);
    networkResponse = networkResponse.data && networkResponse.data.body && networkResponse.data.body.network;
    if (networkResponse) {
      setNetworkResponse(networkResponse);
    }
  };

  useEffect(() => {
    if (meV2 && meV2.role === COMMUNITY_ROLE_TAG) {
      if (isConnecting === false && isConnected === false) {
        handleLogout();
      }
    }
    // eslint-disable-next-line
  }, [isConnected, isConnecting]);

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

  useEffect(() => {
    getTokenInformation(tokenFRMBSCMainnet, setFRMTokenInfo, FRMTokenInfo);
    getTokenInformation(tokenFRMxBSCMainnet, setFRMxTokenInfo, FRMxTokenInfo);
    getCABNInformation(tokenFRMBSCMainnet, setFRMTokenInfo, FRMTokenInfo);
    getCABNInformation(tokenFRMxBSCMainnet, setFRMxTokenInfo, FRMxTokenInfo);
    // eslint-disable-next-line
  }, [networkClient]);

  const getCABNInformation = async (tokenContractAddress: any, setInfo: any, info: any) => {
    let cabnResponse: any = await getCABNInformationForPublicUser(tokenContractAddress);
    cabnResponse = cabnResponse.data && cabnResponse.data.body && cabnResponse.data.body.currencyAddressesByNetworks[0];
    if (cabnResponse) {
      setInfo({ ...info, symbol: cabnResponse.currency.symbol, logo: cabnResponse.currency.logo });
    }
  };

  const getTokenInformation = async (tokenContractAddress: any, setInfo: any, info: any) => {
    let symbol,
      decimals,
      name,
      balance = null;
    try {
      if (networkClient) {
        const tokenContract = new networkClient.eth.Contract(FerrumJson.abi as AbiItem[], tokenContractAddress);
        symbol = await tokenContract.methods.symbol().call();
        decimals = (await tokenContract.methods.decimals().call()) as any;
        name = await tokenContract.methods.name().call();
        balance = await tokenContract.methods.balanceOf(walletAddress).call();
        const decimalFactor = 10 ** Number(decimals);
        balance = new Big(balance).div(decimalFactor).toFixed();
      }
      setInfo({
        ...info,
        tokenSymbol: symbol,
        balance: balance ? balance : "0",
        name,
        decimals,
      });
    } catch (e) {
      toast.error(`Error occured: ${e}`);
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
                        <img src={FRMTokenInfo?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} />
                        {FRMTokenInfo && TruncateWithoutRounding(FRMTokenInfo.balance, 3)}
                        <p className="primary-color f-pl--4"> {FRMTokenInfo.symbol ? FRMTokenInfo.symbol : FRMTokenInfo.tokenSymbol}</p>
                      </FCard>
                      <FCard variant={"primary"} className={"d-flex custom-padding-10 overflow-visible"}>
                        {FRMxTokenInfo.logo && <img src={FRMxTokenInfo.logo} height="22px" width="22px" style={{ marginRight: "3px" }} />}
                        {FRMxTokenInfo && TruncateWithoutRounding(FRMxTokenInfo.balance, 3)}
                        <p className="primary-color f-pl--4"> {FRMxTokenInfo.symbol ? FRMxTokenInfo.symbol : FRMxTokenInfo.tokenSymbol}</p>
                      </FCard>
                    </FItem>
                  </FCard>
                  <FCard variant={"secondary"} className={"no-left-margin custom-padding-1 custom-border-radius-4 custom-min-width-270"}>
                    <FItem display={"flex"} alignY="center">
                      <FCard variant={"secondary"} className={"d-flex custom-padding-10 overflow-visible"}>
                        <img src={networkResponse && networkResponse?.networkCurrencyAddressByNetwork?.currency?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} />
                        {getFormattedWalletAddress(walletAddress)}
                      </FCard>
                      <FCard className={"no-left-margin custom-padding-10 d-flex custom-border-radius-4"} variant={"primary"}>
                        {TruncateWithoutRounding(getFormattedBalance(walletBalance), 3)} {networkResponse && networkResponse?.networkCurrencySymbol}
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
