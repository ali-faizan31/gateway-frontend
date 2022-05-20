import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  error: false,
  leaderboardList: [],
  frmUsdcValue: "",
  frmxUsdcValue: "",
};

const slice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getLeaderboardListSuccess(state, action) {
      state.isLoading = false;
      state.leaderboardList = action.payload;
    },

    getFRMTokenValueSuccess(state, action) {
      state.isLoading = false;
      state.frmUsdcValue = action.payload;
    },

    getFRMXTokenValueSuccess(state, action) {
      state.isLoading = false;
      state.frmxUsdcValue = action.payload;
    },
  },
});

export default slice.reducer;

// export const getAllLeaderboardsDispatch = (token) => (dispatch) => {
//   dispatch(slice.actions.startLoading());
//   getAllLeaderboards(0, 10, token)
//     .then((res) => {
//       if (res?.data?.body?.leaderboards?.length) {
//         const { leaderboards } = res.data.body;
//         dispatch(slice.actions.getLeaderboardListSuccess(leaderboards));
//       }
//     })
//     .catch((e) => {
//       if (e.response) {
//         if (e?.response?.data?.status?.phraseKey !== '') {
//           const fetchedMessage = T(e?.response?.data?.status?.phraseKey);
//           dispatch(slice.actions.hasError(fetchedMessage));
//         } else {
//           dispatch(slice.actions.hasError(e?.response?.data?.status?.message));
//         }
//       } else {
//         dispatch(slice.actions.hasError('Something went wrong. Try again later!'));
//       }
//     });
// };

// export const getUSDCTokenPrice = (chainId, fromToken, toToken, isFrm) => (dispatch) => {
//   getTokenPriceFrom1Inch(chainId, fromToken, toToken)
//     .then((res) => {
//       if (res?.data) {
//         const { toTokenAmount } = res.data;
//         const convertedAmount = eitherConverter(toTokenAmount, 'wei').ether;
//         if (isFrm) {
//           dispatch(slice.actions.getFRMTokenValueSuccess(convertedAmount));
//         } else {
//           dispatch(slice.actions.getFRMXTokenValueSuccess(convertedAmount));
//         }
//       }
//     })
//     .catch((e) => {
//       if (e.response) {
//         dispatch(slice.actions.hasError(e?.response?.data?.status?.message));
//       } else {
//         dispatch(slice.actions.hasError('Something went wrong. Try again later!'));
//       }
//     });
// };
