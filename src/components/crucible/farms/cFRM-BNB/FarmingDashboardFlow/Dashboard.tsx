import React, { useEffect, useState } from "react";
import {
  FButton,
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  // FResponseBar,
  FTypo,
} from "ferrum-design-system";
import { CrucibleManage } from "../common/CardManage";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { useWeb3React } from "@web3-react/core";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
// import Web3 from "web3";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { crucibleSlice } from "./../../../redux/CrucibleSlice";
import { BigUtils } from "./../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ClipLoader from "react-spinners/ClipLoader";
import { CFRM_BNB_STEP_FLOW_IDS } from "../../../common/utils";
import { getLatestStepToRender } from "../../../common/Helper";

export const Manage = () => {
  const history = useHistory();
  const [dashboardAction, setDashboardAction] = useState(false);
  // const [unwrap, setUnwrap] = useState(false);
  // const [flowType, setFlowType] = useState("");
  const location: any = useLocation();
  const { active, library } = useWeb3React();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const userCrucibleData = useSelector(
    (state: RootState) => state.crucible.userCrucibleDetails
  );
  let userStake = (userCrucibleData.stakes || []).find(
    (e: any) => e.address === "0xAb0433AA0b5e05f1FF0FD293CFf8bEe15882cCAd"
  );
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector(
    (state: RootState) => state.crucible
  );
  // const { approveTransactionId } = useSelector((state: RootState) => state.approval);
  const { tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );

  const onUnStakeClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.unstake;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history
    );
    setIsLoading(false);
  };

  const onStakeClick = async () => {
    // history.push({pathname: PATH_DASHBOARD.crucible.cFRM_BNB.stake.stake});
    setIsLoading(true);
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.stake;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history
    );
    setIsLoading(false);
  };

  const onClaimRewardsClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.withdraw;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history
    );
    setIsLoading(false);
  };

  const onAddLiquidityClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.generalAddLiquidity;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name; // getting no history againts this id
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history
    );
    setIsLoading(false);
  };

  const loadCrucibleUserInfo = createAsyncThunk(
    "crucible/loadUserInfo",
    async (payload: { crucibleCurrency: string }, ctx) => {
      const actions = crucibleSlice.actions;
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);
      const userCrucibleDetails = await client.getUserCrucibleInfo(
        ctx.dispatch,
        payload.crucibleCurrency,
        walletAddress as string
      );
      const stakingType = "LP";
      if (!!userCrucibleDetails) {
        if (stakingType === "LP") {
        }
        dispatch(
          actions.userCrucibleDetailsLoaded({ data: userCrucibleDetails.data })
        );
      }
    }
  );

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
            token: "cFRM_BNB_LP",
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

  const loadPricingInfo = createAsyncThunk(
    "crucible/loadUserInfo",
    async (payload: { crucible: any }, ctx) => {
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
      ];

      for (let item of tokens) {
        const priceDetails = (await client.getPairPrice(
          ctx.dispatch,
          item.currency,
          item.currency,
          walletAddress as string
        )) as any;
        if (!!priceDetails) {
          dispatch(
            actions.priceDataLoaded({
              data: {
                token: item.token,
                price: Number(priceDetails.basePrice.usdtPrice).toFixed(3),
              },
            })
          );
          console.log(priceDetails);
        }
      }
    }
  );

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
    setIsLoading(true);
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const actions = crucibleSlice.actions;
    dispatch(
      loadCrucibleUserInfo({
        crucibleCurrency: `${location.state.network.toUpperCase()}:${(
          location.state.contract || ""
        ).toLowerCase()}`,
      })
    );
    const crucibleData = await client.getCrucibleDetails(
      dispatch,
      location.state.network,
      location.state.contract,
      walletAddress as string
    );
    const data = await web3Helper.getTokenData(
      walletAddress as string,
      location.state.LpCurrency
    );
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
          crucibleCurrency: `${(
            location.state.LpCurrency || ""
          ).toLowerCase()}`,
          userAddress: walletAddress as string,
          network: location.state.network,
          stakingAddress: location.state.LPstakingAddress,
        })
      );
      dispatch(loadPricingInfo({ crucible: crucibleData.data }));
      setIsLoading(false);
    }
  };

  return (
    <FContainer className="f-mr-0 card-manage" width={900}>
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </FCard>
      ) : (
        <>
          <CrucibleMyBalance />
          {/* <FResponseBar variant="success" title={"Withdraw Transaction Successful. [ 0x06167934...5bvf645949c ]"} /> */}
          <CrucibleManage
            dashboardAction={dashboardAction}
            setDashboardAction={setDashboardAction}
          />
          <FContainer width={650}>
            <FCard className="card-crucible-token-info" width={"95%"}>
              <FTypo size={24}>Crucible Token Info</FTypo>
              <FGrid className="btn-wrap">
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo
                      color="#DAB46E"
                      size={20}
                      weight={700}
                      className="f-pb--2"
                    >
                      {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate || "0")
                        .times(100)
                        .toString()}%`}
                    </FTypo>
                    <FTypo size={20}>Transfer Fee</FTypo>
                  </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo
                      color="#DAB46E"
                      size={20}
                      weight={700}
                      className="f-pb--2"
                    >
                      {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate || "0")
                        .times(100)
                        .toString()}%`}
                    </FTypo>
                    <FTypo size={20}>Unwrap Fee</FTypo>
                  </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo
                      color="#DAB46E"
                      size={20}
                      weight={700}
                      className="f-pb--2"
                    >
                      {crucible?.symbol}
                    </FTypo>
                    <FTypo size={20}>Crucible Token</FTypo>
                  </FItem>
                </FGridItem>
              </FGrid>
              <FCard className={"styled-card align-v your-crucible"}>
                <FGrid>
                  <FGridItem size={[6, 6, 6]}>
                    <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
                    <FTypo
                      size={24}
                      weight={600}
                      align={"end"}
                      display="flex"
                      alignY={"end"}
                    >
                      {Number(userStake?.stakeOf || "0").toFixed(3)}
                      <FTypo
                        size={12}
                        weight={300}
                        className={"f-pl--7 f-pb--1"}
                      >
                        APE-LP cFRM-BNB
                      </FTypo>
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[6, 6, 6]}>
                    <FItem align="right">
                      <FTypo
                        color="#DAB46E"
                        size={40}
                        weight={600}
                        align={"end"}
                        display="flex"
                        alignY={"end"}
                      >
                        <FTypo
                          size={16}
                          weight={500}
                          className={"f-pr--7 f-pb--3"}
                          align="right"
                        >
                          APR
                        </FTypo>
                        192%
                      </FTypo>
                    </FItem>
                  </FGridItem>
                </FGrid>
              </FCard>
              <FCard className={"your-claimed-rewards"}>
                <FGrid alignY={"center"}>
                  <FGridItem size={[6]} dir="column">
                    <FTypo className="f-pb--2">Your unclaimed Rewards</FTypo>
                    <FTypo color="#DAB46E" size={22} weight={500}>
                      {Number(userStake?.rewardOf || "0").toFixed(3)} cFRM
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[6]} alignY="center" alignX={"end"}>
                    <FButton
                      title={"Claim"}
                      onClick={onClaimRewardsClick}
                    ></FButton>
                  </FGridItem>
                </FGrid>
              </FCard>
            </FCard>
          </FContainer>
          <FContainer width={850}>
            <FGrid className="btn-wrap f-mt-2 f-mb-2">
              <FGridItem size={[4, 4, 4]}>
                <FButton
                  title={"Stake"}
                  className={"w-100"}
                  onClick={() => onStakeClick()}
                ></FButton>
              </FGridItem>
              <FGridItem size={[4, 4, 4]}>
                <FButton
                  variant={"secondary"}
                  title={"Unstake"}
                  outlined
                  className={"w-100"}
                  onClick={() => onUnStakeClick()}
                ></FButton>
              </FGridItem>
              <FGridItem size={[4, 4, 4]}>
                <FButton
                  variant={"secondary"}
                  title={"Add Liquidity"}
                  outlined
                  className={"w-100"}
                  onClick={() => onAddLiquidityClick()}
                ></FButton>
              </FGridItem>
            </FGrid>
          </FContainer>
        </>
      )}
    </FContainer>
  );
};
