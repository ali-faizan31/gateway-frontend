import { createSlice } from "@reduxjs/toolkit";
import { CRUCIBLE_STATE, defaultCrucibleState } from "./CrucibleInterfaces";

const initialCrucibleState: CRUCIBLE_STATE = {
    ...defaultCrucibleState
}

export const crucibleSlice = createSlice({
    name: "crucible",
    initialState: initialCrucibleState,
    reducers: {
        userCrucibleDetailsLoaded: (state, action) => {
            state.userCrucibleDetails[action.payload.token] = action.payload.data
        },
        priceDataLoaded: (state, action) => {
            state.tokenPrices[action.payload.data.token] = action.payload.data.price
        },
        tokenDataLoaded: (state, action) => { 
            state.tokenData[action.payload.crucible.token] = action.payload.crucible
        },
        aprDataLoaded: (state, action) => {  
            state.aprInformation = action.payload.crucible
        },
        selectedCrucible: (state, action) => {
            state.selectedCrucible[action.payload.token] = action.payload.data
        },
        userLpStakingDetailsLoaded: (state, action) => {
            state.userLpStakingDetails[action.payload.token] = action.payload.data
        },
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
        transactionProcessed: (state ) => {
            state.isProcessed = true;
            state.isProcessing = false;
        },
        transactionProcessing: (state ) => {
            state.isProcessed = false;
            state.isProcessing = true;
        },
        updateStepFlowStepHistory: (state, action) => {
            state.stepFlowStepHistory = action.payload.crucible.stepFlowStepHistory;
        },
        updateCurrentStep: (state, action) => {
            state.currentStep = action.payload.crucible.currentStep;
            state.currentStepIndex = action.payload.crucible.currentStepIndex;
        },
        resetCrucible: (state) => {
            state.isProcessed = false;
            state.isProcessing = false;
            state.currentStep = {};
            state.stepFlowStepHistory = [];
            state.currentStepIndex = null;
            state.selectedCrucible = {};
            state.userCrucibleDetails = {};
            state.userLpStakingDetails = {};
        },
    }
})