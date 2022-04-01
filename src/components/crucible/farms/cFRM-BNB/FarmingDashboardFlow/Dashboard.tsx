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
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { crucibleSlice } from "./../../../redux/CrucibleSlice";
import { BigUtils } from "./../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";
import ClipLoader from "react-spinners/ClipLoader";
import { STEP_FLOW_IDS } from "../../../common/utils";
import { getAPRValueAgainstFarm, getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import toast from "react-hot-toast";

export const Manage = () => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  // ("cFRM-BNB");
  const [dashboardAction, setDashboardAction] = useState(false);
  // const [unwrap, setUnwrap] = useState(false);
  // const [flowType, setFlowType] = useState("");
  const location: any = useLocation();
  const { active, library } = useWeb3React();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  let userStake = (userCrucibleData.stakes || []).find((e: any) => e.address.toLowerCase() === location.state.LPstakingAddress);
  const { stepFlowStepHistory, currentStep, currentStepIndex, aprInformation } = useSelector((state: RootState) => state.crucible);
  // const { approveTransactionId } = useSelector((state: RootState) => state.approval);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);

  useEffect(() => {
    // if (!isLoading) {
    // SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
    //   currentStep._id,
    //   { status: "completed" },
    //   tokenV2
    // );
    getStepCompletedAndRunCompletionFlow(false);
    // }
  }, []);

  const getStepCompletedAndRunCompletionFlow = async (renderNeeded: any) => {
    console.log("here");
    setIsLoading(true);
    try {
      let updatedCurrentStep = { ...currentStep, status: "completed" };
      let updHistory = stepFlowStepHistory.map((obj, index) => (index === currentStepIndex ? { ...obj, status: "completed" } : obj));
      let data = { status: "completed" };

      dispatch(
        CrucibleActions.updateCurrentStep({
          currentStep: updatedCurrentStep,
          currentStepIndex: currentStepIndex,
        })
      );
      dispatch(
        CrucibleActions.updateStepFlowStepHistory({
          stepFlowStepHistory: updHistory,
        })
      );

      // let updateResponse: any =
      await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      runCompletionFlow(stepFlowStepHistory);
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading, true, true);
    } catch (e: any) {
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`);
    }
  };

  const runCompletionFlow = async (stepFlowStepHistory: any) => {
    for (let i = 0; i < stepFlowStepHistory.length; i++) {
      if (stepFlowStepHistory[i].status === "started") {
        await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(stepFlowStepHistory[i]._id, { status: "completed" }, tokenV2);
      }
    }
  };

  const onUnStakeClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].unstake;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    setIsLoading(false);
  };

  const onStakeClick = async () => {
    setIsLoading(true);
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].stake;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    setIsLoading(false);
  };

  const onClaimRewardsClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].withdraw;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    setIsLoading(false);
  };

  const onAddLiquidityClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].generalAddLiquidity;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name; // getting no history againts this id
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    setIsLoading(false);
  };

  const loadCrucibleUserInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { crucibleCurrency: string }, ctx) => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);
    const res = await web3Helper.getTokenPriceFromRouter();
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
      console.log("first", location.state);
      const userStakingDetails = await client.getLPStakingInfo(ctx.dispatch, location.state.LpCurrency, walletAddress as string, payload.stakingAddress, payload.network);
      if (!!userStakingDetails) {
        dispatch(
          actions.userLpStakingDetailsLoaded({
            token: `${farm}`,
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
        token: "FRM",
        currency: "0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc", // done
      },
      {
        token: "FRMx",
        currency: "0x8523518001ad5d24b2a04e8729743c0643a316c0", // done
      },
      {
        token: "cFRM-BNB",
        currency: "0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
      },
      {
        token: "cFRMx-BNB",
        currency: "0x8523518001ad5d24b2A04e8729743C0643A316c0",
      },
      {
        token: "cFRM",
        currency: "0x1a59bf30d6dc8e8363c90a14c142dcb85825c5a7", // done  // change before prod
      },
      {
        token: "cFRMx",
        currency: "0x176e6504bfa5edf24d3a2665cc766f16959c2633",
      },
    ];

    for (let item of tokens) {
      const priceDetails = await web3Helper.getTokenPriceFromRouter(item.currency);
      console.log(priceDetails);
      // (await client.getPairPrice(
      //   ctx.dispatch,
      //   item.currency,
      //   item.currency,
      //   walletAddress as string
      // )) as any;
      if (!!priceDetails) {
        dispatch(
          actions.priceDataLoaded({
            data: {
              token: item.token,
              price: Number(priceDetails).toFixed(3),
            },
          })
        );
        console.log(priceDetails);
      }
    }
  });

  useEffect(() => {
    if (location.state === undefined) {
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
      setIsLoading(false);
    }
  };

  return (
    <FContainer className="card-manage">
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
          <CrucibleManage dashboardAction={dashboardAction} setDashboardAction={setDashboardAction} />
          <FContainer>
            <FCard className="card-crucible-token-info">
              <FTypo size={24}>Crucible Token Info</FTypo>
              <FGrid className="info-bar">
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                      {`${BigUtils.safeParse(crucible?.feeOnTransferRate || "0")
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
                    <FTypo className="f-pb--2">Your Crucible {farm?.includes("BNB") ? "LP" : ""} Farm Stake </FTypo>
                    <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"} color="#DAB46E">
                      {Number(userStake?.stakeOf || "0").toFixed(3)}
                      <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                        {farm?.includes("BNB") ? `APE-LP ${crucible?.symbol}-BNB` : crucible?.symbol}
                      </FTypo>
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[6, 6, 6]}>
                    <FItem align="right">
                      <FTypo color="#DAB46E" size={40} weight={600} align={"end"} display="flex" alignY={"end"}>
                        <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
                          APR
                        </FTypo>
                        {getAPRValueAgainstFarm(aprInformation, farm)}
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
                      {Number(userStake?.rewardOf || "0").toFixed(3)} {crucible?.symbol}
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[6]} alignY="center" alignX={"end"}>
                    <FButton title={"Claim"} onClick={onClaimRewardsClick}></FButton>
                  </FGridItem>
                </FGrid>
              </FCard>
            </FCard>
          </FContainer>
          <FContainer width={850}>
            <FGrid className="btn-wrap f-mt-2 f-mb-2 justify-content-center">
              <FGridItem size={[4, 4, 4]}>
                <FButton title={"Stake"} className={"w-100"} onClick={() => onStakeClick()}></FButton>
              </FGridItem>
              <FGridItem size={[4, 4, 4]}>
                <FButton variant={"secondary"} title={"Unstake"} outlined className={"w-100"} onClick={() => onUnStakeClick()}></FButton>
              </FGridItem>
              {(farm === "cFRM-BNB" || farm === "cFRMx-BNB") && (
                <FGridItem size={[4, 4, 4]}>
                  <FButton variant={"secondary"} title={"Add Liquidity"} outlined className={"w-100"} onClick={() => onAddLiquidityClick()}></FButton>
                </FGridItem>
              )}
            </FGrid>
          </FContainer>
        </>
      )}
    </FContainer>
  );
};
