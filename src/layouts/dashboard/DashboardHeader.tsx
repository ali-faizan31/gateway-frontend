import React, { useEffect, useState } from "react";
import { FHeader, FButton, FItem, FCard } from "ferrum-design-system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";
import { PATH_AUTH, PATH_DASHBOARD } from "../../routes/paths";
import { MetaMaskConnector } from "../../container-components";
import { ConnectWalletDialog } from "../../utils/connect-wallet/ConnectWalletDialog";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
// import { logout } from "../../_apis/OnboardingCrud";
import toast from "react-hot-toast";
import { localStorageHelper } from "../../utils/global.utils";
import {
  COMMUNITY_ROLE_TAG,
  ME_TAG,
  TOKEN_TAG,
  ORG_ROLE_TAG,
  tokenFRMBSCMainnet,
} from "../../utils/const.utils";
import {
  getFormattedBalance,
  getFormattedWalletAddress,
} from "../../utils/global.utils";
import FerrumJson from "../../utils/FerrumToken.json";
import { AbiItem } from "web3-utils";
import { Big } from "big.js";
// import * as CrucibleActions from '../../components/crucible/redux/CrucibleActions'

const DashboardHeader = ({ title }: any) => {
  // const { pathname } = useLocation();
  // const dispatch = useDispatch();
  const history = useHistory();
  // const isPublic = pathname.includes("pub");
  const {
    isConnected,
    isConnecting,
    walletAddress,
    walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  const { meV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const [tokenInfo, setTokenInfo] = useState({
    symbol: "",
    name: "",
    decimals: "",
    balance: "",
  });

  //   useEffect(() => {
  //     if ( isConnected === false && tokenV2 ){
  //         dispatch(CrucibleActions.resetCrucible());
  //     }
  // }, [isConnected])

  useEffect(() => {
    if (meV2 && meV2.role === COMMUNITY_ROLE_TAG) {
      if (isConnecting === false && isConnected === false) {
        handleLogout();
      }
    }
    // eslint-disable-next-line
  }, [isConnected, isConnecting]);

  // const showLogoutButton = () => {
  //   if (isPublic) {
  //     return false;
  //   }
  //   return true;
  // };

  // const handleCommunityMemberLogout = async (values: any) => {
  //   try {
  //     const res = await logout(values, localStorageHelper.getToken())
  //     return res?.data?.body;
  //   } catch (e: any) {
  //     toast.error(`Error Occured: ${e?.response?.data?.status?.message}`)
  //   }
  // }

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
    getTokenInformation();
    // eslint-disable-next-line
  }, [networkClient]);

  const getTokenInformation = async () => {
    let symbol,
      decimals,
      name,
      balance = null;
    try {
      if (networkClient) {
        const tokenContract = new networkClient.eth.Contract(
          FerrumJson.abi as AbiItem[],
          tokenFRMBSCMainnet
        );
        symbol = await tokenContract.methods.symbol().call();
        decimals = (await tokenContract.methods.decimals().call()) as any;
        name = await tokenContract.methods.name().call();
        balance = await tokenContract.methods.balanceOf(walletAddress).call();
        const decimalFactor = 10 ** Number(decimals);
        balance = new Big(balance).div(decimalFactor).toFixed();
      }
      setTokenInfo({
        symbol,
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
        {localStorageHelper.load(ME_TAG)?.role === ORG_ROLE_TAG && (
          <FItem align="right" display={"flex"}>
            <FButton
              title="Logout"
              postfix={<RiLogoutCircleRLine />}
              onClick={handleLogout}
            ></FButton>
          </FItem>
        )}
        {localStorageHelper.load(ME_TAG)?.role !== ORG_ROLE_TAG && (
          <FItem align="right" display={"flex"} className="no-left-margin">
            <>
              {walletAddress && (
                <>
                  <FCard
                    variant={"primary"}
                    className={
                      "no-left-margin custom-padding-10 custom-border-radius-4 custom-min-width-270"
                    }
                  >
                    <FItem display={"flex"}>
                      <FCard
                        variant={"primary"}
                        className={"d-flex custom-padding-10 overflow-visible"}
                      >
                        {tokenInfo && tokenInfo.balance}
                        <p className="primary-color f-pl--4">
                          {" " + tokenInfo.symbol}
                        </p>
                      </FCard>
                      {/* <FCard className={"no-left-margin custom-padding-10 d-flex custom-border-radius-4"} variant={"primary"}>
                        {getFormattedBalance(walletBalance)} Matic
                      </FCard> */}
                    </FItem>
                  </FCard>
                  <FCard
                    variant={"secondary"}
                    className={
                      "no-left-margin custom-padding-10 custom-border-radius-4 custom-min-width-270"
                    }
                  >
                    <FItem display={"flex"}>
                      <img src="/ferrum/wallet-address.svg" alt="Icon" />
                      <FCard
                        variant={"secondary"}
                        className={"d-flex custom-padding-10 overflow-visible"}
                      >
                        {getFormattedWalletAddress(walletAddress)}
                      </FCard>
                      <FCard
                        className={
                          "no-left-margin custom-padding-10 d-flex custom-border-radius-4"
                        }
                        variant={"primary"}
                      >
                        {new Big(getFormattedBalance(walletBalance)).toFixed(4)}
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
                  className: isConnected
                    ? "no-left-margin connect-button-left-borders"
                    : "no-left-margin",
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
