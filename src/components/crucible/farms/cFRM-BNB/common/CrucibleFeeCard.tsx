import {
  FCard,
  FTypo,
  FGrid,
  FGridItem,
  FItem,
  FButton,
  FContainer,
} from "ferrum-design-system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { BigUtils } from "../../../../../container-components/web3Client/types";
import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { getActualRoute } from "../../../common/Helper";

const CrucibleFeeCard = () => {
  const history = useHistory();
  const location: any = useLocation();
  const { farm } = useParams<{ farm?: string }>();
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);

  const userCrucibleData = useSelector(
    (state: RootState) => state.crucible.userCrucibleDetails
  );
  let userStake = (userCrucibleData.stakes || []).find(
    (e: any) => e.address.toLowerCase() === location.state.LPstakingAddress
  );
  useEffect(() => {
    console.log("test");
  }, []);

  const onClaimRewardsClick = () => {
    history.push({
      pathname: getActualRoute(
        farm,
        PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.withdraw
      ),
    });
  };

  return (
    <>
      <FContainer width={650}>
        <FCard className="card-crucible-token-info">
          <FTypo size={20}>Crucible Token Info</FTypo>
          <FGrid className="info-bar">
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                  {`${BigUtils.safeParse(crucible?.feeOnTransferRate || "0")
                        .times(100)
                        .toString()}%`}
                </FTypo>
                <FTypo size={20}>Transfer Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                  {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate || "0")
                        .times(100)
                        .toString()}%`}
                </FTypo>
                <FTypo size={20}>Unwrap Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                   {crucible?.symbol}
                </FTypo>
                <FTypo size={20}>Crucible Token</FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <FCard className={"styled-card align-v your-crucible"}>
            <FGrid>
              <FGridItem size={[6, 6, 6]} dir="column">
                <FTypo className="f-pb--2">Your Crucible {farm?.includes("BNB")? "LP": ""} Farm Stake</FTypo>
                <FTypo
                  size={24}
                  weight={600}
                  align={"end"}
                  display="flex"
                  alignY={"end"}
                >
                   {Number(userStake?.stakeOf || "0").toFixed(3)}
                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                  {farm?.includes("BNB")? `APE-LP ${crucible?.symbol}-BNB`: crucible?.symbol}
                  </FTypo>
                </FTypo>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem align="right">
                  <FTypo
                    color="#DAB46E"
                    size={40}
                    weight={600}
                    align={"end"}
                    display="flex"
                    alignY={"end"}
                  >
                    <FTypo
                      size={16}
                      weight={500}
                      className={"f-pr--7 f-pb--3"}
                      align="right"
                    >
                      APR
                    </FTypo>
                    192%
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
                {Number(userStake?.rewardOf || "0").toFixed(3)} {crucible?.symbol}
                </FTypo>
              </FGridItem>
              <FGridItem size={[6]} alignY="center" alignX={"end"}>
                <FButton
                  title={"Claim"}
                  onClick={() => onClaimRewardsClick()}
                ></FButton>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
      </FContainer>
    </>
  );
};

export default CrucibleFeeCard;
