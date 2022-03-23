import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import React from "react";
import { CardAPR } from "../../components/crucible/CardAPR";
import { CrucibleMyBalance } from "../../components/crucible/CardMyBalance";
import { CruciblePrice } from "../../components/crucible/CardPrice";

const CrucibleDashboardPage = () => {
  return (
    <FContainer className="f-ml-0 crucible-dashboard">
      <CrucibleMyBalance />
      <FTypo className="page-title">Dashboard</FTypo>
      <CruciblePrice />
      <CardAPR />
    </FContainer>
  );
};
export default CrucibleDashboardPage;
