import { walletConnectorSlice } from "./walletAuthenticationSlice";
const { actions } = walletConnectorSlice;

export const saveSignature = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.saveSignature({ walletAuthenticator }));
};

export const saveNonce = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.saveNonce({ walletAuthenticator }));
};

export const saveApplicationUserToken = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.saveApplicationUserToken({ walletAuthenticator }));
};

export const isAllowedOnGateway = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.isAllowedOnGateway({ walletAuthenticator }));
};

export const allowedNetworksonGateway = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.allowedNetworksonGateway({ walletAuthenticator }));
};

export const error = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.error({ walletAuthenticator }));
};

export const resetWalletAuthentication = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.resetWalletAuthentication({ walletAuthenticator }));
};

export const getSignatureFromMetamask = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.getSignatureFromMetamask({ walletAuthenticator }));
};

export const saveME = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.saveME({ walletAuthenticator }));
};

export const saveCommunityMemberToken = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.saveCommunityMemberToken({ walletAuthenticator }));
};

export const saveCommunityMemberProfileToken = (walletAuthenticator: any) => (dispatch: any) => {
    console.log('dispatch', walletAuthenticator)
    dispatch(actions.saveCommunityMemberProfileToken({ walletAuthenticator }));
};