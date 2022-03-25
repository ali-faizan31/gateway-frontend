import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import { useDispatch, useSelector } from 'react-redux';
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg"; 
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { Web3Helper } from './../../../../../container-components/web3Client/web3Helper';
import { CrucibleClient } from './../../../../../container-components/web3Client/crucibleClient';
import {ApprovableButtonWrapper} from './../../../../../container-components/web3Client/approvalButtonWrapper';
import { useHistory, useLocation } from "react-router"; 
import { useWeb3React } from "@web3-react/core";
import {CRUCIBLE_CONTRACTS_V_0_1} from './../../../common/utils';
import { RootState } from "../../../../../redux/rootReducer";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import { getLatestStepToRender } from "../../../common/Helper";

export const CrucibleDeposit = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const { active, activate, deactivate, library, account, chainId, error } =  useWeb3React();
  const [mintAmount,setMintAmount] = useState(0)
  const dispatch = useDispatch()
  const location: any = useLocation();
  const history = useHistory();
  //@ts-ignore
  const crucible =  useSelector((state)=> state.crucible.selectedCrucible)
  //@ts-ignore
  const userCrucibleData =  useSelector((state)=> state.crucible.userCrucibleDetails)

  const { isConnected, isConnecting, walletAddress, walletBalance, networkClient } = useSelector((state: RootState) => state.walletConnector);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);

  useEffect(() => { 
    console.log(location,crucible)
  }, [location])

  const [approvedDone, setapprovedDone] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessed,setIsProcessed ] = useState(false);


  const onApproveClick = () => {
    setTransitionStatusDialog(true);
    setIsApproving(true);
  }

useEffect(() => {
  // console.log("approvedDone", ownProps.isApprovalMode)
}, [approvedDone])
 
  const onPropChange = async (props: any) => { 
    try { 
      let status = props.isApprovalMode ? "pending" : "completed";
      console.log(status, currentStep, stepFlowStepHistory)
      // let updatedCurrentStep = { ...currentStep, status : status};
      // let updHistory = stepFlowStepHistory.map((obj, index) => 
      // index === currentStepIndex ? { ...obj, status : status } : obj ); 
      // let data = { status: status }
      
      // dispatch(CrucibleActions.updateCurrentStep({ currentStep : updatedCurrentStep, currentStepIndex: currentStepIndex }));
      // dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: updHistory })); 
      // let updateResponse: any = await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      // updateResponse.length && getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history); 

    } catch (e:any) {
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`); 
    }
  }

  const onMintClick = async (
    currency: string,
		crucibleAddress: string,
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
      
      const response = await client.mintCrucible(dispatch,currency,crucibleAddress,amount,isPublic,network,userAddress)
      if(response){
        setIsProcessing(false)
        //setIsSubmitted(true)
        setIsProcessed(true)
      }
      //setIsApproving(false);
      //setTransitionStatusDialog(true);
      
    }
  }

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRM-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
            Deposit and Mint Crucible Token
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
        placeholder="0"
        value={mintAmount}
        onChange={(e:any)=>setMintAmount(e.target.value)}
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
           <span onClick={()=>setMintAmount(Number(userCrucibleData?.baseBalance||'0'))}>Max</span> 
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have {Number(userCrucibleData?.baseBalance||'0').toFixed(3)} available in Token Base {userCrucibleData?.baseSymbol}.
      </FTypo>
      <FTypo size={15} className={"f-mt-2 f-pl--5"}>
        Amount you will receive
      </FTypo>
      <FInputText
        className={"f-mt-1"}
        inputSize="input-lg"
        type={"text"}
        placeholder="0"
        disabled={true}
        value={mintAmount}
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1 f-mt-1"}>
            <span onClick={()=>setMintAmount(userCrucibleData?.baseBalance)}>cFRM</span>
          </FTypo>
        }
      />
      {  
        <ApprovableButtonWrapper
            View={(ownProps) => {
              onPropChange(ownProps);
            return <div className="btn-wrap f-mt-2">
                <FButton 
                  title={ownProps.isApprovalMode ? "Approve" : "Mint"}
                  className={"w-100"} 
                  onClick={ownProps.isApprovalMode ? 
                    () => ownProps.onApproveClick() :
                    () => onMintClick(
                      crucible!.baseCurrency,
                      crucible?.currency||'',
                      mintAmount.toString(),
                      true,
                      crucible?.network,
                      walletAddress as string
                    )
                  }></FButton>
              </div>}
            }
            
            currency={crucible!.baseCurrency}
            contractAddress={CRUCIBLE_CONTRACTS_V_0_1['BSC'].router}
            userAddress={walletAddress as string}
            amount={'0.0001'}
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
       />
    </FCard>
  );
};
