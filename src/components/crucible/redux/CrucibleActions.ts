import { crucibleSlice } from "./CrucibleSlice";
const { actions } = crucibleSlice;

export const approved = () => (dispatch: any) => {
    dispatch(actions.approved());
}

export const approving = () => (dispatch: any) => {
    dispatch(actions.approving());
}

export const disApprove = () => (dispatch: any) => {
    dispatch(actions.disApprove());
}