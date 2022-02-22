import { walletConnectorSlice } from "./walletAuthenticationSlice";
const { actions } = walletConnectorSlice;

export const saveSignature = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveSignature({ walletAuthenticator }));
};

export const saveNonce = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveNonce({ walletAuthenticator }));
};

export const saveApplicationUserToken = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveApplicationUserToken({ walletAuthenticator }));
};

export const isAllowedOnGateway = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.isAllowedOnGateway({ walletAuthenticator }));
};

export const allowedNetworksonGateway = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.allowedNetworksonGateway({ walletAuthenticator }));
};

export const error = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.error({ walletAuthenticator }));
};

export const resetWalletAuthentication = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.resetWalletAuthentication({ walletAuthenticator }));
};

export const getSignatureFromMetamask = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.getSignatureFromMetamask({ walletAuthenticator }));
};

export const saveME = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveME({ walletAuthenticator }));
};

export const saveCommunityMemberToken = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveCommunityMemberToken({ walletAuthenticator }));
};

export const saveCommunityMemberProfileToken = (walletAuthenticator: any) => (dispatch: any) => {
    dispatch(actions.saveCommunityMemberProfileToken({ walletAuthenticator }));
};