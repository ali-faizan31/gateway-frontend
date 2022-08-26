import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory, useLocation, useParams } from "react-router";
import { FButton, FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";
import { ReactComponent as IconNetworkLeaderboard } from "../../../../../assets/img/icon-network-leaderboard.svg";
import IconNetworkCFrmStr from "../../../../../assets/img/icon-network-cfrm.svg";
import IconNetworkCFrmxStr from "../../../../../assets/img/icon-network-cfrmx.svg";
import IconNetworkBNB from "../../../../../assets/img/icon-network-bnb.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { getLatestStepToRender, getObjectReadableFarmName, updateSFSHForNewFarm } from "../../../common/Helper";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import { Crucible_Farm_Address_Details, STEP_FLOW_IDS } from "../../../common/utils";
import { ClipLoader } from "react-spinners";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { getErrorMessage } from "../../../../../utils/global.utils";

export const Success = () => {
  const dispatch = useDispatch();
  const { farm } = useParams<{ farm?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const location: any = useLocation();
  const history = useHistory();
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { tokenV2, currentNetworkInformation } = useSelector((state: RootState) => state.walletAuthenticator);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  useEffect(() => {
    if (location.state === undefined) {
      history.push({ pathname: PATH_DASHBOARD.crucible.index });
    }
  }, []);

  useEffect(() => {
    if (currentStep && currentStep._id && currentStep.status === "pending" && currentStep.step.name === "Success") {
      getStepCompleted(false);
    }
  }, [currentStep]);

  const getStepCompleted = async (renderNeeded: any) => {
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
      // console.log('updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId', 'unstake success 65')
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading, renderNeeded);
    } catch (e: any) {
      getErrorMessage(e, activeTranslation)
    }
  };

  const onLiquityClick = async () => {
    setIsLoading(true);
    let nextStepInfo: any;
    // if (farm === "cFRM" || farm === "cFRMx") {
    //   nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].unstakeAddLiquidity;
    // } else if (farm === "cFRMx-BNB" || farm === "cFRM-BNB") {
    //   nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].unstakeRemoveLiquidity;
    // } 
    let newFarm: any;
    if (farm?.includes("cFRMx")) {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM")}`].mint;
      newFarm = "cFRM";
    } else {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx")}`].mint;
      newFarm = "cFRMx";
    }
    // await updateSFSHForNewFarm(nextStepInfo.id, tokenV2, dispatch);
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    location.state = { ...location.state, ...Crucible_Farm_Address_Details[newFarm] };
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, newFarm, setIsLoading);
  };

  const onMintOrUnwrapClick = () => {
    let nextStepInfo: any;
    setIsLoading(true);
    if (farm === "cFRM" || farm === "cFRMx") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].unwrap;
    } else if (farm === "cFRMx-BNB" || farm === "cFRM-BNB") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].mint;
    }
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    location.state = { ...location.state, ...Crucible_Farm_Address_Details[farm!] };
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
  };

  const onTradeClick = () => {
    let dexUrl = currentNetworkInformation?.networkCurrencyAddressByNetwork?.networkDex?.dex?.url;
    const tradeURL = `${dexUrl}swap?inputCurrency=BNB&outputCurrency=${crucible[farm!].contractAddress}&exactField=output&exactAmount=`;
    window.open(tradeURL, "_blank");
  };

  const onLeaderboardClick = () => {
    let leaderboardUrl = `${window.location.origin}/pub/multi/leaderboard/61b6d48337f5125acbbfddeb`;
    window.open(leaderboardUrl, "_self");
  };

  return (
    <>
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </FCard>
      ) : (
        <div>
          <div className="congrats-card-1">
            <FTypo color="#DAB46E" size={30} weight={700}>
              Congratulations!
            </FTypo>
            <FTypo size={20} weight={700} className="f-mt-1">
              Crucible Token Sustainable {farm?.includes("BNB") ? "Liquidity" : ""} Farming
            </FTypo>
            <FTypo size={16} weight={600} color="#FCFCFC" className="f-mt-1">
              Congrats! You have successfully unstaked {farm?.includes("BNB") ? "CAKE-LP" : ""} {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} {farm?.includes("BNB") ? "-BNB" : ""}{" "}
              tokens. You will now earn rewards for every cFRM transaction that generates a fee. The reward distribution is proportional to your share of the pool.
            </FTypo>
          </div>
          <div className="d-flex justify_start align_center f-mt-2">
            <div className="congrats-subcards w-100 custom-mr-24">
              <div className="d-flex justify_start align_center">
                <span className="icon-wrap custom-mr-16">
                  {farm?.includes("cFRMx") ? (
                    <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
                  ) : (
                    <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
                  )}
                </span>
                <FTypo size={18} weight={700} align={"left"}>
                  Mint {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"}
                </FTypo>
              </div>
              <FTypo size={14} weight={600} className={'f-mt-1'}>
                You can always mint more {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"} to increase your pool share.
              </FTypo>
            </div>
            <div className="congrats-subcards w-100">
              <div className="d-flex justify_start align_center">
                <span className="icon-wrap custom-mr-16">
                  <IconNetworkLeaderboard />
                </span>
                <FTypo size={18} weight={700} align={"left"}>
                  Go to cFRM Leaderboard Competition
                </FTypo>
              </div>
              <FTypo size={14} weight={600} className={'f-mt-1'}>
                Check out the cFRM Leaderboard and participate in the competition to generate rewards
              </FTypo>
            </div>
          </div>
          <div className="d-flex justify_start align_center f-mt-2">
            <div className="congrats-subcards w-100 custom-mr-24">
              <div className="d-flex justify_start align_center">
                <span className="icon-wrap custom-mr-16">
                  {farm?.includes("cFRMx") ? (
                    <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
                  ) : (
                    <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
                  )}
                </span>
                <FTypo size={18} weight={700} align={"left"}>
                  {farm?.includes("BNB") ? "Mint" : "Unwrap"} {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
                </FTypo>
              </div>
              <FTypo size={14} weight={600} className={'f-mt-1'}>
                {farm?.includes("BNB")
                  ? `You can remove liquidity at the DEX and access ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} - BNB tokens.`
                  : `You can unwrap or trade ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} back to the base token.`}
              </FTypo>
            </div>
            <div className="congrats-subcards w-100">
              <div className="d-flex justify_start align_center">
                <span className="icon-wrap custom-mr-16">
                  {farm?.includes("cFRMx") ? (
                    <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
                  ) : (
                    <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
                  )}
                </span>
                <FTypo size={18} weight={700} align={"left"}>
                  Trade {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
                </FTypo>
              </div>
              <FTypo size={14} weight={600} className={'f-mt-1'}>
                Trade {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
              </FTypo>
            </div>
          </div>
          <div className="d-flex justify_end align_end f-mt-2" style={{ width: '50%', float: 'right' }}>
            <Link to="/dashboard/crucible" className="go-back text-decoration-none">
              <FButton
                variant="primary"
                className={"w-100 custom-font-size-16 font-600 clr_new_black"}
                title={"GO TO CRUCIBLE DASHBOARD"}
              ></FButton>
            </Link>
          </div>
        </div>
        // <FContainer width={700}>
        //   <CrucibleMyBalance />
        //   <FCard variant={"secondary"} className="card-congrats">
        //     <FItem align="center">
        //       <FItem display={"flex"} alignX="center" className={"f-mb-1"}>
        //         <IconCongrats width={150} />
        //       </FItem>
        //       <FTypo color="#DAB46E" size={30} weight={600}>
        //         Congratulations!
        //       </FTypo>
        //       <FTypo size={20} weight={500} className="f-mt-1">
        //         Crucible Token Sustainable {farm?.includes("BNB") ? "Liquidity" : ""} Farming
        //       </FTypo>
        //       <FTypo size={16} className="f-mt-1">
        //         Congrats! You have successfully unstaked {farm?.includes("BNB") ? "CAKE-LP" : ""} {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} {farm?.includes("BNB") ? "-BNB" : ""}{" "}
        //         tokens. You will now earn rewards for every cFRM transaction that generates a fee. The reward distribution is proportional to your share of the pool.
        //       </FTypo>
        //     </FItem>
        //     <FTypo size={20} weight={500} className="f-mt-3 f-mb-3" align={"center"}>
        //       Whats next?
        //     </FTypo>
        //     <FGrid>
        //       <FGridItem size={[6, 6, 6]}>
        //         <FItem bgColor="#1C2229" className={"card-whats-next"}>
        //           <div className="card-whats-next-inner" onClick={() => onLiquityClick()}>
        //             <div className="card-whats-next-front">
        //               <div className="network-icon-wrapper text-center f-mb-1">
        //                 <span className="icon-wrap">
        //                   {farm?.includes("cFRMx") ? (
        //                     <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
        //                   ) : (
        //                     <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
        //                   )}
        //                   {/* {farm?.includes("BNB") ? "" : <img src={IconNetworkBNB} height="40px" width="40px" alt="" />} */}
        //                 </span>
        //               </div>
        //               <FTypo size={20} weight={400} align={"center"}>
        //                 {/* {farm?.includes("BNB") ? "Remove Liquidity and Unwrap" : "Add Liquidity & Compound Rewards"} */}
        //                 Mint {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"}
        //               </FTypo>
        //             </div>
        //             <div className="card-whats-next-back">
        //               <FTypo>
        //                 {/* Use cFRM and BNB to add Liquidity and compound rewards with Farming. */}
        //                 You can always mint more {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"} to increase your pool share.
        //               </FTypo>
        //             </div>
        //           </div>
        //         </FItem>
        //       </FGridItem>
        //       <FGridItem size={[6, 6, 6]}>
        //         <FItem bgColor="#1C2229" className={"card-whats-next"}>
        //           <div className="card-whats-next-inner" onClick={() => onLeaderboardClick()}>
        //             <div className="card-whats-next-front">
        //               <div className="network-icon-wrapper text-center f-mb-1">
        //                 <span className="icon-wrap">
        //                   <IconNetworkLeaderboard />
        //                 </span>
        //               </div>
        //               <FTypo size={20} weight={400} align={"center"}>
        //                 Go to cFRM Leaderboard Competition
        //               </FTypo>
        //             </div>
        //             <div className="card-whats-next-back">
        //               <FTypo>Check out the cFRM Leaderboard and participate in the competition to generate rewards</FTypo>
        //             </div>
        //           </div>
        //         </FItem>
        //       </FGridItem>
        //       <FGridItem size={[6, 6, 6]}>
        //         <FItem bgColor="#1C2229" className={"card-whats-next"}>
        //           <div className="card-whats-next-inner" onClick={() => onMintOrUnwrapClick()}>
        //             <div className="card-whats-next-front">
        //               <div className="network-icon-wrapper text-center f-mb-1">
        //                 <span className="icon-wrap">
        //                   {farm?.includes("cFRMx") ? (
        //                     <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
        //                   ) : (
        //                     <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
        //                   )}
        //                 </span>
        //               </div>
        //               <FTypo size={20} weight={400} align={"center"}>
        //                 {farm?.includes("BNB") ? "Mint" : "Unwrap"} {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
        //               </FTypo>
        //             </div>
        //             <div className="card-whats-next-back">
        //               <FTypo>
        //                 {farm?.includes("BNB")
        //                   ? `You can remove liquidity at the DEX and access ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} - BNB tokens.`
        //                   : `You can unwrap or trade ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} back to the base token.`}
        //               </FTypo>
        //             </div>
        //           </div>
        //         </FItem>
        //       </FGridItem>
        //       <FGridItem size={[6, 6, 6]}>
        //         <FItem bgColor="#1C2229" className={"card-whats-next"}>
        //           <div className="card-whats-next-inner" onClick={() => onTradeClick()}>
        //             <div className="card-whats-next-front">
        //               <div className="network-icon-wrapper text-center f-mb-1">
        //                 <span className="icon-wrap">
        //                   {farm?.includes("cFRMx") ? (
        //                     <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
        //                   ) : (
        //                     <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
        //                   )}
        //                 </span>
        //               </div>
        //               <FTypo size={20} weight={400} align={"center"}>
        //                 Trade {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
        //               </FTypo>
        //             </div>
        //             <div className="card-whats-next-back">
        //               Trade {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
        //             </div>
        //           </div>
        //         </FItem>
        //       </FGridItem>
        //       <Link to="/dashboard/crucible" className="go-back">
        //         Go To Crucible Dashboard
        //       </Link>
        //     </FGrid>
        //   </FCard>
        // </FContainer>
      )}
    </>
  );
};
