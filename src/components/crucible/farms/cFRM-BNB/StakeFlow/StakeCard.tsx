import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg"; 
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import {ApprovableButtonWrapper, approvalKey} from './../../../../../container-components/web3Client/approvalButtonWrapper';
import { useHistory, useLocation } from "react-router"; 
import {CFRM_BNB_STEP_FLOW_IDS, CRUCIBLE_CONTRACTS_V_0_1} from './../../../common/utils';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../../../redux/rootReducer";
import { Web3Helper } from './../../../../../container-components/web3Client/web3Helper';
import { CrucibleClient } from './../../../../../container-components/web3Client/crucibleClient';
import { getLatestStepToRender, getNextStepFlowStepId } from "../../../common/Helper"; 
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import { MetaMaskConnector } from "../../../../../container-components";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";

export const Stake = () => {
  const dispatch = useDispatch()
  const location: any = useLocation(); 
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const history = useHistory();
  const [isProcessed,setIsProcessed ] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //@ts-ignore
  const crucible =  useSelector((state)=> state.crucible.selectedCrucible)
  const { isConnected, isConnecting, walletAddress, walletBalance, networkClient } = useSelector((state: RootState) => state.walletConnector);
  //@ts-ignore
  const userCrucibleData =  useSelector((state)=> state.crucible.userCrucibleDetails)
  const { stepFlowStepHistory, currentStep, currentStepIndex, } = useSelector((state: RootState) => state.crucible);
 const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
 const { approveTransactionId, approvals } = useSelector((state: RootState) => state.approval);

  const onApproveClick = () => {
    setTransitionStatusDialog(true);
    setIsApproving(true);
  }
  
  useEffect(() => { 
    console.log('appr val',  (approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1['BSC'].router, crucible?.baseCurrency)]))
    if (Number(approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1['BSC'].router, crucible?.baseCurrency)]) > 0){
     if (currentStep.step.name === "Approve"){
       console.log('aprval done')
       getStepCompleted(false);
     }
   }
 }, [approvals])

  const getStepCompleted = async ( renderNeeded: any) => { 
    try {
      let updatedCurrentStep = { ...currentStep, status: "completed" };
      let updHistory = stepFlowStepHistory.map((obj, index) => index === currentStepIndex ? { ...obj, status: "completed" } : obj);
      let data = { status: "completed" };

      dispatch(CrucibleActions.updateCurrentStep({ currentStep: updatedCurrentStep, currentStepIndex: currentStepIndex }));
      dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: updHistory }));

      let updateResponse: any = await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, renderNeeded);
    } catch (e: any) {
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`);
    }
  }

  const onStakeClick = async (
    currency: string,
		stakingAddress: string,
		amount: string,
    isPublic: boolean,
    network: string,
    userAddress:string
  ) => {
    if(networkClient){

      setTransitionStatusDialog(true)
      setIsProcessing(true)
      const web3Helper =  new Web3Helper(networkClient as any)
      const client = new CrucibleClient(web3Helper)
      
      const response = await client.StakeCrucible(dispatch,currency,amount,stakingAddress,userAddress,network)
      if(response){
        setIsProcessing(false)
        //setIsSubmitted(true)
        setIsProcessed(true)
        getStepCompleted(false);
      }
      //setIsApproving(false);
      //setTransitionStatusDialog(true);
      
    }
  }

  const onContinueToNextStepClick = () => { 
    console.log(currentStep)
    if ( currentStep.status === "pending"){
      location.state.id = currentStep.step._id;
      let splitted = currentStep.stepFlowStep.name.split("-");
      location.state.name = (splitted[0].trim() + " - " + splitted[1].trim());
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history);
    }
  }

  // const onStakeClick = () => {
  //   setIsProcessing(true);
  //   setIsApproving(false);
  //   setTransitionStatusDialog(true);
  // }

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRM-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
          Stake cFRM / BNB LP Token
          </FTypo>
        </FItem>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              FRM Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRM Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FInputText
        className={"f-mt-1"}
        inputSize="input-lg"
        type={"text"}
        value={amount}
        onChange={(e:any)=>setAmount(e.target.value)}
        placeholder="Amount to Stake"
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
            <span onClick={()=>setAmount(Number(userCrucibleData?.balance||'0'))}>Max</span> 
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have {userCrucibleData?.balance||'0'} available in Token {userCrucibleData?.symbol} to Stake.
      </FTypo>
      {(meV2._id && isConnected) ?
        <ApprovableButtonWrapper
          View={
            (ownProps) => <div className="btn-wrap f-mt-2">
              <FButton 
                title={ownProps.isApprovalMode ? "Approve" : "Stake Crucible"} 
                className={"w-100"} 
                onClick={ownProps.isApprovalMode ?
                  () => ownProps.onApproveClick() :
                  () => onStakeClick(
                    crucible!.currency,
                    (crucible?.staking||[])[0]?.address||'',
                    amount.toString(),
                    true,
                    crucible?.network,
                    walletAddress as string
                  )}
              ></FButton>
               </div>
          }
          currency={crucible!.currency}
          contractAddress={CRUCIBLE_CONTRACTS_V_0_1['BSC'].router}
          userAddress={walletAddress as string}
          amount={'0.0001'}
        />  
         :
        <MetaMaskConnector.WalletConnector
          WalletConnectView={FButton}
          WalletConnectModal={ConnectWalletDialog}
          isAuthenticationNeeded={true}
          WalletConnectViewProps={{ className: "btn-wrap f-mt-2 w-100" }}
        />
      }
     
      <DialogTransitionStatus 
       transitionStatusDialog={transitionStatusDialog} 
       setTransitionStatusDialog={setTransitionStatusDialog} 
        isProcessing = {isProcessing}
        setIsProcessing = {setIsProcessing}
        setapprovedDone = {setapprovedDone}
        isSubmitted={isSubmitted}
        isProcessed={isProcessed}
        crucible={crucible}
        onContinueToNextStepClick={()=>onContinueToNextStepClick()}
       />
    </FCard>
  );
};
