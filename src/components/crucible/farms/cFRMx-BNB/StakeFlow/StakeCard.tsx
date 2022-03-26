import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg"; 
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../../../redux/rootReducer";
import {ApprovableButtonWrapper} from './../../../../../container-components/web3Client/approvalButtonWrapper';
import { createAsyncThunk } from "@reduxjs/toolkit";
import {crucibleSlice} from "./../../../redux/CrucibleSlice";
import {CrucibleClient} from './../../../../../container-components/web3Client/crucibleClient';
import {Web3Helper} from './../../../../../container-components/web3Client/web3Helper';
import {CRUCIBLE_CONTRACTS_V_0_1} from './../../../common/utils';

export const Stake = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isProcessed,setIsProcessed ] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  //@ts-ignore
  const crucible =  useSelector((state)=> state.crucible.selectedCrucible)
  //@ts-ignore
  const tokenPrices =  useSelector((state)=> state.crucible.tokenPrices)
  const { isConnected, isConnecting, walletAddress, walletBalance, networkClient } = useSelector((state: RootState) => state.walletConnector);
  const dispatch = useDispatch()
  //@ts-ignore
  const LPStakingDetails =  useSelector((state)=> state.crucible.userLpStakingDetails)

  const onApproveClick = () => {
    setTransitionStatusDialog(true);
    setIsApproving(true);
  }

  useEffect(() => {
    console.log("approvedDone", approvedDone)
  }, [approvedDone])

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
      
      const response = await client.stakeLPToken(dispatch,currency,userAddress,stakingAddress,network,amount)
      if(response){
        setIsProcessing(false)
        //setIsSubmitted(true)
        setIsProcessed(true)
      }
      //setIsApproving(false);
      //setTransitionStatusDialog(true);
      
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
          <Link to="/dashboard/crucible/cFRMx-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
          Stake cFRMx / BNB LP Token
          </FTypo>
        </FItem>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              FRMx Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              ${tokenPrices['cFRM-BNB-LP']||0}
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              ${tokenPrices['cFRMx']||0}
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
              <span onClick={()=>setAmount(crucible?.LP_balance||0)}>Max</span> 
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
      You have {crucible?.LP_balance||0}  available in cFRMx / BNB LP
      </FTypo>
      <div className="btn-wrap f-mt-2">
        <ApprovableButtonWrapper
          View={
            (ownProps) =>
              <FButton 
                title={ownProps.isApprovalMode ? "Approve" : "Stake LP"} 
                className={"w-100"} 
                onClick={ownProps.isApprovalMode ?
                  () => ownProps.onApproveClick() :
                  () => onStakeClick(
                    LPStakingDetails['cFRMx_BNB_LP']?.stakeId,
                    (LPStakingDetails['cFRMx_BNB_LP']?.stakingAddress||''),
                    amount.toString(),
                    true,
                    crucible?.network,
                    walletAddress as string
                  )}
              ></FButton>
          }
          currency={`${crucible?.network}:${LPStakingDetails['cFRMx_BNB_LP']?.LPaddress}`}
          contractAddress={CRUCIBLE_CONTRACTS_V_0_1['BSC'].router}
          userAddress={walletAddress as string}
          amount={'0.0001'}
        />  
      </div>
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
