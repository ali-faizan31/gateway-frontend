import React, { useState } from "react";
import "./switch.scss";

interface Props {
  isChecked: any;
  setIsChecked: any;
  isVesting?: boolean;
}
export const FToggle = ({ isChecked, setIsChecked, isVesting }: Props) => {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" onChange={() => { setIsChecked(!isChecked) }} {...isChecked} />
        <span className={`slider round ${isVesting && 'vesting-slider'}`}></span>
      </label>
    </div>
  );
};
