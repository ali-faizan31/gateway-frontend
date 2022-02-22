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
      getSignatureFromMetamask: (state, action) => { 
        state.getSignatureFromMetamask = action.payload.walletAuthenticator.getSignatureFromMetamask;
      },
      error: (state, action) => { 
        state.error = action.payload.walletAuthenticator.error;
      },
      saveME: (state, action) => { 
        state.me = action.payload.walletAuthenticator.me;
      },
      saveCommunityMemberToken: (state, action) => { 
        state.communityMemberToken = action.payload.walletAuthenticator.communityMemberToken;
      },
      saveCommunityMemberProfileToken: (state, action) => { 
        state.profileToken = action.payload.walletAuthenticator.profileToken;
      },
      resetWalletAuthentication: (state, action) => {
        state.nonce = "";
        state.signature = "";
        state.applicationUserToken = action.payload.walletAuthenticator.userToken;
        state.isAllowedonGateway = undefined;
        state.allowedNetworksonGateway = [];
        state.error = false;
        state.communityMemberToken = "";
        state.me = {};
        state.getSignatureFromMetamask = false;
        state.profileToken = "";
        
      }
    }
})
  
