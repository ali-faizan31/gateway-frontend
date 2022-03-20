import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import React from "react";
import { CardAPR } from "../../components/crucible/CardAPR";
import { CardMyBalance } from "../../components/crucible/CardMyBalance";
import { CardPrice } from "../../components/crucible/CardPrice";

const CrucibleDashboard = () => {
  return (
    <FContainer className="f-ml-0">
      <FTypo className="page-title">Dashboard</FTypo>
      <FCard>
        <FTypo className="card-title f-pl-1">Price</FTypo>
        <FGrid>
          <FGridItem size={[3, 3, 6]}>
            <CardPrice />
          </FGridItem>
          <FGridItem size={[3, 3, 6]}>
            <CardPrice />
          </FGridItem>
          <FGridItem size={[3, 3, 6]}>
            <CardPrice />
          </FGridItem>
          <FGridItem size={[3, 3, 6]}>
            <CardPrice />
          </FGridItem>
        </FGrid>
      </FCard>
      <CardMyBalance />
      <CardAPR />
    </FContainer>
  );
};
export default CrucibleDashboard;
