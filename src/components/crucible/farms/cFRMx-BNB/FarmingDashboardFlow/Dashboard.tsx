import React, { useState } from "react";
import {
  FButton,
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  FResponseBar,
  FTypo,
} from "ferrum-design-system";
import { CrucibleManage } from "../common/CardManage";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { useHistory } from "react-router";
import { PATH_DASHBOARD } from "../../../../../routes/paths";

export const Manage = () => {
  const history = useHistory();
  const [dashboardAction, setDashboardAction] = useState(false);
  const [unwrap, setUnwrap] = useState(false);
  const [flowType, setFlowType] = useState("");

  const onUnStakeClick = () => {
    history.push({
      pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.unstake.unstake,
    });
  };

  const onStakeClick = () => {
    history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.stake.stake });
  };

  const onClaimRewardsClick = () => {
    history.push({
      pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.withdraw.withdraw,
    });
  };

  const onAddLiquidityClick = () => {
    history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.liquidity });
  };

  return (
    <FContainer className="f-mr-0 card-manage" width={700}>
      <CrucibleMyBalance />

      {/* <FResponseBar variant="success" title={"Withdraw Transaction Successful. [ 0x06167934...5bvf645949c ]"} /> */}
      <CrucibleManage
        dashboardAction={dashboardAction}
        setDashboardAction={setDashboardAction}
        setFlowType={setFlowType}
      />
      <FContainer width={650}>
        <FCard className="card-crucible-token-info">
          <FTypo size={20}>Crucible Token Info</FTypo>
          <FGrid className={"info-bar"}>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                  2%
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
                  4%
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
                  cFRMx
                </FTypo>
                <FTypo size={20}>Crucible Token</FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <FCard className={"styled-card align-v your-crucible"}>
            <FGrid>
              <FGridItem size={[6, 6, 6]} dir="column">
                <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
                <FTypo
                  size={24}
                  weight={600}
                  align={"end"}
                  display="flex"
                  alignY={"end"}
                >
                  13.929
                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                    APE-LP cFRMx-BNB
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
                  7.292 cFRMx
                </FTypo>
              </FGridItem>
              <FGridItem size={[6]} alignY="center" alignX={"end"}>
                <FButton
                  title={"Claim"}
                  onClick={onClaimRewardsClick}
                ></FButton>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
        <FGrid className="btn-wrap f-mt-2 f-mb-2" spacing={15}>
          <FGridItem size={[4, 4, 4]}>
            <FButton
              title={"Stake"}
              className={"w-100 f-btn-gradiant"}
              onClick={onStakeClick}
            ></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton
              variant={"secondary"}
              title={"Unstake"}
              outlined
              className={"w-100"}
              onClick={onUnStakeClick}
            ></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton
              variant={"secondary"}
              title={"Add Liquidity"}
              outlined
              className={"w-100"}
              onClick={onAddLiquidityClick}
            ></FButton>
          </FGridItem>
        </FGrid>
      </FContainer>
    </FContainer>
  );
};
