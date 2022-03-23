import React from "react";
import { FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../assets/img/icon-ferrum.svg";

export const CrucibleMyBalance = () => {
  return (
    <FCard variant={"secondary"} className="card-my-balance styled-card align-v">
      <FTypo className="card-title" size={20} color="#DAB46E">
        My Balance
      </FTypo>
      <FList>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <IconFerrum />
            </span>
            <FTypo>FRM</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            0.072
            <FTypo size={14} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
              USD
            </FTypo>
          </FTypo>
        </FListItem>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <IconFerrum />
            </span>
            <FTypo>FRM</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            0.072
            <FTypo size={14} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
              USD
            </FTypo>
          </FTypo>
        </FListItem>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <IconFerrum />
            </span>
            <FTypo>FRM</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            0.072
            <FTypo size={14} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
              USD
            </FTypo>
          </FTypo>
        </FListItem>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <IconFerrum />
            </span>
            <FTypo>FRM</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            0.072
            <FTypo size={14} weight={600} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
              USD
            </FTypo>
          </FTypo>
        </FListItem>
      </FList>
    </FCard>
  );
};
