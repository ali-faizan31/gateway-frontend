import React, { useState } from "react";
import "./switch.scss";

interface Props {
  isChecked: boolean;
  setIsChecked: any;
}
export const FToggle = ({ isChecked, setIsChecked }: Props) => {
  return (
    <div>
      <label className="switch">
        <input type="checkbox" onChange={() => { setIsChecked(!isChecked) }} {...isChecked} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};
