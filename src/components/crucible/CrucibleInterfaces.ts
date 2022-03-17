export interface CRUCIBLE_STATE {
    isApproved: boolean;
    isApproving: boolean;
}

export const defaultCrucibleState: CRUCIBLE_STATE = {
    isApproved: false,
    isApproving: false,
}