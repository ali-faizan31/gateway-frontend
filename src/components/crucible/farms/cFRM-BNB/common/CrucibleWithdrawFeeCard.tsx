import {
  FCard,
  FTypo,
  FGrid,
  FGridItem,
  FItem,
  // FButton,
  FContainer,
} from "ferrum-design-system";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { BigUtils } from "../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import { TruncateWithoutRounding } from "../../../../../utils/global.utils";
import { getAPRValueAgainstFarm } from "../../../common/Helper";
import { MultipleAPR } from "../../../common/multipleAPR";
import IconActiveRight from "../../../../../assets/img/active-right-yellow.svg";
import IconActiveLeft from "../../../../../assets/img/active-left-yellow.svg";
import IconInactiveLeft from "../../../../../assets/img/inactive-left-yellow.svg";
import IconInactiveRight from "../../../../../assets/img/inactive-right-yellow.svg";

const CrucibleWithdrawFeeCard = () => {
  const { farm } = useParams<{ farm?: string }>();
  const location: any = useLocation();
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const LPStakingDetails = useSelector((state: RootState) => state.crucible.userLpStakingDetails);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  const { aprInformation } = useSelector((state: RootState) => state.crucible);
  const [activeAPRIndex, setActiveAPRIndex] = useState(0);
  const aprData = Object.keys(aprInformation).length && getAPRValueAgainstFarm(aprInformation, farm);
  let userStake = userCrucibleData[farm!] && (userCrucibleData[farm!].stakes || []).find((e: any) => e.address.toLowerCase() === location.state.LPstakingAddress.toLowerCase());

  return (
    <>
      <FContainer>
        <FCard className="card-crucible-token-info">
          <FTypo size={20}>Crucible Token Info</FTypo>
          <FGrid className="info-bar">
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  {`${BigUtils.safeParse(crucible[farm!]?.feeOnTransferRate || "0")
                    .times(100)
                    .toString()}%`}
                </FTypo>
                <FTypo size={20}>Stake/Unstake Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  {`${BigUtils.safeParse(crucible[farm!]?.feeOnWithdrawRate || "0")
                    .times(100)
                    .toString()}%`}
                </FTypo>
                <FTypo size={20}>Unwrap Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  {crucible[farm!]?.symbol}
                </FTypo>
                <FTypo size={20}>Crucible Token</FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <FCard className={"styled-card align-v your-crucible"}>
            <FGrid>
              <FGridItem size={[6, 6, 6]} dir="column">
                <FTypo className="f-pb--2">Your Crucible {farm?.includes("BNB") ? "LP" : ""} Farm Stake</FTypo>
                <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"}>
                  {farm?.includes("BNB") ? TruncateWithoutRounding((LPStakingDetails[farm!]?.stake || "0"), 3) : TruncateWithoutRounding((userStake?.stakeOf || "0"), 3)}

                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                    {farm?.includes("BNB") ? `CAKE-LP ${crucible[farm!]?.symbol}-BNB` : crucible[farm!]?.symbol}
                  </FTypo>
                </FTypo>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem align="right" className="justify-content-end">
                  <div className="flex-center-aligned-center">
                    <img
                      className="cursor-pointer"
                      src={activeAPRIndex === 0 ? IconInactiveLeft : IconActiveLeft}
                      onClick={() => { activeAPRIndex !== 0 && setActiveAPRIndex(activeAPRIndex - 1) }}
                      style={{ height: 9, width: 10, marginRight: 22 }}
                    />
                    <div className="custom-width-117">
                      <p className="medium-text-400 text-center">{aprData[activeAPRIndex].label}</p>
                      <p className="text-35 text-center default-text-color">{aprData[activeAPRIndex].value}</p>
                    </div>
                    <img
                      className="cursor-pointer"
                      src={activeAPRIndex < aprData.length - 1 ? IconActiveRight : IconInactiveRight}
                      onClick={() => { activeAPRIndex < aprData.length - 1 && setActiveAPRIndex(activeAPRIndex + 1) }}
                      style={{ height: 9, width: 10, marginLeft: 22 }} />
                  </div>
                </FItem>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
      </FContainer>
    </>
  );
};

export default CrucibleWithdrawFeeCard;
