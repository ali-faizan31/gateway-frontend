import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";

export const T = (key: any) => {
  // const { values }: any = useSelector((state: RootState) => state.phrase.activeTranslation);
  let values: any = {};
  let translation = key;
  if (values) {
    translation = values[`${key}`];
  }
  return translation ? translation : key;
};

// import React from 'react'
// import { useSelector } from 'react-redux'
// import { RootState } from '../redux/rootReducer';

// export const T = (key: any) => {
//   const { values }: any = useSelector((state: RootState) => state.phrase.activeTranslation);
//   console.log(values, )
//   return <div>{values}</div>
// }