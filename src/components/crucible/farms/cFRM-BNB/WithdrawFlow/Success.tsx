import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system"; 
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";
import { ReactComponent as IconNetworkcFRM } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkcFRMx } from "../../../../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkLeaderboard } from "../../../../../assets/img/icon-network-leaderboard.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg"; 
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { getLatestStepToRender } from "../../../common/Helper"; import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import { useHistory, useLocation } from "react-router"
import { CFRM_BNB_STEP_FLOW_IDS } from "../../../common/utils";

export const Success = () => {
  const dispatch = useDispatch()
  const location: any = useLocation(); 
  const history = useHistory();
  const { stepFlowStepHistory, currentStep, currentStepIndex, } = useSelector((state: RootState) => state.crucible);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);

  useEffect(() => {
    getStepCompleted(false);
  }, [])

  const getStepCompleted = async (renderNeeded: any) => { 
    try {
      let updatedCurrentStep = { ...currentStep, status: "completed" };
      let updHistory = stepFlowStepHistory.map((obj, index) => index === currentStepIndex ? { ...obj, status: "completed" } : obj);
      let data = { status: "completed" };

      dispatch(CrucibleActions.updateCurrentStep({ currentStep: updatedCurrentStep, currentStepIndex: currentStepIndex }));
      dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: updHistory }));

    let updateResponse: any = await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, renderNeeded);
    } catch (e: any) {
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`);
    }
  }


  const onAddLiquityClick = () => { 
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.withdrawAddLiquidity;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name; 
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history);
  }

  return (
    <FContainer className="f-mr-0" width={800}>
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-congrats">
        <FItem align="center">
          <IconCongrats />
          <FTypo color="#DAB46E" size={30} weight={600}>
            Congratulations!  
          </FTypo>
          <FTypo size={20} weight={500} className="f-mt-1">
            Crucible Token Sustainable Liquidity Farming
          </FTypo>
          <FTypo size={16} className="f-mt-1">
          Congrats! You have successfully withdrawn your cFRM reward tokens. You can now use the tokens to generate even more rewards by compounding or trading them. </FTypo>        </FItem>
        <FTypo size={20} weight={500} className="f-mt-3 f-mb-3" align={"center"}>
          Whats next?
        </FTypo>
        <FGrid>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={" item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1" onClick={()=>onAddLiquityClick()}>
                <span className="icon-wrap">
                  <IconNetworkcFRM />
                  <IconNetworkBsc />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
              Add Liquidity & Compound Rewards
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={" item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkLeaderboard /> 
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
              Go to cFRMLeaderboard Competition
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkcFRM />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Mint cFRM
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkcFRM />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Trade cFRM
              </FTypo>
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
 