import React, { useState } from "react";
import IconActiveRight from "../../../assets/img/active-right-yellow.svg";
import IconActiveLeft from "../../../assets/img/active-left-yellow.svg";
import IconInactiveLeft from "../../../assets/img/inactive-left-yellow.svg";
import IconInactiveRight from "../../../assets/img/inactive-right-yellow.svg";

interface Props {
  apr: any;
}
export const MultipleAPR = ({ apr }: Props) => {
  const [activeAPRIndex, setActiveAPRIndex] = useState(0);

  return (
    <div className="apr-small-card">
      <img
        src={activeAPRIndex === 0 ? IconInactiveLeft : IconActiveLeft}
        onClick={() => { activeAPRIndex !== 0 && setActiveAPRIndex(activeAPRIndex - 1) }} />
      <div>
        <p className="subtitle-text text-center">{apr[activeAPRIndex]?.label}</p>
        <p className="medium-text-700 text-center default-text-color">{apr[activeAPRIndex]?.value}</p>
      </div>
      <img
        src={activeAPRIndex < apr.length - 1 ? IconActiveRight : IconInactiveRight}
        onClick={() => { activeAPRIndex < apr.length - 1 && setActiveAPRIndex(activeAPRIndex + 1) }} />
    </div>
  );
};
