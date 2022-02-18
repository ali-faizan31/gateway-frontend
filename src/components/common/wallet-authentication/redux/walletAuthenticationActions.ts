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