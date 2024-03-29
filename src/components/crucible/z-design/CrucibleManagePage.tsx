import React, { useState } from "react";
import { FButton, FCard, FContainer, FGrid, FGridItem, FItem, FResponseBar, FTypo } from "ferrum-design-system";
import { CrucibleMyBalance } from "./CardMyBalance";
import { CrucibleDeposit } from "./CardDeposit";
import { CrucibleManage } from "./CardManage";

const CrucibleManagePage = () => {
  const [deposit, setDeposit] = useState(false);
  const [unwrap, setUnwrap] = useState(false);
  return (
    <FContainer className="card-manage">
      <CrucibleMyBalance />

      {/* <FResponseBar variant="success" title={"Withdraw Transaction Successful. [ 0x06167934...5bvf645949c ]"} /> */}
      {deposit ? <CrucibleDeposit /> : <CrucibleManage deposit={deposit} setDeposit={setDeposit} />}
      <FContainer>
        <FCard className="card-crucible-token-info">
          <FTypo size={20}>Crucible Token Info</FTypo>
          <FGrid className={"info-bar"}>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  2%
                </FTypo>
                <FTypo size={20}>Transfer Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                  4%
                </FTypo>
                <FTypo size={20}>Unwrap Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
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
                <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"}>
                  13.929
                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                    CAKE-LP cFRMx-BNB
                  </FTypo>
                </FTypo>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem align="right">
                  <FTypo color="#DAB46E" size={40} weight={600} align={"end"} display="flex" alignY={"end"}>
                    <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
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
                <FButton title={"Claim"}></FButton>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
        <FGrid className="btn-wrap f-mt-2 f-mb-2" spacing={15}>
          <FGridItem size={[4, 4, 4]}>
            <FButton title={"Stake"} className={"w-100 f-btn-gradiant"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton variant={"secondary"} title={"Unstake"} outlined className={"w-100"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton variant={"secondary"} title={"Add Liquidity"} outlined className={"w-100"}></FButton>
          </FGridItem>
        </FGrid>
      </FContainer>
    </FContainer>
  );
};
export default CrucibleManagePage;
