import { boolean } from "yup/lib/locale";

export interface VESTING_STATE {
    vestingClaim: boolean;
}

export const defaultVestingState: VESTING_STATE = {
    vestingClaim: false,
}