import React, { useEffect, useState } from "react";
import { FButton, FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { CrucibleManage } from "../common/CardManage";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { useWeb3React } from "@web3-react/core";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
// import Web3 from "web3";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { crucibleSlice } from "./../../../redux/CrucibleSlice";
import { BigUtils } from "./../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getActualRoute } from "../../../common/Helper";

export const Manage = () => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  const [dashboardAction, setDashboardAction] = useState(false);
  // const [unwrap, setUnwrap] = useState(false);
  // const [flowType, setFlowType] = useState("");
  const location: any = useLocation();
  const { active, library } = useWeb3React();
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  //@ts-ignore
  const crucible = useSelector((state) => state.crucible.selectedCrucible);
  const {
    // isConnected,
    // isConnecting,
    walletAddress,
    // walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  //@ts-ignore
  const tokenPrices = useSelector((state) => state.crucible.tokenPrices);
  //@ts-ignore
  const LPStakingDetails = useSelector((state: RootState) => state.crucible.userLpStakingDetails);
  console.log(tokenPrices, LPStakingDetails, "tokenPricestokenPrices");

  const onUnStakeClick = () => {
    history.push({
      pathname: getActualRoute(farm, PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.unstake),
    });
  };

  const onStakeClick = () => {
    history.push({
      pathname: getActualRoute(farm, PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.stake),
    });
  };

  const onClaimRewardsClick = () => {
    history.push({
      pathname: getActualRoute(farm, PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.withdraw),
    });
  };

  const onAddLiquidityClick = () => {
    history.push({
      pathname: getActualRoute(farm, PATH_DASHBOARD.crucible.crucibleActionRoutes.liquidity),
    });
  };

  const loadCrucibleUserInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { crucibleCurrency: string }, ctx) => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const userCrucibleDetails = await client.getUserCrucibleInfo(ctx.dispatch, payload.crucibleCurrency, walletAddress as string);
    const stakingType = "LP";
    if (!!userCrucibleDetails) {
      if (stakingType === "LP") {
      }
      dispatch(actions.userCrucibleDetailsLoaded({ data: userCrucibleDetails.data }));
    }
  });

  const loadLPStakingInfo = createAsyncThunk(
    "crucible/loadUserInfo",
    async (
      payload: {
        crucibleCurrency: string;
        userAddress: string;
        stakingAddress: string;
        network: string;
      },
      ctx
    ) => {
      const actions = crucibleSlice.actions;
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);
      const userStakingDetails = await client.getLPStakingInfo(
        ctx.dispatch,
        location.state.LpCurrency,
        walletAddress as string,
        payload.stakingAddress,
        payload.network
      );
      if (!!userStakingDetails) {
        dispatch(
          actions.userLpStakingDetailsLoaded({
            token: "cFRMx_BNB_LP",
            data: {
              ...userStakingDetails.data,
              stakingAddress: payload.stakingAddress,
              LPaddress: location.state.LpCurrency,
            },
          })
        );
      }
    }
  );

  const loadPricingInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { crucible: any }, ctx) => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);

    const tokens = [
      {
        token: "FRMX",
        currency: "BSC:0x8523518001ad5d24b2A04e8729743C0643A316c0",
      },
      {
        token: "FRM",
        currency: "BSC:0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
      },
      {
        token: "cFRM-BNB-LP",
        currency: "BSC:0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
      },
      {
        token: "cFRM",
        currency: "BSC:0x8523518001ad5d24b2A04e8729743C0643A316c0",
      },
      {
        token: "cFRMx",
        currency: "BSC:0x8523518001ad5d24b2A04e8729743C0643A316c0",
      },
    ];

    for (let item of tokens) {
      const priceDetails = (await client.getPairPrice(ctx.dispatch, item.currency, item.currency, walletAddress as string)) as any;
      if (!!priceDetails) {
        dispatch(
          actions.priceDataLoaded({
            data: {
              token: item.token,
              price: (priceDetails.basePrice.usdtPrice),
            },
          })
        );
        console.log(priceDetails);
      }
    }
  });

  useEffect(() => {
    if (location.state.id === undefined) {
      history.push(PATH_DASHBOARD.crucible.index);
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (networkClient && location.state.network && location.state.contract) {
      //@ts-ignore
      getCrucibleDetail();
    }
    // eslint-disable-next-line
  }, [active, library, networkClient]);

  const getCrucibleDetail = async () => {
    // setIsLoading(true);
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const actions = crucibleSlice.actions;
    dispatch(
      loadCrucibleUserInfo({
        crucibleCurrency: `${location.state.network.toUpperCase()}:${(location.state.contract || "").toLowerCase()}`,
      })
    );
    const crucibleData = await client.getCrucibleDetails(dispatch, location.state.network, location.state.contract, walletAddress as string);
    const data = await web3Helper.getTokenData(walletAddress as string, location.state.LpCurrency);
    dispatch(
      actions.selectedCrucible({
        data: {
          ...crucibleData.data,
          LP_balance: data.balance,
          LP_symbol: data.symbol,
        },
      })
    );

    if (crucibleData.data) {
      dispatch(
        loadLPStakingInfo({
          crucibleCurrency: `${(location.state.LpCurrency || "").toLowerCase()}`,
          userAddress: walletAddress as string,
          network: location.state.network,
          stakingAddress: location.state.LPstakingAddress,
        })
      );
      dispatch(loadPricingInfo({ crucible: crucibleData.data }));
      // setIsLoading(false);
    }
  };

  return (
    <FContainer className="card-manage">
      <CrucibleMyBalance />

      {/* <FResponseBar variant="success" title={"Withdraw Transaction Successful. [ 0x06167934...5bvf645949c ]"} /> */}
      <CrucibleManage dashboardAction={dashboardAction} setDashboardAction={setDashboardAction} />
      <FContainer>
        <FCard className="card-crucible-token-info">
          <FTypo size={20}>Crucible Token Info</FTypo>
          <FGrid className={"info-bar"}>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate || "0")
                    .times(100)
                    .toString()}%`}
                </FTypo>
                <FTypo size={20}>Transfer Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate || "0")
                    .times(100)
                    .toString()}%`}
                </FTypo>
                <FTypo size={20}>Unwrap Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  {crucible?.symbol}
                </FTypo>
                <FTypo size={20}>Crucible Token</FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <FCard className={"styled-card align-v your-crucible"}>
            <FGrid>
              <FGridItem size={[6, 6, 6]} dir="column">
                <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
                <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"}>
                  {LPStakingDetails["cFRMx_BNB_LP"]?.stake || "0"}
                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                    CAKE-LP cFRMx-BNB
                  </FTypo>
                </FTypo>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem align="right">
                  <FTypo color="#DAB46E" size={40} weight={600} align={"end"} display="flex" alignY={"end"}>
                    <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
                      APR
                    </FTypo>
                    192%
                  </FTypo>
                </FItem>
              </FGridItem>
            </FGrid>
          </FCard>
          <FCard className={"your-claimed-rewards"}>
            <FGrid>
              <FGridItem size={[8, 8, 6]}>
                <FTypo className="f-pb--2">Your unclaimed Rewards</FTypo>
                <FTypo size={24} weight={500}>
                  {LPStakingDetails["cFRMx_BNB_LP"]?.rewards[0]?.rewardAmount || "0"}
                </FTypo>
              </FGridItem>
              <FGridItem size={[4, 4, 6]} alignX="center" alignY={"end"}>
                <FButton title={"Claim"} onClick={() => onClaimRewardsClick()}></FButton>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
        <FContainer width={850}>
          <FGrid className="btn-wrap f-mt-2 f-mb-2">
            <FGridItem size={[4, 4, 4]}>
              <FButton title={"Stake"} className={"w-100 f-btn-gradiant"} onClick={onStakeClick}></FButton>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FButton variant={"secondary"} title={"Unstake"} outlined className={"w-100"} onClick={onUnStakeClick}></FButton>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FButton variant={"secondary"} title={"Add Liquidity"} outlined className={"w-100"} onClick={onAddLiquidityClick}></FButton>
            </FGridItem>
          </FGrid>
        </FContainer>
      </FContainer>
    </FContainer>
  );
};
