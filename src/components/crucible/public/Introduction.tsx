import React, { useEffect, useState } from "react";
import { FButton, FCard, FContainer, FInputCheckbox, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../assets/img/icon-arrow-square.svg";
import { useHistory, useLocation } from "react-router"; 
import { useSelector } from "react-redux";
import { MetaMaskConnector } from "../../../container-components";
import { RootState } from "../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../routes/paths";
import { ConnectWalletDialog } from "../../../utils/connect-wallet/ConnectWalletDialog";
import { getLatestStepWithPendingStatus } from "../../../utils/global.utils";
import { updateStepFlowStepHistoryByStepFlowStepHistoryId } from "../../../_apis/StepFlowStepHistory";
 
const Introduction = () => {
  const history = useHistory();
  const location: any = useLocation();

  const [neverShowAgain, setNeverShowAgain] = useState(false);
  const [stepFlowResponse, setStepFlowResponse]  = useState<any>(undefined);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { stepFlowStepHistory, currentStep } = useSelector((state: RootState) => state.crucible);
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);

  useEffect(() => { 
    console.log(location.state, 'loc state')
    if ( location.state === undefined) {
      history.push(PATH_DASHBOARD.crucible.index)
    }
  }, [location])

  useEffect(() => {
      console.log(meV2 , 'going')
      if ( isConnected && meV2._id){
        history.push({pathname: PATH_DASHBOARD.crucible.deployer, state: location.state}) 
      }
  }, [isConnected, meV2])
  
  
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
      let updateResponse: any = await updateStepFlowStepHistoryByStepFlowStepHistoryId(currentStep._id, data, tokenV2);
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
    <FContainer width={950} className="f-mr-0 f-mb-2">
      <FCard variant={"secondary"} className="card-get-started">
        <FTypo className="card-title" size={22} color="#DAB46E">
          Welcome To The Crucible by Ferrum Network New
        </FTypo>
        <FTypo>
          Watch the explainer video below for a step-by-step tutorial on how to mint, add liquidity, farm, trade, and earn rewards through the
          Crucible!
        </FTypo>
        <div className="video-wrapper f-mt-1 f-mb-1">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/S2m-UV7F89o"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen></iframe>
        </div>
        <FTypo size={22} weight={500} className="f-mb-1">
          Crucible Benefits
        </FTypo>
        <FTypo size={18} className="f-mb-2">
          Below are just a few of the incredible features of The Crucible.
        </FTypo>
        <ul>
          <li>Ecosystem of Autonomous Sustainable Farming Pools</li>
          <li>Sustainable Rewards Economy</li>
          <li>Built-in Token Burn</li>
          <li>Mint, Add Liquidity, Farm, Trade, and Earn Rewards</li>
        </ul>
        { (meV2._id && isConnected) ?
          <FButton title={"Get Started"} postfix={<IconArrow />} className="w-100 f-mt-2" onClick={() => onGetStartedClick()} />
          :
          <MetaMaskConnector.WalletConnector
            WalletConnectView={FButton}
            WalletConnectModal={ConnectWalletDialog}
            isAuthenticationNeeded={true}
            WalletConnectViewProps={{ className: "w-100" }}
          />
        }
      </FCard>
    </FContainer>
  );
};

export default Introduction