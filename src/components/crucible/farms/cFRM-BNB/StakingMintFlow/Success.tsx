import React, { useEffect } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconNetworkcFRM } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkcFRMx } from "../../../../../assets/img/icon-network-cfrmx.svg";
// import { ReactComponent as IconNetworkLeaderboard } from "../../../../../assets/img/icon-network-leaderboard.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";

import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import { getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import { STEP_FLOW_IDS } from "../../../common/utils";

export const Success = () => {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const { farm } = useParams<{ farm?: string }>();
  const history = useHistory();
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector(
    (state: RootState) => state.crucible
  );
  const { tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );

  useEffect(() => {
    getStepCompleted(false);
    // eslint-disable-next-line
  }, []);

  const getStepCompleted = async (renderNeeded: any) => {
    try {
      let updatedCurrentStep = { ...currentStep, status: "completed" };
      let updHistory = stepFlowStepHistory.map((obj, index) =>
        index === currentStepIndex ? { ...obj, status: "completed" } : obj
      );
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
      await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
        currentStep._id,
        data,
        tokenV2
      );
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(
        location.state,
        tokenV2,
        currentStep,
        currentStepIndex,
        stepFlowStepHistory,
        dispatch,
        history,
        renderNeeded,
        farm
      );
    } catch (e: any) {
      let errorResponse =
        e &&
        e.response &&
        e.response.data.status &&
        e.response.data.status.message;
      errorResponse
        ? toast.error(`Error Occured: ${errorResponse}`)
        : toast.error(`Error Occured: ${e}`);
    }
  };

  const onAddLiquidityClick = () => {
    let nextStepInfo: any  = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].generalAddLiquidity;
    // let nextStepInfo: any;
    // if (farm?.includes("cFRMx")){
    //   nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx-BNB")}`].stake;
    // } else if (farm === "cFRM" || farm === "cFRM-BNB"){
    //   nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM-BNB")}`].stake;
    // }
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history,
      true,
      farm
    );
  }

  return (
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
            Crucible Token Sustainable Farming
          </FTypo>
          <FTypo size={16} className="f-mt-1">
            Congratulations! You have successfully minted your cFRM tokens. You can use cFRM to earn rewards, generate rewards, take advantage of arbitrage opportunities between cFRM, FRM many more tokens. Check out the benefits highlighted below and choose your path.
          </FTypo>
        </FItem>
        <FTypo
          size={20}
          weight={500}
          className="f-mt-3 f-mb-3"
          align={"center"}
        >
          Whats next?
        </FTypo>
        <FGrid>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner" onClick={()=>onAddLiquidityClick()}>
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkcFRM />
                      <IconNetworkcFRMx />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Add Liquidity &
                    Compound Rewards
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                    Use cFRM and BNB to add Liquidity and compound rewards with Farming
                  </FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkcFRM />
                      <IconNetworkcFRMx />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Go to cFRM Leaderboard Competition
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                    Check out the cFRM Leaderboard and participate in the
                    competition to generate rewards
                  </FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkcFRM />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Mint cFRM
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                    You can always mint more cFRM to increase your pool share.
                  </FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkcFRM />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Trade cFRM
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                    You can always mint more cFRM to increase your pool share.
                  </FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <Link to="/dashboard/crucible" className="go-back">
            Go To Crucible Dashboard
          </Link>
        </FGrid>
      </FCard>
    </FContainer>
  );
};
