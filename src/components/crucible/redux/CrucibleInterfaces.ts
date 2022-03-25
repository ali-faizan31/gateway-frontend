export interface CRUCIBLE_STATE {
    isApproved: boolean;
    isApproving: boolean;
    stepFlowStepHistory: Array<any>;
    currentStep: any;
    selectedCrucible: any;
    userCrucibleDetails: any;
    tokenPrices: any;
}

export const defaultCrucibleState: CRUCIBLE_STATE = {
    isApproved: false,
    isApproving: false,
    stepFlowStepHistory: [],
    currentStep: {},
    selectedCrucible: {},
    userCrucibleDetails: {},
    tokenPrices: {}
}