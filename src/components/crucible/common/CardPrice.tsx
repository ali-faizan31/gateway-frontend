import React from "react";
import { FCard, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../../assets/img/icon-ferrum.svg";
import { ReactComponent as IconArrowGreen } from "../../../assets/img/icon-price-arrow-indicator-green.svg";
import { ReactComponent as IconArrowRed } from "../../../assets/img/icon-price-arrow-indicator-red.svg";

const DATA_PRICE = [
  { network: "FRM", price_percentage: "4.8", price: 0.072 },
  { network: "FRM", price_percentage: "4.8", price: 0.072 },
  { network: "FRM", price_percentage: "4.8", price: 0.072 },
  { network: "FRM", price_percentage: "4.8", price: 0.072 },
];

export const CruciblePrice = () => {
  return (
    <FCard>
      <FTypo className="card-title f-pl-1">Price</FTypo>
      <div className={"card-price-wrapper"}>
        {DATA_PRICE.length
          ? DATA_PRICE.map((item, index) => {
              return (
                <FCard variant={"secondary"} className="card-price styled-card align-h">
                  <FItem display={"flex"} alignX="between" alignY={"center"}>
                    <FItem display={"flex"} alignY={"center"} className="w-100">
                      <span className="icon-network f-pr--5">
                        <IconFerrum />
                      </span>
                      <FTypo>{item.network}</FTypo>
                    </FItem>
                    <FTypo color="#28B885" size={14} align={"right"}>
                      <IconArrowGreen width={15} /> {item.price_percentage}%
                    </FTypo>
                  </FItem>
                  <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"} className="f-mt-1">
                    {item.price}
                    <FTypo size={14} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
                      USD
                    </FTypo>
                  </FTypo>
                </FCard>
              );
            })
          : null}
      </div>
    </FCard>
  );
};
