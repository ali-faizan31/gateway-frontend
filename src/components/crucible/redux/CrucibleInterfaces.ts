export interface CRUCIBLE_STATE {
    isApproved: boolean;
    isApproving: boolean;
    isProcessed: boolean;
    isProcessing: boolean;
    stepFlowStepHistory: Array<any>;
    currentStep: any;
    currentStepIndex: any;
    selectedCrucible: any;
    userCrucibleDetails: any;
    tokenPrices: any;
    tokenExchange: any;
    userLpStakingDetails: any;
    tokenData: any;
    aprInformation: any;
    tokenSupplyData: any;
}

export const defaultCrucibleState: CRUCIBLE_STATE = {
    isApproved: false,
    isApproving: false,
    isProcessed: false,
    isProcessing: false,
    stepFlowStepHistory: [],
    currentStep: {},
    currentStepIndex: null,
    selectedCrucible: {},
    userCrucibleDetails: {},
    tokenPrices: {},
    tokenExchange: {},
    userLpStakingDetails: {},
    tokenData: {},
    aprInformation: {},
    tokenSupplyData: {}
}