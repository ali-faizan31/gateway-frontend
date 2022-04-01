import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  // FCard,
  FContainer,
  // FGrid,
  // FGridItem,
  // FItem,
  FTypo,
} from "ferrum-design-system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CrucibleClient } from "../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "../../../container-components/web3Client/web3Helper";
import { RootState } from "../../../redux/rootReducer";
// import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../common/CardAPR";
import { CrucibleMyBalance } from "../common/CardMyBalance";
import { CruciblePrice } from "../common/CardPrice";
// import { useHistory, useLocation } from "react-router";
import * as CrucibleActions from "../redux/CrucibleActions";
import { crucibleSlice } from "../redux/CrucibleSlice";
import { CBTTokenContractAddress, CBTxTokenContractAddress, APELPCFRMBNBTokenContractAddress, APELPCFRMxBNBTokenContractAddress, tokenFRMBSCMainnet, tokenFRMxBSCMainnet } from "../../../utils/const.utils";
import { getCABNInformation, getTokenInformationFromWeb3 } from "../../../utils/global.utils";
import { getAPRInformationForPublicUser } from "../../../_apis/APRCrud";




const CrucibleDashboardPage = () => {
  const dispatch = useDispatch();
  const { networkClient, walletAddress } = useSelector(
    (state: RootState) => state.walletConnector
  );

  useEffect(() => {
    if (networkClient) {
      dispatch(loadPricingInfo({}))
      loadTokenData(networkClient)
    }
    getAPRInformation();
    dispatch(CrucibleActions.resetCrucible());
    // eslint-disable-next-line
  }, [networkClient]);

  const loadTokenData = async (networkClient: any) => {
    const tokens = [
      {
        token: "cBT",
        currency: CBTTokenContractAddress,
      },
      {
        token: "cBTx",
        currency: CBTxTokenContractAddress,
      },
      {
        token: "APELPCFRMBNB",
        currency: APELPCFRMBNBTokenContractAddress,
      },
      {
        token: "APELPCFRMxBNB",
        currency: APELPCFRMxBNBTokenContractAddress,
      },
      {
        token: "FRMBSC",
        currency: tokenFRMBSCMainnet
      },
      {
        token: "FRMxBSC",
        currency: tokenFRMxBSCMainnet
      }
    ];

    for (let item of tokens) {
      const tokenDetails = await getTokenInformationFromWeb3(networkClient, walletAddress, item.currency)
      const cabnDetails = await getCABNInformation(item.currency);
      let finalData = { ...tokenDetails, ...cabnDetails };
      if (!!finalData) {
        dispatch(
          CrucibleActions.updateTokenData({
            token: item.token,
            ...finalData,

          })
        );
      }
    }
  }

  const loadPricingInfo = createAsyncThunk(
    "crucible/loadUserInfo",
    async (payload: {}, ctx) => {
      const actions = crucibleSlice.actions;
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);
      const tokens = [
        {
          token: "FRM",
          currency: "0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc", // done
        },
        {
          token: "FRMx",
          currency: "0x8523518001ad5d24b2a04e8729743c0643a316c0", // done
        },
        {
          token: "cFRM-BNB",
          currency: "0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc",
        },
        {
          token: "cFRMx-BNB",
          currency: "0x8523518001ad5d24b2A04e8729743C0643A316c0",
        },
        {
          token: "cFRM",
          currency: "0x5732a2a84ec469fc95ac32e12515fd337e143eed", // done  // change before prod
        },
        {
          token: "cFRMx",
          currency: "0x422a9c44e52a2ea96422f0caf4a00e30b3e26a0d",
        },
      ];

      for (let item of tokens) {
        const priceDetails = await web3Helper.getTokenPriceFromRouter(item.currency)
        console.log(priceDetails);
        // (await client.getPairPrice(
        //   ctx.dispatch,
        //   item.currency,
        //   item.currency,
        //   walletAddress as string
        // )) as any;
        if (!!priceDetails) {
          dispatch(
            actions.priceDataLoaded({
              data: {
                token: item.token,
                price: Number(priceDetails).toFixed(3),
              },
            })
          );
          console.log(priceDetails);
        }
      }
    }
  );

  const getAPRInformation = async () => {
    let aprResponse: any = await getAPRInformationForPublicUser();
    aprResponse = aprResponse.data && aprResponse.data.body && aprResponse.data.body.crucibleApr;
    console.log(aprResponse)
    dispatch(
      CrucibleActions.updateAPRData(aprResponse)
    );
  }

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

