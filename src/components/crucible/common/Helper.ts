import { PATH_DASHBOARD } from "../../../routes/paths";
import * as SFSH_API from "../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../redux/CrucibleActions";
import toast from "react-hot-toast";

export const renderComponent = (stepFlowStepName: any, state: any, history: any) => { 
  console.log(state, stepFlowStepName,'render')
  switch (state.stepFlowName) {
    case "cFRM / BNB Crucible Farm - Farming Dashboard Flow":
      switch (stepFlowStepName) {
        case "Introduction": return history.push({ pathname: `/dashboard/crucible/cFRM-BNB/${state.contract}/introduction`, state: state })
        case "Crucible Farming Dashboard": return history.push({ pathname: `/dashboard/crucible/cFRM-BNB/${state.contract}/manage`, state: state })
        default: return history.push(PATH_DASHBOARD.crucible.index);
      } 
      case "cFRM / BNB Crucible Farm - Mint Flow":
      switch (stepFlowStepName) {
        case "Approve": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.mint.mint, state: state })
        case "Mint": return history.push({ pathname:  PATH_DASHBOARD.crucible.cFRM_BNB.mint.mint, state: state })
        default: return history.push(PATH_DASHBOARD.crucible.index);
      } 
    case "cFRMx / BNB":
      switch (stepFlowStepName) {
        case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: state })
        case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: state })
      }
      break;
    case "cFRM":
      switch (stepFlowStepName) {
        case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: state })
        case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: state })
      }
      break;
    case "cFRMx":
      switch (stepFlowStepName) {
        case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: state })
        case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: state })
      }
      break;
    default: return history.push(PATH_DASHBOARD.crucible.index);
  }
}

export const getLatestStepToRender = async (state: any, token: any, currentStep: any, currentStepIndex:any, stepFlowStepsHistory: any, dispatch: any, history: any) => {
  try {
  let sequenceResponse = await SFSH_API.startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId(state.id, token);
  } catch (e: any) {
    let errorResponse = e && e.response && e.response.data.status; 
    if ( errorResponse.code === 400) {
      try { 
        let latestResponse = await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(state.id, token);
        latestResponse = latestResponse.data && latestResponse.data.body && latestResponse.data.body.stepFlowStepsHistory;
        let pendingStepInfo = getLatestStepWithPendingStatus(latestResponse);
        if ( currentStepIndex + 1 === stepFlowStepsHistory.length){ //last step, move onto next step flow
          dispatch(CrucibleActions.updateCurrentStep({ currentStep : pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
          dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: latestResponse }));
          renderComponent(pendingStepInfo?.pendingStep.step.name, state, history);
        } else if ( pendingStepInfo?.pendingStep.step.name === currentStep.step.name){ //same step rendered
          dispatch(CrucibleActions.updateCurrentStep({ currentStep : pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
        } else {
          dispatch(CrucibleActions.updateCurrentStep({ currentStep : pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
          renderComponent(pendingStepInfo?.pendingStep.step.name, state, history);
        } 
      } catch (e: any) {
        let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
        errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`); 
      }
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`); 
    } else {
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`); 
      history.push({pathname: PATH_DASHBOARD.crucible.index})
    }
  }
}

export const getLatestStepWithPendingStatus = (stepResponse: any) => {
  let previous: any = {};
  let current: any = {};
  for (let i = 0; i < stepResponse.length; i++) {
    if (i === 0) {
      previous = stepResponse[i];
      current = stepResponse[i];
      if (previous.status === "pending") {
        return { pendingStep: previous, index: i };
      }
    } else {
      previous = stepResponse[i - 1];
      current = stepResponse[i];

      if (previous.status !== "pending" && current.status === "pending") {
        return { pendingStep: current, index: i };
      }
    }
  }
};

export const getNextStepFlowStepId = (currentStepFlowName:any, stepFlowStepName: any) => {
  switch (currentStepFlowName) {
    case "cFRM / BNB Crucible Farm - Farming Dashboard Flow":
      switch (stepFlowStepName) {
        case "Mint": return {id:"6239951af0f70e3848644311", name:"cFRM / BNB Crucible Farm - Mint Flow" }
        case "Liquidity":   return "623b7111f0f70e38486448fd"
        default: return '';
      } 
    case "cFRMx / BNB Crucible Farm":
      switch (stepFlowStepName) {
        case "Introduction":  
        case "Crucible Farming Dashboard":  
        default: return "";
      } 
    }
  }