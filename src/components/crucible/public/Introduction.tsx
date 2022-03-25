import React, { useEffect, useState } from "react";
import { FButton, FCard, FContainer, FInputCheckbox, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../assets/img/icon-arrow-square.svg";
import { useHistory, useLocation } from "react-router"; 
import { useSelector } from "react-redux";
import { MetaMaskConnector } from "../../../container-components";
import { RootState } from "../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { ConnectWalletDialog } from "../../../utils/connect-wallet/ConnectWalletDialog"; 
import { updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId } from "../../../_apis/StepFlowStepHistory";
 
const Introduction = () => {
  const history = useHistory();
  const location: any = useLocation();

  const [neverShowAgain, setNeverShowAgain] = useState(false);
  const [stepFlowResponse, setStepFlowResponse]  = useState<any>(undefined);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { stepFlowStepHistory, currentStep } = useSelector((state: RootState) => state.crucible);
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);

  // useEffect(() => { 
  //   console.log(location.state, 'loc state')
  //   if ( location.state === undefined) {
  //     history.push(PATH_DASHBOARD.crucible.index)
  //   }
  // }, [location])

  // useEffect(() => {
  //     console.log(meV2 , 'going')
  //     if ( isConnected && meV2._id){
  //       history.push({pathname: PATH_DASHBOARD.crucible.deployer, state: location.state}) 
  //     }
  // }, [isConnected, meV2])
  
  
//   useEffect(() => { 
//     if ( stepFlowStepHistory?.length ){
//         const step: any = getLatestStepWithPendingStatus(stepFlowStepHistory); // undefined check implement to reatrt sequence  
//       if (tokenV2 && location.state.id && step?.step?.name !== "Introduction") {  
//         history.push({pathname: PATH_DASHBOARD.crucible.deployer, state: location.state})
//       }
//     }
//   }, [tokenV2, location, stepFlowStepHistory])


  const onGetStartedClick = async () => {
    console.log(neverShowAgain)
    if ( neverShowAgain === true ){
      let data = { status: "completed" }
      let updateResponse: any = await updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      console.log(updateResponse, '------------------')
      history.push({pathname: PATH_DASHBOARD.crucible.deployer, state: location.state})
    } else {
      history.push({pathname:"/dashboard/crucible/manage", state: location.state}) 
    }
  }

  const onNeverShowClick = (value: any) => { 
    setNeverShowAgain(value)
  }

  return (
  <FCard>
    old pahge
  </FCard>
  );
};

export default Introduction