import React, { useEffect, useState } from "react";
import { FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { TruncateWithoutRounding } from "../../../utils/global.utils";
import { Crucible_Balance_Tokens } from "./utils";

export const CrucibleMyBalance = () => {
  const { tokenData } = useSelector((state: RootState) => state.crucible);

  return (
    <div className={'mybalance-card'}>
      <FTypo className="card-title f-mb-1" size={20} weight={700} color="#ffffff">
        My Balance
      </FTypo>
      <FList>
        {Crucible_Balance_Tokens && Crucible_Balance_Tokens.length && Crucible_Balance_Tokens.map((item: any) => (
          <FListItem key={item}>
            <FItem display={"flex"} alignY={"center"} className="w-100 f-mt-1">
              <span className="icon-network f-pr--5">
                <img src={tokenData[item]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
              </span>
              <FTypo size={16} weight={700}>{tokenData[item]?.symbol}</FTypo>
            </FItem>
            <FTypo size={20} weight={600} align={"end"} display="flex" alignY={"end"}>
              {TruncateWithoutRounding(tokenData[item]?.balance, 3) || 0}
            </FTypo>
          </FListItem>
        ))}
      </FList>
    </div>
    // <FCard className="card-my-balance styled-card align-v">
    // <FTypo className="card-title" size={20} color="#DAB46E">
    //   My Balance 11111
    // </FTypo>
    // <FList>
    //   {Crucible_Balance_Tokens && Crucible_Balance_Tokens.length && Crucible_Balance_Tokens.map((item: any) => (
    //     <FListItem key={item}>
    //       <FItem display={"flex"} alignY={"center"} className="w-100">
    //         <span className="icon-network f-pr--5">
    //           <img src={tokenData[item]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
    //         </span>
    //         <FTypo>{tokenData[item]?.symbol}</FTypo>
    //       </FItem>
    //       <FTypo size={30} weight={600} align={"end"} display="flex" alignY={"end"}>
    //         {TruncateWithoutRounding(tokenData[item]?.balance, 3) || 0}
    //       </FTypo>
    //     </FListItem>
    //   ))}
    // </FList>
    // </FCard>
  );
};
