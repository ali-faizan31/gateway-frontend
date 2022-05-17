import React, { useEffect, useState } from "react";
import { FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { TruncateWithoutRounding } from "../../../utils/global.utils";

export const CrucibleMyBalance = () => {
  const { tokenData } = useSelector((state: RootState) => state.crucible); 

  return (
    <FCard className="card-my-balance styled-card align-v">
      <FTypo className="card-title" size={20} color="#DAB46E">
        My Balance
      </FTypo>
      <FList>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={tokenData["cFRM"]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{tokenData["cFRM"]?.symbol}</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            {TruncateWithoutRounding(tokenData["cFRM"]?.balance, 3) || 0}
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={tokenData["APELPCFRMBNB"]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{tokenData["APELPCFRMBNB"]?.symbol}</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            {TruncateWithoutRounding(tokenData["APELPCFRMBNB"]?.balance, 3) || 0}
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={tokenData["cFRMx"]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{tokenData["cFRMx"]?.symbol}</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            {TruncateWithoutRounding(tokenData["cFRMx"]?.balance, 3) || 0}
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={tokenData["APELPCFRMxBNB"]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{tokenData["APELPCFRMxBNB"]?.symbol}</FTypo>
          </FItem>
          <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
            {TruncateWithoutRounding(tokenData["APELPCFRMxBNB"]?.balance, 3) || 0}
          </FTypo>
        </FListItem>
      </FList>
    </FCard>
  );
};
