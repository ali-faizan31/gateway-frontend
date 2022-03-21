export interface CRUCIBLE_STATE {
    isApproved: boolean;
    isApproving: boolean;
    stepFlowStepHistory: Array<any>;
}

export const defaultCrucibleState: CRUCIBLE_STATE = {
    isApproved: false,
    isApproving: false,
    stepFlowStepHistory: []
}