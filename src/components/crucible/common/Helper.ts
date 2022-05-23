import { PATH_DASHBOARD } from "../../../routes/paths";
import * as SFSH_API from "../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../redux/CrucibleActions";
import toast from "react-hot-toast";
import { Web3Helper } from "../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "../../../container-components/web3Client/crucibleClient";
import { crucibleSlice } from "../redux/CrucibleSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { GetPhraseString } from "../../../utils/global.utils";

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

export const getFarmNameFromObject = (farm: any) => {
  switch (farm) {
    case "cFRM_BNB":
      return "cFRM-BNB";
    case "cFRMx_BNB":
      return "cFRMx-BNB";
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
  if (farm === "cFRM-BNB" || farm === "cFRMx-BNB") {
    return true;
  }
  return false;
}

export const isSingleTokenFarm = (farm: any) => {
  if (farm === "cFRM" || farm === "cFRMx") {
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
  // console.log(stepFlowStepName, farm, state);
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

const saveCurrentPreferncesInNewSequence = async (newSequence: any, oldHistory: any, id: any, token: any) => {
  console.log(newSequence, oldHistory)
  for (let i = 0; i < oldHistory.length; i++) {
    if (oldHistory[i].status === "skip") {
      for (let j = 0; j < newSequence.length; j++) {
        if (newSequence[j].step._id === oldHistory[i].step._id && newSequence[j].status !== "skip") {
          console.log(newSequence[j], 'to be skipped')
          console.log('updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId', 'helper')
          await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
            newSequence[j]._id,
            { status: "skip" },
            token
          );
          let latestResponse =
            await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(id, token); // get updated history
          newSequence = latestResponse.data &&
            latestResponse.data.body &&
            latestResponse.data.body.stepFlowStepsHistory;
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
  farm: any,
  setIsLoading: any,
  renderNeeded: any = true,
  saveCurrentPrefernces: any = false
) => {
  try {
    await SFSH_API.startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId(
      state.id,
      token
    );

    let latestResponse = await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(state.id, token);
    latestResponse = latestResponse.data && latestResponse.data.body && latestResponse.data.body.stepFlowStepsHistory;
    // console.log(latestResponse, saveCurrentPrefernces)
    if (saveCurrentPrefernces) {
      console.log('save prefence flow')
      saveCurrentPreferncesInNewSequence(latestResponse, stepFlowStepsHistory, state.id, token)
    }
    setIsLoading(false);
  } catch (e: any) {
    // console.log("restart failed");
    // console.log("state : ", state);
    // console.log("token : ", token);
    // console.log("currentStep : ", currentStep);
    // console.log("currentStepIndex : ", currentStepIndex);
    // console.log("stepFlowStepsHistory : ", stepFlowStepsHistory);
    // console.log("renderNeeded : ", renderNeeded);
    // console.log("farm : ", farm);
    let errorResponse = e && e.response && e.response.data.status;

    if (errorResponse?.code === 400) {
      try {
        let latestResponse =
          await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(
            state.id,
            token
          );
        latestResponse =
          latestResponse.data &&
          latestResponse.data.body &&
          latestResponse.data.body.stepFlowStepsHistory;
        // console.log('latest response:' ,latestResponse )
        let pendingStepInfo = getLatestStepWithPendingStatus(latestResponse);

        // console.log(pendingStepInfo, "pendingstep");
        if (currentStepIndex && currentStepIndex + 1 === stepFlowStepsHistory.length) {
          // last step, move onto next step flow
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
          setIsLoading(false);
          renderNeeded &&
            renderComponent(
              pendingStepInfo?.pendingStep.step.name,
              state,
              history,
              farm,
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
          dispatch(CrucibleActions.updateStepFlowStepHistory({
            stepFlowStepHistory: latestResponse,
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
          setIsLoading(false);
          renderNeeded &&
            renderComponent(
              pendingStepInfo?.pendingStep.step.name,
              state,
              history,
              farm
            );
        }
      } catch (e: any) {
        if (e.response) {
          if (e?.response?.data?.status?.phraseKey !== '') {
            const fetchedMessage = GetPhraseString(e?.response?.data?.status?.phraseKey);
            toast.error(fetchedMessage);
          } else {
            toast.error(e?.response?.data?.status?.message || `Error Occurred: ${e}`);
          }
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      }
    } else {
      if (e.response) {
        if (e?.response?.data?.status?.phraseKey !== '') {
          const fetchedMessage = GetPhraseString(e?.response?.data?.status?.phraseKey);
          toast.error(fetchedMessage);
        } else {
          toast.error(e?.response?.data?.status?.message || `Error Occurred: ${e}`);
        }
      } else {
        toast.error("Something went wrong. Try again later!");
      }
      history.push({ pathname: PATH_DASHBOARD.crucible.index });
    }
  }
};

export const getLatestStepWithPendingStatus = (stepResponse: any) => {
  let previous: any = {};
  let current: any = {};
  // console.log('in pending step')
  for (let i = 0; i < stepResponse.length; i++) {
    if (i === 0) {
      previous = stepResponse[i];
      current = stepResponse[i];
      if (previous.status === "pending") {
        // console.log('returning pending:', previous)
        return { pendingStep: previous, index: i };
      }
    } else {
      previous = stepResponse[i - 1];
      current = stepResponse[i];
      if (
        (previous.status === "skip" || previous.status === "started" || previous.status === "completed") &&
        (current.status === "pending")
      ) {
        return { pendingStep: current, index: i };
      }
    }
  }
};


export const getAPRValueAgainstFarm = (aprInformation: any, farm: any) => {
  if (farm === "cFRM-BNB") {
    return aprInformation.cfrmLp;
  } else if (farm === "cFRMx-BNB") {
    return aprInformation.cfrmXLp;
  } else if (farm === "cFRMx") {
    return aprInformation.cfrmX;
  } else if (farm === "cFRM") {
    return aprInformation.cfrm;
  }
}

export const getCrucibleDetail = async (farm: any, networkClient: any, walletAddress: any, dispatch: any, setIsLoading: any) => {
  const web3Helper = new Web3Helper(networkClient as any);
  const client = new CrucibleClient(web3Helper);
  const actions = crucibleSlice.actions;
  dispatch(
    loadCrucibleUserInfo({
      crucibleCurrency: `${farm.network.toUpperCase()}:${(farm.contract || "").toLowerCase()}`,
      farm,
      networkClient,
      walletAddress,
      dispatch
    })
  );
  const crucibleData = await client.getCrucibleDetails(dispatch, farm.network, farm.contract, walletAddress as string);
  const data = await web3Helper.getTokenData(walletAddress as string, farm.LpCurrency);
  dispatch(
    actions.selectedCrucible({
      token: `${farm.internalName}`,
      data: { ...crucibleData.data, LP_balance: data.balance, LP_symbol: data.symbol },
    })
  );

  if (farm?.internalName.includes("BNB")) {
    if (crucibleData.data) {
      dispatch(loadLPStakingInfo({
        farm, networkClient,
        walletAddress,
        dispatch
      }));
      setIsLoading(false);
    }
  }
  setIsLoading(false);
};

export const loadCrucibleUserInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { crucibleCurrency: string; farm: any, networkClient: any, walletAddress: any, dispatch: any }, ctx) => {
  const actions = crucibleSlice.actions;
  const web3Helper = new Web3Helper(payload.networkClient as any);
  const client = new CrucibleClient(web3Helper);
  const res = await web3Helper.getTokenPriceFromRouter();
  const userCrucibleDetails = await client.getUserCrucibleInfo(ctx.dispatch, payload.crucibleCurrency, payload.walletAddress as string);
  const stakingType = "LP";
  if (!!userCrucibleDetails) {
    if (stakingType === "LP") {
    }
    payload.dispatch(actions.userCrucibleDetailsLoaded({ token: `${payload.farm.internalName}`, data: userCrucibleDetails.data }));
  }
});

export const loadLPStakingInfo = createAsyncThunk("crucible/loadUserInfo", async (payload: { farm: any, networkClient: any, walletAddress: any, dispatch: any }, ctx) => {
  const actions = crucibleSlice.actions;
  const web3Helper = new Web3Helper(payload.networkClient as any);
  const client = new CrucibleClient(web3Helper);
  const userStakingDetails = await client.getLPStakingInfo(
    ctx.dispatch,
    `${(payload.farm.LpCurrency || "").toLowerCase()}`,
    payload.walletAddress as string,
    payload.farm.LPstakingAddress,
    payload.farm.network
  );
  if (!!userStakingDetails) {
    payload.dispatch(
      actions.userLpStakingDetailsLoaded({
        token: `${payload.farm.internalName}`,
        data: {
          ...userStakingDetails.data,
          stakingAddress: payload.farm.LPstakingAddress,
          LPaddress: payload.farm.LpCurrency,
        },
      })
    );
  }
});


export const updateSFSHForNewFarm = async (id: any, token: any, dispatch: any) => {
  let latestResponse =
    await SFSH_API.getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(id, token);
  latestResponse = latestResponse.data && latestResponse.data.body && latestResponse.data.body.stepFlowStepsHistory;
  let pendingStepInfo = getLatestStepWithPendingStatus(latestResponse);
  console.log(latestResponse, pendingStepInfo, 'update func')
  await dispatch(
    CrucibleActions.updateCurrentStep({
      currentStep: pendingStepInfo?.pendingStep,
      currentStepIndex: pendingStepInfo?.index,
    })
  );
  await dispatch(
    CrucibleActions.updateStepFlowStepHistory({
      stepFlowStepHistory: latestResponse,
    })
  );
}