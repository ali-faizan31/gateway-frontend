import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CardAPR } from "../../components/crucible/CardAPR";
import { CrucibleMyBalance } from "../../components/crucible/CardMyBalance";
import { CruciblePrice } from "../../components/crucible/CardPrice";
import { RootState } from "../../redux/rootReducer";

const CrucibleDashboardPage = () => {
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);

  useEffect(() => { 
    if ( isConnected === false ){
      console.log('------------------ dashboard')
    }
  }, [isConnected])
  
  
  return (
    <FContainer className="f-ml-0">
      <CrucibleMyBalance />
      <FTypo className="page-title">Dashboard</FTypo>
      <CruciblePrice />
      <CardAPR />
    </FContainer>
  );
};
export default CrucibleDashboardPage;
