import React, { useEffect, useState } from "react";
import { FButton, FCard, FContainer, FGrid, FGridItem, FItem, FResponseBar, FTypo } from "ferrum-design-system"; 
import { CrucibleManage } from "../common/CardManage";
import { CrucibleMyBalance } from "../../../common/CardMyBalance"; 
import { PATH_DASHBOARD } from "../../../../../routes/paths"; 
import { useWeb3React } from "@web3-react/core";
import {CrucibleClient} from './../../../../../container-components/web3Client/crucibleClient';
import {Web3Helper} from './../../../../../container-components/web3Client/web3Helper';
import Web3 from "web3";
import { useHistory, useLocation } from "react-router"; 
import { useDispatch, useSelector } from 'react-redux';
import {crucibleSlice} from "./../../../redux/CrucibleSlice";
import { BigUtils } from './../../../../../container-components/web3Client/types';
import { RootState } from "../../../../../redux/rootReducer";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const Manage = () => {
  const history = useHistory()
  const [dashboardAction, setDashboardAction] = useState(false);
  const [unwrap, setUnwrap] = useState(false);
  const [flowType, setFlowType] = useState("");
  const location: any = useLocation();
  const { active, activate, deactivate, library, account, chainId, error } =  useWeb3React();
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //@ts-ignore
  const crucible =  useSelector((state)=> state.crucible.selectedCrucible)
  const { isConnected, isConnecting, walletAddress, walletBalance, networkClient } = useSelector((state: RootState) => state.walletConnector);
  //@ts-ignore
  const userCrucibleData =  useSelector((state)=> state.crucible.userCrucibleDetails)
  let userStake = (userCrucibleData.stakes||[]).find((e:any)=>e.address === "0xAb0433AA0b5e05f1FF0FD293CFf8bEe15882cCAd")
  console.log(userStake)

  const onUnStakeClick = () => {
    history.push({pathname: PATH_DASHBOARD.crucible.cFRM_BNB.unstake.unstake})
  }

  const onStakeClick = () => {
    history.push({pathname: PATH_DASHBOARD.crucible.cFRM_BNB.stake.stake})
  }

  const onClaimRewardsClick = () => {
    history.push({pathname: PATH_DASHBOARD.crucible.cFRM_BNB.withdraw.withdraw})
  }

  const onAddLiquidityClick = () => {
    history.push({pathname: PATH_DASHBOARD.crucible.cFRM_BNB.liquidity})
  }

  const loadCrucibleUserInfo = createAsyncThunk('crucible/loadUserInfo',
    async (payload: { crucibleCurrency: string }, ctx) => {
      const actions = crucibleSlice.actions;
      const web3Helper =  new Web3Helper(networkClient as any)
      const client = new CrucibleClient(web3Helper)
      const userCrucibleDetails = await client.getUserCrucibleInfo(ctx.dispatch, payload.crucibleCurrency,walletAddress as string);
      if(!!userCrucibleDetails){
        dispatch(actions.userCrucibleDetailsLoaded({data: userCrucibleDetails.data }))
      }
  });

  useEffect(() => { 
    if (location.state.id === undefined) {
      history.push(PATH_DASHBOARD.crucible.index)
    }
  }, [location])

  useEffect(() => {
    if(networkClient && location.state.network && location.state.contract ){
      //@ts-ignore
      getCrucibleDetail()
    }
  }, [active, library, networkClient]);

  const getCrucibleDetail = async () =>{
    setIsLoading(true)
    const web3Helper =  new Web3Helper(networkClient as any)
    const client = new CrucibleClient(web3Helper)
    const actions = crucibleSlice.actions;
    dispatch(loadCrucibleUserInfo({crucibleCurrency:`${location.state.network.toUpperCase()}:${(location.state.contract || '').toLowerCase()}`}))
    const crucibleData = await client.getCrucibleDetails(dispatch,location.state.network,location.state.contract,walletAddress as string)
    dispatch(actions.selectedCrucible({data: crucibleData.data }))
    if(crucibleData.data){
      setIsLoading(false)
    }
  }
  
  return (
    <FContainer className="f-mr-0 card-manage" width={900}> 
      {
        isLoading ?
          <>
            Loading...
          </>
        :
          <>
            <CrucibleMyBalance />
            {/* <FResponseBar variant="success" title={"Withdraw Transaction Successful. [ 0x06167934...5bvf645949c ]"} /> */}
            <CrucibleManage dashboardAction={dashboardAction} setDashboardAction={setDashboardAction} setFlowType={setFlowType}/> 
            <FCard className="card-crucible-token-info" width={"95%"}>
              <FTypo size={24}>Crucible Token Info</FTypo>
              <FGrid className="btn-wrap">
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                      {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate|| '0').times(100).toString()}%`}
                    </FTypo>
                    <FTypo size={20}>Transfer Fee</FTypo>
                  </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                      {`${BigUtils.safeParse(crucible?.feeOnWithdrawRate|| '0').times(100).toString()}%`}
                    </FTypo>
                    <FTypo size={20}>Unwrap Fee</FTypo>
                  </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FItem align={"center"}>
                    <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                      {crucible?.symbol}
                    </FTypo>
                    <FTypo size={20}>Crucible Token</FTypo>
                  </FItem>
                </FGridItem>
              </FGrid>
              <FCard className={"styled-card align-v your-crucible"}>
                <FGrid>
                  <FGridItem size={[6, 6, 6]}>
                    <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
                    <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"}>
                      {Number(userStake?.stakeOf||'0').toFixed(3)}
                      <FTypo size={14} weight={300} className={"f-pl--7 f-pb--1"}>
                        APE-LP cFRM-BNB
                      </FTypo>
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[6, 6, 6]}>
                    <FItem align="right">
                      <FTypo color="#DAB46E" size={50} weight={600} align={"end"} display="flex" alignY={"end"}>
                        <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
                          APR
                        </FTypo>
                        192%
                      </FTypo>
                    </FItem>
                  </FGridItem>
                </FGrid>
              </FCard>
              <FCard className={"your-claimed-rewards"}>
                <FGrid>
                  <FGridItem size={[8, 8, 6]}>
                    <FTypo className="f-pb--2">Your unclaimed Rewards</FTypo>
                    <FTypo size={24} weight={500}>
                     {Number(userStake?.rewardOf||'0').toFixed(3)} cFRM
                    </FTypo>
                  </FGridItem>
                  <FGridItem size={[4, 4, 6]} alignX="center" alignY={"end"}>
                    <FButton title={"Claim"} onClick={()=>onClaimRewardsClick()}></FButton>
                  </FGridItem>
                </FGrid>
              </FCard>
            </FCard>
            <FContainer width={850}> 
              <FGrid className="btn-wrap f-mt-2 f-mb-2">
                <FGridItem size={[4, 4, 4]}>
                  <FButton title={"Stake"} className={"w-100"} onClick={()=>onStakeClick()}></FButton>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FButton variant={"secondary"} title={"Unstake"} outlined className={"w-100"} onClick={()=>onUnStakeClick()}></FButton>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                  <FButton variant={"secondary"} title={"Add Liquidity"} outlined className={"w-100"} onClick={()=>onAddLiquidityClick()}></FButton>
                </FGridItem>
              </FGrid>
            </FContainer> 
          </>
      }
      
    </FContainer>
  );
}; 
