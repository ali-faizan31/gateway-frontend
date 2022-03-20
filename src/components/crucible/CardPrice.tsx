import React from "react";
import { FCard, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../assets/img/icon-ferrum.svg";
import { ReactComponent as IconArrowGreen } from "../../assets/img/icon-price-arrow-indicator-green.svg";
import { ReactComponent as IconArrowRed } from "../../assets/img/icon-price-arrow-indicator-red.svg";

export const CardPrice = () => {
  return (
    <FCard variant={"secondary"} className="card-price styled-card align-h">
      <FItem display={"flex"} alignX="between" alignY={"center"}>
        <FItem display={"flex"} alignY={"center"} className="w-100">
          <span className="icon-network f-pr--5">
            <IconFerrum />
          </span>
          <FTypo>FRM</FTypo>
        </FItem>
        <FTypo color="#28B885" size={14} align={"right"}>
          <IconArrowGreen width={15} /> 4.8%
        </FTypo>
      </FItem>
      <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"} className="f-mt-1">
        0.072
        <FTypo size={14} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
          USD
        </FTypo>
      </FTypo>
    </FCard>
  );
};
