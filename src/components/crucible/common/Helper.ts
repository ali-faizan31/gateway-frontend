import { PATH_DASHBOARD } from "../../../routes/paths";
import * as SFSH_API from "../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../redux/CrucibleActions";
import toast from "react-hot-toast";

export const getHumanReadableFarmName = (farm: any) => {
  switch (farm) {
    case "cFRM-BNB":
      return "cFRM / BNB";
    case "cFRMx-BNB":
      return "cFRMx / BNB";
    case "cFRM":
      return "cFRM";
    case "cFRMx":
      return "cFRMx";
  }
};

export const getObjectReadableFarmName = (farm: any) => {
  switch (farm) {
    case "cFRM-BNB":
      return "cFRM_BNB";
    case "cFRMx-BNB":
      return "cFRMx_BNB";
    case "cFRM":
      return "cFRM";
    case "cFRMx":
      return "cFRMx";
  }
};

export const isLPFarm = (farm: any) => {
  if (farm === "cFRM-BNB" || farm === "cFRMx-BNB"){
    return true;
  }
  return false;
}

export const isSingleTokenFarm = (farm: any) => {
  if (farm === "cFRM" || farm === "cFRMx"){
    return true;
  }
  return false;
}

export const getActualRoute = (farm: any, route: any) => { 
  return route.replace(":farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)", farm);
};

export const renderComponent = (
  stepFlowStepName: any,
  state: any,
  history: any,
  farm: any
) => {
  // console.log(state, stepFlowStepName, "render");
  console.log(stepFlowStepName, farm, state);
  switch (state.stepFlowName) {
    case `${getHumanReadableFarmName(
      farm
    )} Crucible Farm - Farming Dashboard Flow`:
      switch (stepFlowStepName) {
        case "Introduction":
          return history.push({
            pathname: getActualRoute(
              farm,
              `/dashboard/crucible/${farm}/${state.contract}/introduction`
            ),
            state: state,
          });
        case "Crucible Farming Dashboard":
          return history.push({
            pathname: getActualRoute(
              farm,
              `/dashboard/crucible/${farm}/${state.contract}/manage`
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
    case `${getHumanReadableFarmName(farm)} Crucible Farm - Mint Flow`:
      switch (stepFlowStepName) {
        case "Approve":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.mint
            ),
            state: state,
          });
        case "Mint":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.mint
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
    case `${getHumanReadableFarmName(farm)} Crucible Farm - Stake Flow`:
      switch (stepFlowStepName) {
        case "Approve":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.stake
            ),
            state: state,
          });
        case "Stake":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.stake
            ),
            state: state,
          });
        case "Success":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.success
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
    case `${getHumanReadableFarmName(farm)} Crucible Farm - Unstake Flow`:
      switch (stepFlowStepName) {
        case "Unstake":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.unstake
            ),
            state: state,
          });
        case "Success":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.success
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
    case `${getHumanReadableFarmName(farm)} Crucible Farm - Unwrap Flow`:
      switch (stepFlowStepName) {
        case "Unwrap":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.unwrap
            ),
            state: state,
          });
        case "Success":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.success
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
      case `${getHumanReadableFarmName(
        farm
      )} Crucible Farm - Staking Mint Flow`:
        switch (stepFlowStepName) {
          case "Introduction":
            return history.push({
              pathname: getActualRoute(
                farm,
                `/dashboard/crucible/${farm}/${state.contract}/staking-mint/introduction` 
              ),
              state: state,
            });
            case "Success":
            return history.push({
              pathname: getActualRoute(
                farm,
                `/dashboard/crucible/${farm}/${state.contract}/staking-mint/success` 
              ),
              state: state,
            });
          default:
            return history.push(PATH_DASHBOARD.crucible.index);
        }
    case `${getHumanReadableFarmName(farm)} Crucible Farm - Withdraw Flow`:
      switch (stepFlowStepName) {
        case "Withdraw":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.withdraw
            ),
            state: state,
          });
        case "Success":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.success
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
    case `${getHumanReadableFarmName(
      farm
    )} Crucible Farm - Add Liquidity - General Flow`:
      switch (stepFlowStepName) {
        case "Introduction":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.liquidity
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      } 
      case `${getHumanReadableFarmName(
        farm
      )} Crucible Farm - Add Liquidity - Unstake Flow`:
        switch (stepFlowStepName) {
          case "Introduction":
            return history.push({
              pathname: getActualRoute(
                farm,
                PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.addLiquidity
              ),
              state: state,
            });
          default:
            return history.push(PATH_DASHBOARD.crucible.index);
        }  
        case `${getHumanReadableFarmName(
          farm
        )} Crucible Farm - Remove Liquidity - Unstake Flow`:
          switch (stepFlowStepName) {
            case "Introduction":
              return history.push({
                pathname: getActualRoute(
                  farm,
                  PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.removeLiquidity
                ),
                state: state,
              });
            default:
              return history.push(PATH_DASHBOARD.crucible.index);
          }  
    case `${getHumanReadableFarmName(
      farm
    )} Crucible Farm - Add Liquidity - Withdraw Flow`:
      switch (stepFlowStepName) {
        case "Introduction":
          return history.push({
            pathname: getActualRoute(
              farm,
              PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.steps
            ),
            state: state,
          });
        default:
          return history.push(PATH_DASHBOARD.crucible.index);
      }
  }
};

const saveCurrentPreferncesInNewSequence = async (newSequence: any, oldHistory: any, token: any) => {
  for ( let i = 0; i < oldHistory.length; i++ ){
    if (oldHistory[i].status === "skip"){
      for ( let j = 0; j < newSequence.length; j++ ){
        if (newSequence[j].step._id === oldHistory[i].step._id){
          console.log('save prefence step', newSequence[j], oldHistory[i])
          await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
            newSequence[j]._id,
            { status: "skip" },
            token
          );
        }
      }
    }
  }
}

