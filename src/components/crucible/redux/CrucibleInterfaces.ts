export interface CRUCIBLE_STATE {
    isApproved: boolean;
    isApproving: boolean;
    stepFlowStepHistory: Array<any>;
    currentStep: any;
    currentStepIndex: any;
    selectedCrucible: any;
    userCrucibleDetails: any;
    tokenPrices: any;
    userLpStakingDetails: any
}

export const defaultCrucibleState: CRUCIBLE_STATE = {
    isApproved: false,
    isApproving: false,
    stepFlowStepHistory: [],
    currentStep: {},
    currentStepIndex: null,
    selectedCrucible: {},
    userCrucibleDetails: {},
    tokenPrices: {},
    userLpStakingDetails: {}
}