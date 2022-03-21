import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import React from "react";
import { CardAPR } from "../../components/crucible/CardAPR";
import { CrucibleMyBalance } from "../../components/crucible/CardMyBalance";
import { CruciblePrice } from "../../components/crucible/CardPrice";

const CrucibleDashboardPage = () => {
  return (
    <FContainer className="f-ml-0">
      <FTypo className="page-title">Dashboard</FTypo>
      <FCard>
        <FTypo className="card-title f-pl-1">Price</FTypo>
        <FGrid>
          <FGridItem size={[3, 3, 6]}>
            <CruciblePrice />
          </FGridItem>
          <FGridItem size={[3, 3, 6]}>
            <CruciblePrice />
          </FGridItem>
          <FGridItem size={[3, 3, 6]}>
            <CruciblePrice />
          </FGridItem>
          <FGridItem size={[3, 3, 6]}>
            <CruciblePrice />
          </FGridItem>
        </FGrid>
      </FCard>
      <CrucibleMyBalance />
      <CardAPR />
    </FContainer>
  );
};
export default CrucibleDashboardPage;
