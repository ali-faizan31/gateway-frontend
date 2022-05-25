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
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BigUtils } from "./../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import ClipLoader from "react-spinners/ClipLoader";
import { STEP_FLOW_IDS } from "../../../common/utils";
import { getAPRValueAgainstFarm, getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import toast from "react-hot-toast";
import { getErrorMessage, TruncateWithoutRounding } from "../../../../../utils/global.utils";

export const Manage = () => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dashboardAction, setDashboardAction] = useState(false);
  const { networkClient } = useSelector((state: RootState) => state.walletConnector);
  const { stepFlowStepHistory, currentStep, currentStepIndex, aprInformation } = useSelector((state: RootState) => state.crucible);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);

  const LPStakingDetails = useSelector((state: RootState) => state.crucible.userLpStakingDetails);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  let userStake = userCrucibleData[farm!] && (userCrucibleData[farm!].stakes || []).find((e: any) => e.address.toLowerCase() === location.state.LPstakingAddress.toLowerCase());
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  useEffect(() => {
    if (currentStep && currentStep._id && currentStep.status === "pending") {
      getStepCompletedAndRunCompletionFlow(false);
    }
  }, []);

  useEffect(() => {
    if (location.state === undefined) {
      history.push(PATH_DASHBOARD.crucible.index);
    }
  }, [location]);

  const getStepCompletedAndRunCompletionFlow = async (renderNeeded: any) => {
    // setIsLoading(true);
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
      // console.log('updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId', 'dashboard.tsx 75')
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      runCompletionFlow(stepFlowStepHistory);
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading, renderNeeded, true);
    } catch (e: any) {
      setIsLoading(false);
      getErrorMessage(e, activeTranslation)
    }
  };

  const runCompletionFlow = async (stepFlowStepHistory: any) => {
    for (let i = 0; i < stepFlowStepHistory.length; i++) {
      if (stepFlowStepHistory[i].status === "started") {
        // console.log('updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId', 'dashboard 88')
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

  const getRewardAmount = () => {
    if (farm?.includes("BNB")) {
      return TruncateWithoutRounding(networkClient?.utils.fromWei(String(LPStakingDetails[farm!]?.rewards[0]?.rewardAmount || 0), "ether"), 3);
    } else {
      let userStake = ((userCrucibleData[farm!] && userCrucibleData[farm!].stakes) || []).find((e: any) => e.address.toLowerCase() === location.state.LPstakingAddress.toLowerCase());
      return TruncateWithoutRounding(userStake?.rewardOf || 0, 3);
    }
  };

  const getRewardSymbol = () => {
    return crucible[farm!]?.symbol;
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
                      {`${BigUtils.safeParse(crucible[farm!]?.feeOnTransferRate || "0")
                        .times(100)
                        .toString()}%`}
                    </FTypo>
                    <FTypo size={20}>Transfer Fee</FTypo>
                  </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                      {`${BigUtils.safeParse(crucible[farm!]?.feeOnWithdrawRate || "0")
                        .times(100)
                        .toString()}%`}
                    </FTypo>
                    <FTypo size={20}>Unwrap Fee</FTypo>
                  </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                      {crucible[farm!]?.symbol}
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
                      {farm?.includes("BNB") ? TruncateWithoutRounding(Number(LPStakingDetails[farm!]?.stake || "0"), 3) : TruncateWithoutRounding(Number(userStake?.stakeOf || "0"), 3)}

                      <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                        {farm?.includes("BNB") ? `CAKE-LP ${crucible[farm!]?.symbol}-BNB` : crucible[farm!]?.symbol}
                      </FTypo>
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[6, 6, 6]}>
                    <FItem align="right">
                      <FTypo color="#DAB46E" size={40} weight={600} align={"end"} display="flex" alignY={"end"}>
                        <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
                          APR
                        </FTypo>
                        {Object.keys(aprInformation).length && getAPRValueAgainstFarm(aprInformation, farm)}
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
                      {getRewardAmount()} {getRewardSymbol()}
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
