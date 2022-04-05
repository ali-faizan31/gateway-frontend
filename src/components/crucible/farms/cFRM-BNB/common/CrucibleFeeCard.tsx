import { FCard, FTypo, FGrid, FGridItem, FItem, FButton, FContainer } from "ferrum-design-system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { BigUtils } from "../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { TruncateWithoutRounding } from "../../../../../utils/global.utils";
import { getActualRoute, getAPRValueAgainstFarm, getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import { STEP_FLOW_IDS } from "../../../common/utils";

const CrucibleFeeCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const { farm } = useParams<{ farm?: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { currentStep, currentStepIndex, stepFlowStepHistory, aprInformation } = useSelector((state: RootState) => state.crucible);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  const LPStakingDetails = useSelector((state: RootState) => state.crucible.userLpStakingDetails);
  let userStake = userCrucibleData[farm!] && (userCrucibleData[farm!].stakes || []).find((e: any) => e.address.toLowerCase() === location.state.LPstakingAddress);
  const { networkClient } = useSelector((state: RootState) => state.walletConnector);

  const onClaimRewardsClick = () => {
    setIsLoading(true);
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].withdraw;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    setIsLoading(false);
  };

  const getRewardAmount = () => {
    console.log(LPStakingDetails[farm!]);
    if (farm?.includes("BNB")) {
      return TruncateWithoutRounding(networkClient?.utils.fromWei(String(LPStakingDetails[farm!]?.rewards[0]?.rewardAmount || 0), "ether"), 3);
    } else {
      // networkClient?.utils.fromWei(String(userStake?.rewardOf || 0), 'ether')
      return TruncateWithoutRounding(userStake?.rewardOf || 0, 3);
    }
  };

  const getRewardSymbol = () => {
    console.log(crucible);
    return crucible[farm!]?.symbol;
  };

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
                <FTypo size={20}>Transfer Fee</FTypo>
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
                  {farm?.includes("BNB") ? Number(LPStakingDetails[farm!]?.stake || "0") : Number(userStake?.stakeOf || "0").toFixed(3)}
                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                    {farm?.includes("BNB") ? `APE-LP ${crucible[farm!]?.symbol}-BNB` : crucible[farm!]?.symbol}
                  </FTypo>
                </FTypo>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem align="right">
                  <FTypo color="#DAB46E" size={40} weight={600} align={"end"} display="flex" alignY={"end"}>
                    <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
                      APR
                    </FTypo>
                    {getAPRValueAgainstFarm(aprInformation, farm)}
                  </FTypo>
                </FItem>
              </FGridItem>
            </FGrid>
          </FCard>
          <FCard className={"your-claimed-rewards"}>
            <FGrid alignY={"center"}>
              <FGridItem size={[6]} dir="column">
                <FTypo className="f-pb--2">Your unclaimed Rewards</FTypo>
                <FTypo color="#DAB46E" size={22} weight={700}>
                  {getRewardAmount()} {getRewardSymbol()}
                </FTypo>
              </FGridItem>
              <FGridItem size={[6]} alignY="center" alignX={"end"}>
                <FButton title={"Claim"} onClick={() => onClaimRewardsClick()}></FButton>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
      </FContainer>
    </>
  );
};

export default CrucibleFeeCard;
