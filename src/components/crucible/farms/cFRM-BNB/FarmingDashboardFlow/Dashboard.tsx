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
import IconActiveRight from "../../../../../assets/img/right-icon-light-grey.svg";
import IconActiveLeft from "../../../../../assets/img/left-icon-light-grey.svg";
import { CrucibleManage } from "../common/CardManage";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { BigUtils } from "./../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import ClipLoader from "react-spinners/ClipLoader";
import { STEP_FLOW_IDS } from "../../../common/utils";
import { getAPRValueAgainstFarm, getHumanReadableFarmName, getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import { getErrorMessage, TruncateWithoutRounding } from "../../../../../utils/global.utils";
import IconNetworkCFrmStr from "../../../../../assets/img/icon-network-cfrm.svg";
import IconNetworkCFrmxStr from "../../../../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkBnb } from "../../../../../assets/img/icon-network-bnb.svg";

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
  const [activeAPRIndex, setActiveAPRIndex] = useState(0);
  const aprData = Object.keys(aprInformation).length && getAPRValueAgainstFarm(aprInformation, farm);

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
            <div className="crucible-farm-dashboard-card-2">
              <div className={'f-mt-1 f-mb-1'}>
                <div className="flex-center-aligned-center">
                  <span className="icon-wrap custom-mr-12" style={{ marginLeft: 24 }}>
                    <img src={farm?.includes("cFRMx") ? IconNetworkCFrmxStr : IconNetworkCFrmStr} alt="network-cfrm" />
                    {farm?.includes("BNB") && <IconNetworkBnb />}
                  </span>
                  <p className="custom-font-size-20 font-700 custom-mr-24">{getHumanReadableFarmName(farm)}</p>
                  <FTypo size={16} weight={700}>Crucible Token</FTypo>
                </div>
                <div className={'justify-content-space-between align_center unwrap-farm-card'}>
                  <div className="flex-center-aligned-center w-100">
                    <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Buy Fee</p>
                    <p className={'custom-font-size-18 font-600 clr_white'}>4%</p>
                  </div>
                  <div className="flex-center-aligned-center w-100">
                    <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Sell Fee</p>
                    <p className={'custom-font-size-18 font-600 clr_white'}>4%</p>
                  </div>
                  <div className="flex-center-aligned-center w-100">
                    <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Unwrap Fee</p>
                    <p className={'custom-font-size-18 font-600 clr_white'}>
                      {`${BigUtils.safeParse(crucible[farm!]?.feeOnWithdrawRate || "0")
                        .times(100)
                        .toString()}%`}
                    </p>
                  </div>
                  <div className="flex-center-aligned-center w-100">
                    <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Stake/Unstake Fee</p>
                    <p className={'custom-font-size-18 font-600 clr_white'}>
                      {`${BigUtils.safeParse(crucible[farm!]?.feeOnTransferRate || "0")
                        .times(100)
                        .toString()}%`}
                    </p>
                  </div>
                </div>
                <div className="justify-content-space-between align_center">
                  <div>
                    <FTypo size={12} weight={500} color="#6F767E">
                      Your Crucible {farm?.includes("BNB") ? "LP" : ""} Farm Stake
                    </FTypo>
                    <div className="justify_start d-flex align_end f-mt-1">
                      <p className={'custom-font-size-20 font-600 clr_white custom-mr-10'}>
                        {farm?.includes("BNB") ? TruncateWithoutRounding((LPStakingDetails[farm!]?.stake || "0"), 3) : TruncateWithoutRounding((userStake?.stakeOf || "0"), 3)}
                      </p>
                      <p className={'custom-font-size-12 font-700 clr_white'}>
                        {farm?.includes("BNB") ? `CAKE-LP ${crucible[farm!]?.symbol}-BNB` : crucible[farm!]?.symbol}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="justify_start d-flex align_center">
                      <img
                        src={IconActiveLeft}
                        onClick={() => { activeAPRIndex !== 0 && setActiveAPRIndex(activeAPRIndex - 1) }}
                        alt="" />
                      <FTypo size={12} weight={500} color="#6F767E">
                        {aprData[activeAPRIndex].label}
                      </FTypo>
                      <img
                        src={IconActiveRight}
                        onClick={() => { activeAPRIndex < aprData.length - 1 && setActiveAPRIndex(activeAPRIndex + 1) }}
                        alt="" />
                    </div>
                    <FTypo size={20} weight={700} color="#FFFFFF" className={'f-mt-1 f-pl--9'}>
                      {aprData[activeAPRIndex].value}
                    </FTypo>
                  </div>
                  <div>
                    <FTypo size={12} weight={500} color="#6F767E">
                      Your unclaimed Rewards
                    </FTypo>
                    <FTypo size={20} weight={600} color="#dab46e" className={'f-mt-1'}>
                      {getRewardAmount()} {getRewardSymbol()}
                    </FTypo>
                  </div>
                  <FButton title={"CLAIM"} style={{ width: 144, height: 44 }} className={'clr_new_black custom-font-size-16 font-700'} onClick={onClaimRewardsClick}></FButton>

                </div>
                {/* <FGrid className="info-bar">
                  <FGridItem size={[4, 4, 4]}>
                    <FItem align={"center"}>
                      <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                        {`${BigUtils.safeParse(crucible[farm!]?.feeOnTransferRate || "0")
                          .times(100)
                          .toString()}%`}
                      </FTypo>
                      <FTypo size={20}>Stake/Unstake Fee</FTypo>
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
                </FGrid> */}
                {/* <FCard className={"styled-card align-v your-crucible"}>
                  <FGrid>
                    <FGridItem size={[6, 6, 6]} dir="column">
                      <FTypo className="f-pb--2">Your Crucible {farm?.includes("BNB") ? "LP" : ""} Farm Stake </FTypo>
                      <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"} color="#DAB46E">
                        {farm?.includes("BNB") ? TruncateWithoutRounding((LPStakingDetails[farm!]?.stake || "0"), 3) : TruncateWithoutRounding((userStake?.stakeOf || "0"), 3)}

                        <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                          {farm?.includes("BNB") ? `CAKE-LP ${crucible[farm!]?.symbol}-BNB` : crucible[farm!]?.symbol}
                        </FTypo>
                      </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]}>
                      <FItem align="right" className="justify-content-end">
                        <div className="flex-center-aligned-center">
                          <img
                            className="cursor-pointer"
                            src={activeAPRIndex === 0 ? IconInactiveLeft : IconActiveLeft}
                            onClick={() => { activeAPRIndex !== 0 && setActiveAPRIndex(activeAPRIndex - 1) }}
                            style={{ height: 9, width: 10, marginRight: 22 }}
                            alt=""
                          />
                          <div className="custom-width-117">
                            <p className="medium-text-400 text-center">{aprData[activeAPRIndex].label}</p>
                            <p className="text-35 text-center default-text-color">{aprData[activeAPRIndex].value}</p>
                          </div>
                          <img
                            className="cursor-pointer"
                            src={activeAPRIndex < aprData.length - 1 ? IconActiveRight : IconInactiveRight}
                            onClick={() => { activeAPRIndex < aprData.length - 1 && setActiveAPRIndex(activeAPRIndex + 1) }}
                            style={{ height: 9, width: 10, marginLeft: 22 }}
                            alt="" />
                        </div>
                      </FItem>
                    </FGridItem>
                  </FGrid>
                </FCard> */}
                {/* <FCard className={"your-claimed-rewards"}>
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
                </FCard> */}

              </div>
            </div>
          </FContainer>
          <FContainer>
            <div className="btn-wrap f-mt-2 f-mb-2 justify-content-end align_center">
              <FButton variant={"secondary"} title={"UNSTAKE"}
                outlined
                className={'custom-mr-16 custom-font-size-16 font-700'}
                style={{ width: 124, borderColor: '#D9B373', borderRadius: 8 }}
                onClick={() => onUnStakeClick()}></FButton>
              <FButton title={"STAKE"} className={"clr_new_black custom-font-size-16 font-700"} style={{ width: 266 }} onClick={() => onStakeClick()}></FButton>

              {(farm === "cFRM-BNB" || farm === "cFRMx-BNB") && (
                <FButton variant={"secondary"} title={"ADD LIQUIDITY"} outlined style={{ width: 266 }} onClick={() => onAddLiquidityClick()}></FButton>

              )}
            </div>
          </FContainer>
        </>
      )}
    </FContainer>
  );
};
