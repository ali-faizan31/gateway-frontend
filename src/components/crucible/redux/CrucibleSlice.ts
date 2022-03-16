import { createSlice } from "@reduxjs/toolkit";
import { CRUCIBLE_STATE, defaultCrucibleState } from "../CrucibleInterfaces";

const initialCrucibleState: CRUCIBLE_STATE = {
    ...defaultCrucibleState
}

export const crucibleSlice = createSlice({
    name: "crucible",
    initialState: initialCrucibleState,
    reducers: {
        approved: (state ) => {
            state.isApproved = true;
            state.isApproving = false;
        },
        approving: (state ) => {
            state.isApproved = false;
            state.isApproving = true;
        },
        disApprove: (state ) => {
            state.isApproved = false;
            state.isApproving = false;
        },
    }
})