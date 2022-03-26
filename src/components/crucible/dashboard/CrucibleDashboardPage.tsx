import {
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../common/CardAPR";
import { CrucibleMyBalance } from "../common/CardMyBalance";
import { CruciblePrice } from "../common/CardPrice"; 
import { useHistory, useLocation } from "react-router"; 
import * as CrucibleActions from '../redux/CrucibleActions'

const CrucibleDashboardPage = () => {
  const dispatch = useDispatch();
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);
  
  useEffect(() => {
    dispatch(CrucibleActions.resetCrucible())        
  }, [])
  

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
