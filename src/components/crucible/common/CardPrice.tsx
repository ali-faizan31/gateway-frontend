import React from "react";
import {
  FCard,
  //  FGrid,
  //  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../../assets/img/icon-ferrum.svg";
import { ReactComponent as IconArrowGreen } from "../../../assets/img/icon-price-arrow-indicator-green.svg";
// import { ReactComponent as IconArrowRed } from "../../../assets/img/icon-price-arrow-indicator-red.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";

export const CruciblePrice = () => {
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const { tokenData } = useSelector((state: RootState) => state.crucible); 

  console.log(tokenData, tokenPrices)

  const DATA_PRICE = [
    { name: "FRMBSC", network: "FRM", price_percentage: "4.8", price: tokenPrices["FRM"] || 0 },
    { name: "cBT", network: "cFRM", price_percentage: "4.8", price: tokenPrices["cFRM"] || 0 },
    { name: "FRMxBSC", network: "FRMx", price_percentage: "4.8", price: tokenPrices["FRMx"] || 0 },
    { name: "cBTx", network: "cFRMx", price_percentage: "4.8", price: tokenPrices["cFRMx"] || 0 },
  ];
  return (
    <FCard>
      <FTypo className="card-title f-pl-1">Price</FTypo>
      <div className={"card-price-wrapper"}>
        {DATA_PRICE.length
          ? DATA_PRICE.map((item, index) => {
            return (
              <FCard
                variant={"secondary"}
                className="card-price styled-card align-h"
                key={index}
              >
                <FItem display={"flex"} alignX="between" alignY={"center"}>
                  <FItem display={"flex"} alignY={"center"} className="w-100">
                    <span className="icon-network f-pr--5">
                      <img src={tokenData[item.name]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
                    </span>
                    <FTypo>{item.network}</FTypo>
                  </FItem>
                  <FTypo color="#28B885" size={14} align={"right"}>
                    {/* <IconArrowGreen width={15} /> */}
                    {/* {item.price_percentage}% */}
                  </FTypo>
                </FItem>
                <FTypo
                  size={25}
                  weight={600}
                  align={"end"}
                  display="flex"
                  alignY={"end"}
                  className="f-mt--5"
                >
                  {item.price}
                  <FTypo
                    size={12}
                    weight={600}
                    color="#DAB46E"
                    className={"f-pl--7 f-pb--1"}
                  >
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
