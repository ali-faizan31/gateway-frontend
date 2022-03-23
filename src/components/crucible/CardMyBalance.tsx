import React from "react";
import { FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../assets/img/icon-ferrum.svg";

const DATA_MY_BAL = [
  { network: "FRM", price: 0.072 },
  { network: "FRM", price: 0.072 },
  { network: "FRM", price: 0.072 },
  { network: "FRM", price: 0.072 },
];

export const CrucibleMyBalance = () => {
  return (
    <FCard variant={"secondary"} className="card-my-balance styled-card align-v">
      <FTypo className="card-title" size={20} color="#DAB46E">
        My Balance
      </FTypo>
      <FList>
        {DATA_MY_BAL?.length
          ? DATA_MY_BAL.map((item, index) => {
              return (
                <FListItem>
                  <FItem display={"flex"} alignY={"center"} className="w-100">
                    <span className="icon-network f-pr--5">
                      <IconFerrum />
                    </span>
                    <FTypo>{item.network}</FTypo>
                  </FItem>
                  <FTypo size={25} weight={600} align={"end"} display="flex" alignY={"end"}>
                    {item.price}
                    <FTypo size={12} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
                      USD
                    </FTypo>
                  </FTypo>
                </FListItem>
              );
            })
          : null}
      </FList>
    </FCard>
  );
};
