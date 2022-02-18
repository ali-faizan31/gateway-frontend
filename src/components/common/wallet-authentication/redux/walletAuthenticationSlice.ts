import { createSlice } from "@reduxjs/toolkit";
import { WALLET_AUTHENTICATION_STATE, defaultWalletAuthenticationState } from "../WalletAuthenticationInterfaces";

const initialWalletAUthenticationState: WALLET_AUTHENTICATION_STATE = {
    ...defaultWalletAuthenticationState,
};

export const walletConnectorSlice = createSlice({
    name: "walletAuthenticator",
    initialState: initialWalletAUthenticationState,
    reducers: { 
      saveSignature: (state, action) => { 
        state.signature = action.payload.walletAuthenticator.signature;
      },
      saveNonce: (state, action) => { 
        state.nonce = action.payload.walletAuthenticator.nonce;
      },
      saveApplicationUserToken: (state, action) => { 
        state.applicationUserToken = action.payload.walletAuthenticator.userToken;
      },
      isAllowedOnGateway: (state, action) => { 
        state.isAllowedonGateway = action.payload.walletAuthenticator.isAllowedOnGateway;
      },
      allowedNetworksonGateway: (state, action) => { 
        state.allowedNetworksonGateway = action.payload.walletAuthenticator.allowedNetworksonGateway;
      },
      error: (state, action) => { 
        state.error = action.payload.walletAuthenticator.error;
      },
      resetWalletAuthentication: (state, action) => {
        state.nonce = "";
        state.signature = "";
        state.applicationUserToken = action.payload.walletAuthenticator.userToken;
        state.isAllowedonGateway = undefined;
        state.allowedNetworksonGateway = [];
        state.error = false
      }
    }
})
  
