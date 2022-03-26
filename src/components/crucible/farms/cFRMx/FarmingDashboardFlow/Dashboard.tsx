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
// import { CrucibleDeposit } from "../../../CardDeposit";
// import { CrucibleManage } from "../../../CardManage";
// import { CrucibleMyBalance } from "../../../CardMyBalance";

const CrucibleManagePage = () => {
  const [deposit, setDeposit] = useState(false);
  const [unwrap, setUnwrap] = useState(false);
  return (
    <FContainer className="f-mr-0 card-manage" width={700}>
      {/* <CrucibleMyBalance /> */}

      {/* <FResponseBar variant="success" title={"Withdraw Transaction Successful. [ 0x06167934...5bvf645949c ]"} /> */}
      {/* {deposit ? <CrucibleDeposit /> : <CrucibleManage deposit={deposit} setDeposit={setDeposit} />} */}
      <FCard className="card-crucible-token-info" width={"95%"}>
        <FTypo size={24}>Crucible Token Info</FTypo>
        <FGrid className="btn-wrap">
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
            <FGridItem size={[6, 6, 6]}>
              <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
              <FTypo
                size={24}
                weight={600}
                align={"end"}
                display="flex"
                alignY={"end"}
              >
                13.929
                <FTypo size={14} weight={300} className={"f-pl--7 f-pb--1"}>
                  APE-LP cFRMx-BNB
                </FTypo>
              </FTypo>
            </FGridItem>
            <FGridItem size={[6, 6, 6]}>
              <FItem align="right">
                <FTypo
                  color="#DAB46E"
                  size={50}
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
          <FGrid>
            <FGridItem size={[8, 8, 6]}>
              <FTypo className="f-pb--2">Your unclaimed Rewards</FTypo>
              <FTypo size={24} weight={500}>
                7.292 cFRMx
              </FTypo>
            </FGridItem>
            <FGridItem size={[4, 4, 6]} alignX="center" alignY={"end"}>
              <FButton title={"Claim"}></FButton>
            </FGridItem>
          </FGrid>
        </FCard>
      </FCard>
      <FContainer width={850}>
        <FGrid className="btn-wrap f-mt-2 f-mb-2">
          <FGridItem size={[4, 4, 4]}>
            <FButton title={"Stake"} className={"w-100"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton
              variant={"secondary"}
              title={"Unstake"}
              outlined
              className={"w-100"}
            ></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton
              variant={"secondary"}
              title={"Add Liquidity"}
              outlined
              className={"w-100"}
            ></FButton>
          </FGridItem>
        </FGrid>
      </FContainer>
    </FContainer>
  );
};
export default CrucibleManagePage;
