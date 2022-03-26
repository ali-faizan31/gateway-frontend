import { PATH_DASHBOARD } from "../../../routes/paths";
import * as SFSH_API from "../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../redux/CrucibleActions";
import toast from "react-hot-toast";

export const renderComponent = (stepFlowStepName: any, state: any, history: any) => {
  console.log(state, stepFlowStepName, 'render')
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
        case "Mint": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.mint.mint, state: state })
        default: return history.push(PATH_DASHBOARD.crucible.index);
      }
    case "cFRM / BNB Crucible Farm - Stake Flow":
      switch (stepFlowStepName) {
        case "Approve": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.stake.stake, state: state })
        case "Stake": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.stake.stake, state: state })
        case "Success": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.stake.success, state: state })
        default: return history.push(PATH_DASHBOARD.crucible.index);
      }
    case "cFRM / BNB Crucible Farm - Unstake Flow":
      switch (stepFlowStepName) {
        case "Unstake": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.unstake.unstake, state: state })
        case "Success": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.unstake.success, state: state })
        default: return history.push(PATH_DASHBOARD.crucible.index);
      }
    case "cFRM / BNB Crucible Farm - Unwrap Flow":
      switch (stepFlowStepName) {
        case "Unwrap": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.unwrap.unwrap, state: state })
        case "Success": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.unwrap.success, state: state })
        default: return history.push(PATH_DASHBOARD.crucible.index);
      }
      case "cFRM / BNB Crucible Farm - Withdraw Flow":
        switch (stepFlowStepName) {
          case "Withdraw": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.withdraw.withdraw, state: state })
          case "Success": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.withdraw.success, state: state })
          default: return history.push(PATH_DASHBOARD.crucible.index);
        }
      case "cFRM / BNB Crucible Farm - Add Liquidity - General Flow": 
        switch (stepFlowStepName) {
          case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.liquidity, state: state })
          default: return history.push(PATH_DASHBOARD.crucible.index);
        }
        case "cFRM / BNB Crucible Farm - Remove Liquidity - Unstake Flow": 
        switch (stepFlowStepName) {
          case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.unstake.steps, state: state })
          default: return history.push(PATH_DASHBOARD.crucible.index);
        }
        case "cFRM / BNB Crucible Farm - Add Liquidity - Withdraw Flow": 
        switch (stepFlowStepName) {
          case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.withdraw.steps, state: state })
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

export const getLatestStepToRender = async (state: any, token: any, currentStep: any, currentStepIndex: any, stepFlowStepsHistory: any, dispatch: any, history: any, renderNeeded: any = true) => {
  try {
    let sequenceResponse = await SFSH_API.startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId(state.id, token);
    // sequenceResponse = sequenceResponse.data && sequenceResponse.data.body && sequenceResponse.data.body.stepFlowStepsHistory;
    // let pendingStepInfo = getLatestStepWithPendingStatus(sequenceResponse);
    // dispatch(CrucibleActions.updateCurrentStep({ currentStep: pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
    // dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: sequenceResponse }));
    // renderNeeded && renderComponent(pendingStepInfo?.pendingStep.step.name, state, history);
  } catch (e: any) {
    let errorResponse = e && e.response && e.response.data.status;
    if (errorResponse?.code === 400) {
      try {
        console.log(state, currentStep, currentStepIndex, "line 51")
        let latestResponse = await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(state.id, token);
        latestResponse = latestResponse.data && latestResponse.data.body && latestResponse.data.body.stepFlowStepsHistory;
        let pendingStepInfo = getLatestStepWithPendingStatus(latestResponse);
        console.log(pendingStepInfo, 'pendingstep')
        if (currentStepIndex + 1 === stepFlowStepsHistory.length) { //last step, move onto next step flow
          console.log('last step condition')
          dispatch(CrucibleActions.updateCurrentStep({ currentStep: pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
          dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: latestResponse }));
          renderNeeded && renderComponent(pendingStepInfo?.pendingStep.step.name, state, history);
        } else if (pendingStepInfo?.pendingStep.step.name === currentStep?.step?.name) { //same step rendered
          console.log('same step condition')
          dispatch(CrucibleActions.updateCurrentStep({ currentStep: pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
        } else {
          console.log('next step condition', pendingStepInfo)
          dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: latestResponse }));
          dispatch(CrucibleActions.updateCurrentStep({ currentStep: pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
          renderNeeded && renderComponent(pendingStepInfo?.pendingStep.step.name, state, history);
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
      history.push({ pathname: PATH_DASHBOARD.crucible.index })
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

export const getNextStepFlowStepId = (currentStepFlowName: any, stepFlowStepName: any) => {
  console.log(currentStepFlowName, stepFlowStepName)
  switch (currentStepFlowName) {
    case "cFRM / BNB Crucible Farm - Farming Dashboard Flow":
      switch (stepFlowStepName) {
        case "Mint": return { id: "6239951af0f70e3848644311", name: "cFRM / BNB Crucible Farm - Mint Flow" }
        case "Liquidity": return { id: "623b7111f0f70e38486448fd", name: "cFRM / BNB Crucible Farm - Add Liquidity" }
        default: return '';
      }
    case "cFRM / BNB Crucible Farm - Mint Flow":
      switch (stepFlowStepName) {
        case "Liquidity": return { id: "623b7111f0f70e38486448fd", name: "cFRM / BNB Crucible Farm - Add Liquidity" }
        default: return '';
      }
    case "cFRM / BNB Crucible Farm - Add Liquidity":
      switch (stepFlowStepName) {
        case "Stake": return { id: "6239953cf0f70e3848644314", name: "cFRM / BNB Crucible Farm - Stake Flow" }
        default: return '';
      }
    case "cFRMx / BNB Crucible Farm":
      switch (stepFlowStepName) {
        case "Introduction":
        case "Crucible Farming Dashboard":
        default: return "";
      }
    default: return "test"
  }
}