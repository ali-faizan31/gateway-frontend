import { createSlice } from "@reduxjs/toolkit";
import { getPhraseData } from "../../_apis/PhraseCrud";

const initialState = {
  isLoading: false,
  error: false,
  translations: [],
  activeTranslation: {},
};

const slice = createSlice({
  name: "phrase",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },

    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    translationsRecived(state, action) {
      state.isLoading = false;
      state.translations = action.payload;
      if(state.activeTranslation.langageCode == undefined){
        let index = action.payload.findIndex(item => item.langageCode == "en");      
        state.activeTranslation = index ? action.payload[index] : action.payload[0]
      }
    },

    activateTranslation(state, action) {
      state.activeTranslation = action.payload
    },
  },
});

export default slice.reducer;

export const getPhraseDataDispatch = () => (dispatch) => {
  dispatch(slice.actions.startLoading());
  getPhraseData()
    .then((res) => {
      let translations = [];
      const langages = [...new Set(res.data.map((row) => row.locale.code))];
      langages.forEach((langage) => {
        let values = [];
        res.data.forEach((row) => {
          if (row.locale.code == langage) {
            values[`${row.key.name}`] = row.content;
          }
        });
        translations.push({ langageCode: langage, values });
      });
      dispatch(slice.actions.translationsRecived(translations));
    })
    .catch((e) => {
      if (e.response) {
        dispatch(slice.actions.hasError(e.response.data.status.message));
      } else {
        dispatch(
          slice.actions.hasError("Something went wrong. Try again later!")
        );
      }
    });
};

export const setActiveTranslation = (translations, language, activeLanguage) => (dispatch) => { 
  let index = translations.findIndex(item => item.langageCode == language);
  if ( index > -1){
    if(activeLanguage != language ) { 
      dispatch(slice.actions.activateTranslation(translations[index]));       
    }
  } else {
    if(activeLanguage == undefined){
      let index = translations.findIndex(item => item.langageCode == "en");      
      const activeTranslation = index ? translations[index] : translations[0]
      dispatch(slice.actions.activateTranslation(activeTranslation));     
    }
  }
};



