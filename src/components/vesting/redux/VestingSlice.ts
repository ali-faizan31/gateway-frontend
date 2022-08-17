import { createSlice } from "@reduxjs/toolkit";
import { VESTING_STATE, defaultVestingState } from "./VestingInterfaces";

const initialVestingState: VESTING_STATE = {
    ...defaultVestingState
}

export const vestingSlice = createSlice({
    name: "vesting",
    initialState: initialVestingState,
    reducers: {
        vestingClaimValue: (state, action) => {
            state.vestingClaim = action.payload
        },
        resetVesting: (state) => {
            state.vestingClaim = false;
        },
    }
})