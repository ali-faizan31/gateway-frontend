import { createSlice } from '@reduxjs/toolkit';
import { getAllCompetitions } from '../../_apis/CompetitionCrud';
 

const initialState = {
  isLoading: false,
  error: false,
 competitionList: []
};

const slice = createSlice({
  name: 'competition',
  initialState,
  reducers: { 
    startLoading(state) {
      state.isLoading = true;
    },
 
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
 
    getCompetitionListSuccess(state, action) {
      state.isLoading = false;
      state.competitionList = action.payload;
    } 
  }
});
 
export default slice.reducer;


export const getAllCompetitionsDispatch = (token) => (dispatch) => { 
   dispatch(slice.actions.startLoading());
   getAllCompetitions(0,10,token).then((res) => { 
      if (res?.data?.body?.competitions?.length) {
        const { competitions } = res.data.body;
        dispatch(slice.actions.getCompetitionListSuccess(competitions)); 
      }
  })
  .catch((e) => {
    if(e.response){
     dispatch(slice.actions.hasError(e.response.data.status.message)); 
    } else {
      dispatch(slice.actions.hasError('Something went wrong. Try again later!')); 
    }
  });
}