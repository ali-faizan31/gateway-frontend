import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../CardAPR";
import { CrucibleMyBalance } from "../CardMyBalance";
import { CruciblePrice } from "../CardPrice"; 

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
      <FTypo className="page-title">Dashboard New</FTypo>
      <CruciblePrice />
      <CardAPR />
    </FContainer>
  );
};
export default CrucibleDashboardPage;
