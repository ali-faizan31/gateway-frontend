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
import { getAPRValueAgainstFarm, getHumanReadableFarmName } from "../../../common/Helper";
import IconActiveRight from "../../../../../assets/img/right-icon-light-grey.svg";
import IconActiveLeft from "../../../../../assets/img/left-icon-light-grey.svg";
import { ReactComponent as IconNetworkBnb } from "../../../../../assets/img/icon-network-bnb.svg";
import IconNetworkCFrmStr from "../../../../../assets/img/icon-network-cfrm.svg";
import IconNetworkCFrmxStr from "../../../../../assets/img/icon-network-cfrmx.svg";

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
        <div className="crucible-farm-dashboard-card-2">
          <div className={'f-mt-1 f-mb-1'}>
            <div className="flex-center-aligned-center">
              <span className="icon-wrap custom-mr-12" style={{ marginLeft: 24 }}>
                <img src={farm?.includes("cFRMx") ? IconNetworkCFrmxStr : IconNetworkCFrmStr} alt="network-cfrm" />
                {farm?.includes("BNB") && <IconNetworkBnb />}
              </span>
              <p className="custom-font-size-20 font-700 custom-mr-24">{getHumanReadableFarmName(farm)}</p>
              <FTypo size={16} weight={700}>Crucible Token</FTypo>
            </div>
            <div className={'d-flex align_center justify_start unwrap-farm-card'}>
              <div className="d-flex align_center justify_start w-100 custom-mr-10">
                <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Buy Fee</p>
                <p className={'custom-font-size-18 font-600 clr_white'}>4%</p>
              </div>
              <div className="d-flex align_center justify_start w-100 custom-mr-10">
                <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Sell Fee</p>
                <p className={'custom-font-size-18 font-600 clr_white'}>4%</p>
              </div>
              <div className="d-flex align_center justify_start w-100 custom-mr-10">
                <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Unwrap Fee</p>
                <p className={'custom-font-size-18 font-600 clr_white'}>
                  {`${BigUtils.safeParse(crucible[farm!]?.feeOnWithdrawRate || "0")
                    .times(100)
                    .toString()}%`}
                </p>
              </div>
              <div className="d-flex align_center justify_start w-100">
                <p className={'custom-font-size-12 font-500 clr_black_light custom-mr-8'}>Stake/Unstake Fee</p>
                <p className={'custom-font-size-18 font-600 clr_white'}>
                  {`${BigUtils.safeParse(crucible[farm!]?.feeOnTransferRate || "0")
                    .times(100)
                    .toString()}%`}
                </p>
              </div>
            </div>
            <div className="d-flex justify_start align_center">
              <div className="custom-mr-50">
                <FTypo size={12} weight={500} color="#6F767E">
                  Your Crucible {farm?.includes("BNB") ? "LP" : ""} Farm Stake
                </FTypo>
                <div className="justify_start d-flex align_end f-mt-1">
                  <p className={'custom-font-size-20 font-600 clr_white custom-mr-10'}>
                    {farm?.includes("BNB") ? TruncateWithoutRounding((LPStakingDetails[farm!]?.stake || "0"), 3) : TruncateWithoutRounding((userStake?.stakeOf || "0"), 3)}
                  </p>
                  <p className={'custom-font-size-12 font-700 clr_white'}>
                    {farm?.includes("BNB") ? `CAKE-LP ${crucible[farm!]?.symbol}-BNB` : crucible[farm!]?.symbol}
                  </p>
                </div>
              </div>
              <div>
                <div className="justify_start d-flex align_center">
                  <img
                    src={IconActiveLeft}
                    onClick={() => { activeAPRIndex !== 0 && setActiveAPRIndex(activeAPRIndex - 1) }}
                    alt="" />
                  <FTypo size={12} weight={500} color="#6F767E">
                    {aprData[activeAPRIndex].label}
                  </FTypo>
                  <img
                    src={IconActiveRight}
                    onClick={() => { activeAPRIndex < aprData.length - 1 && setActiveAPRIndex(activeAPRIndex + 1) }}
                    alt="" />
                </div>
                <FTypo size={20} weight={700} color="#FFFFFF" className={'f-mt-1 f-pl--9'}>
                  {aprData[activeAPRIndex].value}
                </FTypo>
              </div>
            </div>

          </div>
        </div>
        {/* <FCard className="card-crucible-token-info">
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
        </FCard> */}
      </FContainer>
    </>
  );
};

export default CrucibleWithdrawFeeCard;
