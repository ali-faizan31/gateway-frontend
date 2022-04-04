import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FButton,
  FCard,
  // FCard,
  FContainer,
  FItem,
  // FGrid,
  // FGridItem,
  // FItem,
  FTypo,
} from "ferrum-design-system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CrucibleClient } from "../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "../../../container-components/web3Client/web3Helper";
import { RootState } from "../../../redux/rootReducer";
import Loading from "../../../assets/gif/Loading.gif"
// import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../common/CardAPR";
import { CrucibleMyBalance } from "../common/CardMyBalance";
import { CruciblePrice } from "../common/CardPrice";
// import { useHistory, useLocation } from "react-router";
import * as CrucibleActions from "../redux/CrucibleActions";
import { crucibleSlice } from "../redux/CrucibleSlice";
import { Crucible_Farm_Address_Details, Pricing_Tokens } from "../../../utils/const.utils";
import { getAPRInformationForPublicUser } from "../../../_apis/APRCrud";
import { ClipLoader } from "react-spinners";
import { MetaMaskConnector } from "../../../container-components";
import { ConnectWalletDialog } from "../../../utils/connect-wallet/ConnectWalletDialog";

const CrucibleDashboardPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { networkClient, walletAddress, isConnected } = useSelector((state: RootState) => state.walletConnector);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { selectedCrucible, userCrucibleDetails, userLpStakingDetails } = useSelector((state: RootState) => state.crucible);

  // useEffect(() => {
  //   if (userLpStakingDetails && userLpStakingDetails["cFRM-BNB"] && userLpStakingDetails["cFRM-BNB"].openCap) {
  //     setIsLoading(false);
  //   }
  // }, [userLpStakingDetails]);

  useEffect(() => {
    getAPRInformation();
    dispatch(CrucibleActions.resetCrucible());
  }, []);

  useEffect(() => {
    if (networkClient) {
      setIsLoading(true);
      dispatch(loadPricingInfo());
      for (let farm of Crucible_Farm_Address_Details) {
        getCrucibleDetail(farm);
      }
    }
  }, [networkClient]);

  const getCrucibleDetail = async (farm: any) => {
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const actions = crucibleSlice.actions;
    dispatch(
      loadCrucibleUserInfo({
        crucibleCurrency: `${farm.network.toUpperCase()}:${(farm.contract || "").toLowerCase()}`,
        farm,
      })
    );
    const crucibleData = await client.getCrucibleDetails(dispatch, farm.network, farm.contract, walletAddress as string);
    const data = await web3Helper.getTokenData(walletAddress as string, farm.LpCurrency);
    dispatch(
      actions.selectedCrucible({
        token: `${farm.internalName}`,
        data: { ...crucibleData.data, LP_balance: data.balance, LP_symbol: data.symbol },
      })
    );

    if (farm?.internalName.includes("BNB")) {
      if (crucibleData.data) {
        dispatch(loadLPStakingInfo({ farm }));
        setIsLoading(false);
      }
    }
  };

  const loadCrucibleUserInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { crucibleCurrency: string; farm: any }, ctx) => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const res = await web3Helper.getTokenPriceFromRouter();
    const userCrucibleDetails = await client.getUserCrucibleInfo(ctx.dispatch, payload.crucibleCurrency, walletAddress as string);
    const stakingType = "LP";
    if (!!userCrucibleDetails) {
      if (stakingType === "LP") {
      }
      dispatch(actions.userCrucibleDetailsLoaded({ token: `${payload.farm.internalName}`, data: userCrucibleDetails.data }));
    }
  });

  const loadLPStakingInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { farm: any }, ctx) => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const userStakingDetails = await client.getLPStakingInfo(
      ctx.dispatch,
      `${(payload.farm.LpCurrency || "").toLowerCase()}`,
      walletAddress as string,
      payload.farm.LPstakingAddress,
      payload.farm.network
    );
    if (!!userStakingDetails) {
      dispatch(
        actions.userLpStakingDetailsLoaded({
          token: `${payload.farm.internalName}`,
          data: {
            ...userStakingDetails.data,
            stakingAddress: payload.farm.LPstakingAddress,
            LPaddress: payload.farm.LpCurrency,
          },
        })
      );
    }
  });

  const loadPricingInfo = createAsyncThunk("crucible/loadUserInfo", async () => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);

    for (let item of Pricing_Tokens) {
      const priceDetails = await web3Helper.getTokenPriceFromRouter(item.currency);
      if (!!priceDetails) {
        dispatch(
          actions.priceDataLoaded({
            data: {
              token: item.token,
              price: Number(priceDetails).toFixed(3),
            },
          })
        );
      }
    }
  });

  const getAPRInformation = async () => {
    let aprResponse: any = await getAPRInformationForPublicUser();
    aprResponse = aprResponse.data && aprResponse.data.body && aprResponse.data.body.crucibleApr;
    dispatch(CrucibleActions.updateAPRData(aprResponse));
  };

  return (
    <FContainer className="f-ml-0 crucible-dashboard">
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <img src={Loading}/>
            {/* <ClipLoader color="#cba461" loading={true} size={150} /> */}
          </FItem>
        </FCard>
      ) : (
        <>

          {isConnected && tokenV2 ? (
            <>
              <CrucibleMyBalance />
              <FTypo className="page-title">Dashboard</FTypo>
              <CruciblePrice />
              <CardAPR />
            </>
          ) : (
            <>
              <FCard className="card-apr f-mt-2 f-mb-2 f-pb-2">
                <FTypo className="card-title f-pl-1">Please Connect to your wallet to proceed to crucible</FTypo>
                <MetaMaskConnector.WalletConnector
                  WalletConnectView={FButton}
                  WalletConnectModal={ConnectWalletDialog}
                  isAuthenticationNeeded={true}
                  WalletConnectViewProps={{ className: "w-100" }}
                />
              </FCard>
            </>)
          }
        </>
      )}
    </FContainer>
  );
};
export default CrucibleDashboardPage;
