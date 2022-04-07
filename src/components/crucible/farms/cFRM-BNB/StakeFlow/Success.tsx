import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import IconNetworkCFrmStr from "../../../../../assets/img/icon-network-cfrm.svg";
import IconNetworkCFrmxStr from "../../../../../assets/img/icon-network-cfrmx.svg";
import IconNetworkBNB from "../../../../../assets/img/icon-network-bnb.svg";
import { ReactComponent as IconNetworkLeaderboard } from "../../../../../assets/img/icon-network-leaderboard.svg";
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";

import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import { getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import { STEP_FLOW_IDS } from "../../../common/utils";
import { ClipLoader } from "react-spinners";
import { T } from '../../../../../utils/translationHelper';

export const Success = () => {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { farm } = useParams<{ farm?: string }>();
  const history = useHistory();
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { tokenV2, currentNetworkInformation } = useSelector((state: RootState) => state.walletAuthenticator);

  useEffect(() => {
    getStepCompleted(false);
    // eslint-disable-next-line
  }, []);

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
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading, renderNeeded);
    } catch (e: any) {
      if (e.response) {
        if (e?.response?.data?.status?.phraseKey !== '') {
          const fetchedMessage = T(e?.response?.data?.status?.phraseKey);
          toast.error(fetchedMessage);
        } else {
          toast.error(e?.response?.data?.status?.message || `Error Occurred: ${e}`);
        }
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    }
  };

  const getFistCardData = (direction: any) => {
    if (direction === "front") {
      if (farm?.includes("cFRMx")) {
        return "cFRM / BNB Mint & Stake";
      } else {
        return "cFRMx / BNB Mint & Stake";
      }
    } else if (direction === "back") {
      if (farm?.includes("cFRMx")) {
        return "Now you can proceed to Mint and Stake cFRM LP tokens";
      } else {
        return "Now you can proceed to Mint and Stake cFRMx LP tokens";
      }
    }
  };

  const getFirstCardClickFunction = () => {
    setIsLoading(true);
    let nextStepInfo: any;
    let newFarm: any;
    if (farm?.includes("BNB")) {
      if (farm?.includes("cFRMx")) {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM-BNB")}`].dashboard;
        newFarm = "cFRM-BNB";
      } else {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx-BNB")}`].dashboard;
        newFarm = "cFRMx-BNB";
      }
    } else {
      if (farm === "cFRMx") {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx-BNB")}`].dashboard;
        newFarm = "cFRMx-BNB";
      } else if (farm === "cFRM") {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM-BNB")}`].dashboard;
        newFarm = "cFRM-BNB";
      }
    }

    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, newFarm, setIsLoading);
  };

  const onMintClick = () => {
    setIsLoading(true);
    let nextStepInfo: any;
    let newFarm: any;
    if (farm?.includes("BNB")) {
      if (farm?.includes("cFRMx")) {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM-BNB")}`].dashboard;
        newFarm = "cFRM-BNB";
      } else {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx-BNB")}`].dashboard;
        newFarm = "cFRMx-BNB";
      }
    } else {
      if (farm === "cFRMx") {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM")}`].dashboard;
        newFarm = "cFRM";
      } else if (farm === "cFRM") {
        nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx")}`].dashboard;
        newFarm = "cFRMx";
      }
    }

    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, newFarm, setIsLoading);
  };

  const onTradeClick = () => {
    let dexUrl = currentNetworkInformation?.networkCurrencyAddressByNetwork?.networkDex?.dex?.url;
    const tradeURL = `${dexUrl}swap?inputCurrency=BNB&outputCurrency=${crucible.contractAddress}&exactField=output&exactAmount=`;
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
        <FContainer className="f-mr-0">
          <CrucibleMyBalance />
          <FCard variant={"secondary"} className="card-congrats">
            <FItem align="center">
              <FItem display={"flex"} alignX="center" className={"f-mb-1"}>
                <IconCongrats width={150} />
              </FItem>
              <FTypo color="#DAB46E" size={30} weight={600}>
                Congratulations!
              </FTypo>
              <FTypo size={20} weight={500} className="f-mt-1">
                Crucible Token Sustainable {farm?.includes("BNB") ? "Liquidity" : ""} Farming
              </FTypo>
              <FTypo size={16} className="f-mt-1">
                Congrats! You have successfully staked your {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} {farm?.includes("BNB") ? "/ BNB LP" : ""} tokens. You will now earn rewards
                for every cFRM transaction that generates a fee.{" "}
                {farm?.includes("BNB") ? "" : "To amplify your rewards by ~4x, consider Adding Liquidity for cFRM / BNB and staking the LP tokens."} The reward distribution is
                proportional to your share of the pool.
              </FTypo>
            </FItem>
            <FTypo size={20} weight={500} className="f-mt-3 f-mb-3" align={"center"}>
              Whats next?
            </FTypo>
            <FGrid>
              <FGridItem size={[6, 6, 6]}>
                <FItem bgColor="#1C2229" className={"card-whats-next"}>
                  <div className="card-whats-next-inner" onClick={() => getFirstCardClickFunction()}>
                    <div className="card-whats-next-front">
                      <div className="network-icon-wrapper text-center f-mb-1">
                        <span className="icon-wrap">
                          <img src={IconNetworkBNB} height="40px" width="40px" alt="" />
                          {farm?.includes("cFRMx") ? (
                            <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
                          ) : (
                            <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
                          )}
                        </span>
                      </div>
                      <FTypo size={20} weight={400} align={"center"}>
                        {farm?.includes("BNB") ? getFistCardData("front") : `Try ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} / BNB Sustainable Farming`}
                      </FTypo>
                    </div>
                    <div className="card-whats-next-back">
                      <FTypo>
                        {farm?.includes("BNB")
                          ? getFistCardData("back")
                          : `Use ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} and BNB to add Liquidity and compound rewards with Farming`}
                      </FTypo>
                    </div>
                  </div>
                </FItem>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem bgColor="#1C2229" className={"card-whats-next"}>
                  <div className="card-whats-next-inner" onClick={() => onLeaderboardClick()}>
                    <div className="card-whats-next-front">
                      <div className="network-icon-wrapper text-center f-mb-1">
                        <span className="icon-wrap">
                          <IconNetworkLeaderboard />
                        </span>
                      </div>
                      <FTypo size={20} weight={400} align={"center"}>
                        Go to cFRM Leaderboard Competition
                      </FTypo>
                    </div>
                    <div className="card-whats-next-back">
                      <FTypo>Check out the cFRM Leaderboard and participate in the competition to generate rewards</FTypo>
                    </div>
                  </div>
                </FItem>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem bgColor="#1C2229" className={"card-whats-next"}>
                  <div className="card-whats-next-inner" onClick={() => onMintClick()}>
                    <div className="card-whats-next-front">
                      <div className="network-icon-wrapper text-center f-mb-1">
                        <span className="icon-wrap">
                          {farm?.includes("cFRMx") ? (
                            <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
                          ) : (
                            <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
                          )}
                        </span>
                      </div>
                      <FTypo size={20} weight={400} align={"center"}>
                        Mint {farm?.includes("BNB") ? "" : "and Stake"} {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"}
                      </FTypo>
                    </div>
                    <div className="card-whats-next-back">
                      <FTypo>You can always mint more {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"} to increase your pool share.</FTypo>
                    </div>
                  </div>
                </FItem>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem bgColor="#1C2229" className={"card-whats-next"}>
                  <div className="card-whats-next-inner" onClick={() => onTradeClick()}>
                    <div className="card-whats-next-front">
                      <div className="network-icon-wrapper text-center f-mb-1">
                        <span className="icon-wrap">
                          {farm?.includes("cFRMx") ? (
                            <img src={IconNetworkCFrmxStr} height="40px" width="40px" alt="" />
                          ) : (
                            <img src={IconNetworkCFrmStr} height="40px" width="40px" alt="" />
                          )}
                        </span>
                      </div>
                      <FTypo size={20} weight={400} align={"center"}>
                        Trade {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
                      </FTypo>
                    </div>
                    {/* <div className="card-whats-next-back">
                  <FTypo>
                    You can always mint more cFRM to increase your pool share.
                  </FTypo>
                </div> */}
                  </div>
                </FItem>
              </FGridItem>
              <Link to="/dashboard/crucible" className="go-back">
                Go To Crucible Dashboard
              </Link>
            </FGrid>
          </FCard>
        </FContainer>
      )}
    </>
  );
};
