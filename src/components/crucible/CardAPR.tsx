import React, { useState } from "react";
import { useHistory } from "react-router";
import Datatable from "react-bs-datatable";
import { FButton, FCard, FInputText, FItem, FTable, FTypo } from "ferrum-design-system";
import { ReactComponent as IconNetworkCFrm } from "../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../assets/img/icon-network-bsc.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";  
import { PATH_DASHBOARD } from "../../routes/paths";
import { Deployer } from "./Deployer";
import { CrucibleDeposit } from "./CardDeposit";
import { getStepFlowStepByStepFlowIdForPublic } from "../../_apis/StepFlowStepCrud";

export const CardAPR = () => {
  const history = useHistory();
  const [isSet, setIsSet] = useState(false);
  const { isConnected, isConnecting } = useSelector((state: RootState) => state.walletConnector);
  


  const tableHeads: any[] = [
    { width: 200, prop: "sustainableCrucibleFarms", title: "Sustainable Crucible Farms" },
    { prop: "totalDeposited", title: "Total Deposited" },
    { prop: "yourDeposit", title: "Your Deposit" },
    { prop: "yourRewards", title: "Your Rewards" },
    {
      prop: "apr",
      title: <FTypo color="#DAB46E">APR</FTypo>,
    },
    { prop: "action", title: <></> },
  ];

  const stepFlowsMock = [
    {sustainableCrucibleFarms: "cFRM / BNB", totalDeposited: "127", yourDeposit: "$13", yourRewards:"$.1", apr: "10%", id: "6238314dd292da2db05524dd" },
    {sustainableCrucibleFarms: "cFRM", totalDeposited: "127", yourDeposit: "$13", yourRewards:"$.2", apr: "20%", id: "6238386bd292da2db05524f9" },
    {sustainableCrucibleFarms: "cFRMx / BNB", totalDeposited: "127", yourDeposit: "$13", yourRewards:"$.3", apr: "20%", id: "62383841d292da2db05524f3" },
    {sustainableCrucibleFarms: "cFRMx", totalDeposited: "127", yourDeposit: "$13", yourRewards:"$.4", apr: "40%", id: "62383865d292da2db05524f6" }
  ]

  const body = stepFlowsMock.map((stepFlow, index) => { 
      return {
        sustainableCrucibleFarms: (
          <FItem data-label="Sustainable Crucible Farms" className={"col-crucible-farming"} display={"flex"} alignY="center">
            <span className="network-icon-wrap f-mr-1">
              <IconNetworkCFrm />
              <IconNetworkBsc />
            </span>
            {stepFlow.sustainableCrucibleFarms}
          </FItem>
        ),
        totalDeposited: <FTypo className={"col-amount"}>{stepFlow.totalDeposited}</FTypo>,
        yourDeposit: <FTypo className={"col-amount"}>{stepFlow.yourDeposit}</FTypo>,
        yourRewards: <FTypo className={"col-amount"}>{stepFlow.yourRewards}</FTypo>,
        apr: (
          <FTypo className={"col-amount"} size={24} color="#DAB46E" weight={500}>
            {stepFlow.apr}
          </FTypo>
        ),
        action: (
          <div className="col-action">
            <FButton title={"Manage"} onClick={()=> renderComponent(stepFlow.id)} />
            <FButton title={"Deposit"} onClick={() => history.push({pathname: "/dashboard/crucible/get-started", state: stepFlow.id})}></FButton>
          </div>
        ),
      }; 
  }); 

  const renderComponent = (id: any) => {
    //   if ( isConnected ) {
    //     getStepToRender(id, true)
    // } else {
    //     getStepToRender(id, false)
    // } 
    history.push({pathname: PATH_DASHBOARD.crucible.deployer, state: id}) 
  }

  const getStepToRender = async (id: any, isConnected: any) => {
    let stepResponse: any = [];
    if ( isConnected ){
         console.log('connected') 
    } else {
        stepResponse = await getStepFlowStepByStepFlowIdForPublic(id);
        console.log(stepResponse.data.body); 
    }
}

  return (
    <> 
      <FCard className="card-apr f-mt-2">
        <FItem display={"flex"} alignX="between" alignY={"center"} className="f-pb-1 f-m-0">
          <FTypo className="card-title f-pl-1">APR</FTypo>
          <FInputText type={"text"} placeholder="Search by Farm Name, Token Name, Token Contract Address" />
        </FItem>
        <FTable>
          <Datatable tableBody={body} tableHeaders={tableHeads} rowsPerPage={10} />
        </FTable>
      </FCard> 
    </>
  );
};
