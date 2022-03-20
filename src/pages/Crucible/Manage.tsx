import React from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../assets/img/icon-network-bsc.svg";
import { CardMyBalance } from "../../components/crucible/CardMyBalance";

const CrucibleManage = () => {
  return (
    <FContainer className="f-mr-0 card-manage" width={900}>
      <FCard variant={"secondary"}>
        <div className="card-title">
          <FItem display={"flex"} alignY="center">
            <Link to="/dashboard/crucible" className="btn-back">
              <IconGoBack />
            </Link>
            <FTypo size={30} weight={600}>
              Crucible Farm Dashboard - cFRMx / BNB
            </FTypo>
          </FItem>
          <div className="network-icon-wrapper">
            <span className="icon-wrap">
              <IconNetworkCFrm />
              <IconNetworkBsc />
            </span>
          </div>
        </div>
        <FGrid>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"f-p-2"}>
              <FTypo size={24} className="f-mb-1">
                FRMx Price (USD)
              </FTypo>
              <FTypo size={36} weight={500}>
                $0.072
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"f-p-2"}>
              <FTypo size={24} className="f-mb-1">
                FRMx Price (USD)
              </FTypo>
              <FTypo size={36} weight={500}>
                $0.072
              </FTypo>
            </FItem>
          </FGridItem>
        </FGrid>
        <FGrid className="btn-wrap">
          <FGridItem size={[4, 4, 4]}>
            <FButton title={"Buy Token"} outlined className={"w-100"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton title={"Mint cFRMx"} outlined className={"w-100"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton variant={"secondary"} title={"Unwrap"} outlined className={"w-100"}></FButton>
          </FGridItem>
        </FGrid>
      </FCard>
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
              <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"}>
                13.929
                <FTypo size={14} weight={300} className={"f-pl--7 f-pb--1"}>
                  APE-LP cFRMx-BNB
                </FTypo>
              </FTypo>
            </FGridItem>
            <FGridItem size={[6, 6, 6]}>
              <FItem align="right">
                <FTypo color="#DAB46E" size={50} weight={600} align={"end"} display="flex" alignY={"end"}>
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
        <FGrid className="btn-wrap">
          <FGridItem size={[4, 4, 4]}>
            <FButton title={"Stake"} className={"w-100"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton variant={"secondary"} title={"Unstake"} outlined className={"w-100"}></FButton>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FButton variant={"secondary"} title={"Add Liquidity"} outlined className={"w-100"}></FButton>
          </FGridItem>
        </FGrid>
      </FContainer>
      <CardMyBalance />
    </FContainer>
  );
};
export default CrucibleManage;
