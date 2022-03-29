import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";
import { ReactComponent as IconNetworkcFRM } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkcFRMx } from "../../../../../assets/img/icon-network-cfrmx.svg"; 
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { RootState } from "../../../../../redux/rootReducer";
import { getLatestStepToRender } from "../../../common/Helper";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";

export const Success = () => {
  const dispatch = useDispatch();
  const { farm } = useParams<{ farm?: string }>();
  const location: any = useLocation();
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

  return (
    <FContainer className="f-mr-0" width={800}>
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-congrats">
        <FItem align="center">
        <FItem display={"flex"} alignX="center" className={"f-mb-1"}>
          <IconCongrats width={150}/>
          </FItem>
          <FTypo color="#DAB46E" size={30} weight={600}>
            Congratulations!
          </FTypo>
          <FTypo size={20} weight={500} className="f-mt-1">
            Crucible Token Sustainable {farm?.includes("BNB") ? "Liquidity" : ""} Farming
          </FTypo>
          <FTypo size={16} className="f-mt-1">
            Congrats! You have successfully unwraped your  {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens. You can
            now use the unwraped {farm?.includes("cFRMx") ? "FRMx" : "FRM"} tokens to Mint and Stake {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, buy  {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, or
            simply hold.
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
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                    {farm?.includes("cFRMx") ? <IconNetworkcFRM /> :<IconNetworkcFRMx />  }
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                  {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"} / BNB Mint and Stake
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                  Now you can proceed to Mint and Stake {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"} LP tokens
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
                    Mint {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"}
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                    You can always mint more {farm?.includes("cFRMx") ? "cFRM" : "cFRMx"} to increase your pool share.
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
                    Trade {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>
                    You can always mint more {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} to increase your pool share.
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
