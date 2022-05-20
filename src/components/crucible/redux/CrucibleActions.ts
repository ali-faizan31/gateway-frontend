import { crucibleSlice } from "./CrucibleSlice";
const { actions } = crucibleSlice;

export const approved = () => (dispatch: any) => {
  dispatch(actions.approved());
};

export const approving = () => (dispatch: any) => {
  dispatch(actions.approving());
};

export const disApprove = () => (dispatch: any) => {
  dispatch(actions.disApprove());
};

export const updateStepFlowStepHistory = (crucible: any) => (dispatch: any) => {
  // console.log('dispatch', crucible)
  dispatch(actions.updateStepFlowStepHistory({ crucible }));
};

export const updateCurrentStep = (crucible: any) => (dispatch: any) => {
  // console.log('dispatch', crucible)
  dispatch(actions.updateCurrentStep({ crucible }));
};

export const resetCrucible = () => (dispatch: any) => {
  dispatch(actions.resetCrucible());
};

export const updateAPRData = (crucible: any) => (dispatch: any) => { 
  dispatch(actions.aprDataLoaded({ crucible }));
};

export const updateTokenData = (crucible: any) => (dispatch: any) => { 
  dispatch(actions.tokenDataLoaded({ crucible }));
};

export const transactionProcessed = () => (dispatch: any) => {
  dispatch(actions.transactionProcessed());
};

export const transactionProcessing = () => (dispatch: any) => {
  dispatch(actions.transactionProcessing());
};