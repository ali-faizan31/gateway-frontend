import { createAsyncThunk } from "@reduxjs/toolkit";
import {
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
// import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../common/CardAPR";
import { CrucibleMyBalance } from "../common/CardMyBalance";
import { CruciblePrice } from "../common/CardPrice";
// import { useHistory, useLocation } from "react-router";
import * as CrucibleActions from "../redux/CrucibleActions";
import { crucibleSlice } from "../redux/CrucibleSlice";
import {
  cFRMTokenContractAddress,
  cFRMxTokenContractAddress,
  APELPCFRMBNBTokenContractAddress,
  APELPCFRMxBNBTokenContractAddress,
  tokenFRMBSCMainnet,
  tokenFRMxBSCMainnet,
  Crucible_Farm_Address_Details,
  Pricing_Tokens,
} from "../../../utils/const.utils";
import { getCABNInformation, getTokenInformationFromWeb3 } from "../../../utils/global.utils";
import { getAPRInformationForPublicUser } from "../../../_apis/APRCrud";
import { ClipLoader } from "react-spinners";

const CrucibleDashboardPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { networkClient, walletAddress } = useSelector((state: RootState) => state.walletConnector);
  const { selectedCrucible, userCrucibleDetails, userLpStakingDetails } = useSelector((state: RootState) => state.crucible);

  useEffect(() => {
    console.log("selectedCrucible", selectedCrucible);
  }, [selectedCrucible]);

  useEffect(() => {
    console.log("userCrucibleDetails", userCrucibleDetails);
  }, [userCrucibleDetails]);

  useEffect(() => {
    console.log("userLpStakingDetails", userLpStakingDetails);
  }, [userLpStakingDetails]);

  useEffect(() => {
    setIsLoading(true);
    getAPRInformation();
    dispatch(CrucibleActions.resetCrucible());
  }, []);

  useEffect(() => {
    if (networkClient) {
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
    setIsLoading(false);
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
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </FCard>
      ) : (
        <>
          <CrucibleMyBalance />
          <FTypo className="page-title">Dashboard</FTypo>
          <CruciblePrice />
          <CardAPR />
        </>
      )}
    </FContainer>
  );
};
export default CrucibleDashboardPage;
