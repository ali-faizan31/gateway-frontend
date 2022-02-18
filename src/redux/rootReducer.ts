import { combineReducers } from 'redux';  
import persistReducer from "redux-persist/es/persistReducer";
import storageSession from "redux-persist/lib/storage/session";
import localStorage from "redux-persist/es/storage";
import {
  MetaMaskConnector,
  WalletApplicationWrapper 
} from "../container-components";
import { walletConnectorSlice } from "../components/common/wallet-authentication/redux/walletAuthenticationSlice";
// slices
import competitionReducer from './slices/competition';
import leaderboardReducer from './slices/leaderboard';

const walletConnectorPersistConfig = {
  key: "walletConnector",
  storage: storageSession,
  blacklist: ["error", "isConnecting",   "networkClient", "isWeb3Initialized"],
};

const walletApplicationWrapperPersistConfig = {
  key: "walletApplicationWrapper",
  storage: localStorage,
  whitelist: ["tokenList" ],
  timeout: 172800,
};

const walletAutheticatorPersistConfig = {
  key: "walletAutheticator",
  storage: localStorage,
  whitelist: [ "me", "communityMemberToken"] 
};

const rootReducer = combineReducers({
  walletConnector: persistReducer(
    walletConnectorPersistConfig,
    MetaMaskConnector.walletConnectorSlice.reducer
  ),
  walletApplicationWrapper: persistReducer(
    walletApplicationWrapperPersistConfig,
    WalletApplicationWrapper.applicationWrapperSlice.reducer
  ),
  walletAuthenticator: persistReducer(
    walletAutheticatorPersistConfig,
     walletConnectorSlice.reducer
  ),
  competition: competitionReducer,
  leaderboard: leaderboardReducer 
});
  
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