export const getLatestStepToRender = async (
  state: any,
  token: any,
  currentStep: any,
  currentStepIndex: any,
  stepFlowStepsHistory: any,
  dispatch: any,
  history: any,
  renderNeeded: any = true,
  farm: any,
  saveCurrentPrefernces: any = false
) => {
  try { 
    // let latestResponse =  
    await SFSH_API.startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId(
      state.id,
      token
    );
    let latestResponse = await SFSH_API.getLatestStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(
      state.id,
      token
    );
    latestResponse = latestResponse.data && latestResponse.data.body && latestResponse.data.body.stepFlowStepsHistory;
    if ( saveCurrentPrefernces ){
      console.log('save prefence flow')
      saveCurrentPreferncesInNewSequence(latestResponse, stepFlowStepsHistory, token)
    }
    // sequenceResponse = sequenceResponse.data && sequenceResponse.data.body && sequenceResponse.data.body.stepFlowStepsHistory;
    // let pendingStepInfo = getLatestStepWithPendingStatus(sequenceResponse);
    // dispatch(CrucibleActions.updateCurrentStep({ currentStep: pendingStepInfo?.pendingStep, currentStepIndex: pendingStepInfo?.index }));
    // dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: sequenceResponse }));
    // renderNeeded && renderComponent(pendingStepInfo?.pendingStep.step.name, state, history);
  } catch (e: any) {
    console.log("restart failed");
    console.log("state : ", state);
    console.log("token : ", token);
    console.log("currentStep : ", currentStep);
    console.log("currentStepIndex : ", currentStepIndex);
    console.log("stepFlowStepsHistory : ", stepFlowStepsHistory);
    console.log("renderNeeded : ", renderNeeded);
    console.log("farm : ", farm);
    let errorResponse = e && e.response && e.response.data.status;
    if (errorResponse?.code === 400) {
      try {
        let latestResponse =
        await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(
          state.id,
          token
        );
        // let latestResponse =
        //   await SFSH_API.getLatestStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(
        //     state.id,
        //     token
        //   );
        latestResponse =
          latestResponse.data &&
          latestResponse.data.body &&
          latestResponse.data.body.stepFlowStepsHistory;
          console.log('latest response:' ,latestResponse )
        let pendingStepInfo = getLatestStepWithPendingStatus(currentStepIndex, latestResponse);

        console.log(pendingStepInfo, "pendingstep");
        if (currentStepIndex + 1 === stepFlowStepsHistory.length) {
          //last step, move onto next step flow
          console.log("last step condition");
          dispatch(
            CrucibleActions.updateCurrentStep({
              currentStep: pendingStepInfo?.pendingStep,
              currentStepIndex: pendingStepInfo?.index,
            })
          );
          dispatch(
            CrucibleActions.updateStepFlowStepHistory({
              stepFlowStepHistory: latestResponse,
            })
          );
          renderNeeded &&
            renderComponent(
              pendingStepInfo?.pendingStep.step.name,
              state,
              history,
              farm
            );
        } 
        else if (
          pendingStepInfo?.pendingStep.step.name === currentStep?.step?.name
        ) {
          //same step rendered
          console.log("same step condition");
          dispatch(
            CrucibleActions.updateCurrentStep({
              currentStep: pendingStepInfo?.pendingStep,
              currentStepIndex: pendingStepInfo?.index,
            })
          );
        } 
        else {
          console.log("next step condition", pendingStepInfo);
          dispatch(
            CrucibleActions.updateStepFlowStepHistory({
              stepFlowStepHistory: latestResponse,
            })
          );
          dispatch(
            CrucibleActions.updateCurrentStep({
              currentStep: pendingStepInfo?.pendingStep,
              currentStepIndex: pendingStepInfo?.index,
            })
          );
          renderNeeded &&
            renderComponent(
              pendingStepInfo?.pendingStep.step.name,
              state,
              history,
              farm
            );
        }
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
      // let errorResponse =
      //   e &&
      //   e.response &&
      //   e.response.data.status &&
      //   e.response.data.status.message;
      // errorResponse
      // ? toast.error(`Error Occured: ${errorResponse}`)
      // : toast.error(`Error Occured: ${e}`);
    } else {
      let errorResponse =
        e &&
        e.response &&
        e.response.data.status &&
        e.response.data.status.message;
      errorResponse
        ? toast.error(`Error Occured: ${errorResponse}`)
        : toast.error(`Error Occured: ${e}`);
      history.push({ pathname: PATH_DASHBOARD.crucible.index });
    }
  }
};

export const getLatestStepWithPendingStatus = (currentStepIndex:any, stepResponse: any) => {
  let previous: any = {};
  let current: any = {};
  console.log('in pending step')
  for (let i = 0; i < stepResponse.length; i++) {
    if (i === 0) {
      previous = stepResponse[i];
      current = stepResponse[i];
      // if (previous.status === "completed" || previous.status === "started") {
      //   return { pendingStep: stepResponse[i + 1], index: i + 1 };
      // } else if (previous.status === "pending") {
      //   return { pendingStep: previous, index: i };
      // }
      if (previous.status === "pending") {
        console.log('returning pending:', previous)
        return { pendingStep: previous, index: i };
      }
    } else {
      previous = stepResponse[i - 1];
      current = stepResponse[i]; 
      if (
        (previous.status === "skip" || previous.status === "started" || previous.status === "completed") && 
        ( current.status === "pending")
      ) {
        console.log('returning pending:', current)
        return { pendingStep: current, index: i };
      }
    }
  }
};
 