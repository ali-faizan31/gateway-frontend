import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../common/CardAPR";
import { CrucibleMyBalance } from "../common/CardMyBalance";
import { CruciblePrice } from "../common/CardPrice"; 
import { useHistory, useLocation } from "react-router"; 
import {crucibleSlice} from "./../redux/CrucibleSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {CrucibleClient} from './../../../container-components/web3Client/crucibleClient';
import {Web3Helper} from './../../../container-components/web3Client/web3Helper';

const CrucibleDashboardPage = () => {
  const { isConnected,networkClient,walletAddress } = useSelector((state: RootState) => state.walletConnector); 
  const dispatch = useDispatch()

  const loadPricingInfo = createAsyncThunk('crucible/loadUserInfo',
    async (payload: { crucible: any }, ctx) => {
      const actions = crucibleSlice.actions;
      const web3Helper =  new Web3Helper(networkClient as any)
      const client = new CrucibleClient(web3Helper)
      const tokens = [
        {
          "token": "FRMX",
          "currency": "BSC:0x8523518001ad5d24b2A04e8729743C0643A316c0"
        },
        {
          "token": "FRM",
          "currency": "BSC:0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc"
        },
        {
          "token": "cFRM-BNB-LP",
          "currency": "BSC:0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc"
        },
        {
          "token": "cFRM",
          "currency": "BSC:0x8523518001ad5d24b2A04e8729743C0643A316c0"
        },
      ]
      
      for (let item of tokens){
        const priceDetails = await client.getPairPrice(ctx.dispatch,  item.currency, item.currency, walletAddress as string) as any
        if(!!priceDetails){
          dispatch(actions.priceDataLoaded({data: {"token" : item.token ,"price" : Number(priceDetails.basePrice.usdtPrice).toFixed(3) }}))
          console.log(priceDetails)
        }
      }
    }
  )

  useEffect(() => { 
    dispatch(loadPricingInfo({crucible: {}}))
  })

  return (
    <FContainer className="f-ml-0">
      <CrucibleMyBalance />
      <FTypo className="page-title">Dashboard</FTypo>
      <CruciblePrice />
      <CardAPR />
    </FContainer>
  );
};
export default CrucibleDashboardPage;
