import { vestingSlice } from "./VestingSlice";
const { actions } = vestingSlice;

export const vestingClaimValue = (vestingClaim: boolean) => (dispatch: any) => {
  dispatch(actions.vestingClaimValue(vestingClaim));
};