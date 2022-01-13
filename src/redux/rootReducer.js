import { combineReducers } from 'redux'; 
// slices
import competitionReducer from './slices/competition';
import leaderboardReducer from './slices/leaderboard';

// ----------------------------------------------------------------------

const rootReducer = combineReducers({ 
  competition: competitionReducer,
  leaderboard: leaderboardReducer 
});

export { rootReducer };
