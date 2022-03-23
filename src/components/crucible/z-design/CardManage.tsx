import React, { useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../assets/img/icon-network-bsc.svg";
import { useSelector } from "react-redux"; 
import { RootState } from "../../../redux/rootReducer";

export const CrucibleManage = ({ deposit, setDeposit, unwrap, setUnwrap }: any) => {
  const history = useHistory();
  const location: any = useLocation();
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);

  useEffect(() => { 
    if ( isConnected === false ){
      history.push('dashboard/crucible')
    }
  }, [isConnected])
  
  
  return (
    <FCard variant={"secondary"} className="card-manage-crucible card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
            Crucible Farms Dashboard  
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
          <FButton title={"Mint cFRMx"} outlined className={"w-100"} onClick={() => setDeposit(true)}></FButton>
        </FGridItem>
        <FGridItem size={[4, 4, 4]}>
          <FButton variant={"secondary"} title={"Unwrap"} outlined className={"w-100"} onClick={() => setDeposit(true)}></FButton>
        </FGridItem>
      </FGrid>
    </FCard>
  );
};
