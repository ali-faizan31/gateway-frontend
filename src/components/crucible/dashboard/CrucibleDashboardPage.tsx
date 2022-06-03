import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  FButton,
  FCard,
  // FCard,
  FContainer,
  FItem,
  // FGrid,
  // FGridItem,
  // FItem,
  FTypo,
} from "ferrum-design-system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CrucibleClient } from "../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "../../../container-components/web3Client/web3Helper";
import { RootState } from "../../../redux/rootReducer";
import Loader from "../../../assets/gif/Loading.gif"
// import { RootState } from "../../../redux/rootReducer";
import { CardAPR } from "../common/CardAPR";
import { CrucibleMyBalance } from "../common/CardMyBalance";
import { CruciblePrice } from "../common/CardPrice";
// import { useHistory, useLocation } from "react-router";
import * as CrucibleActions from "../redux/CrucibleActions";
import { crucibleSlice } from "../redux/CrucibleSlice";
import { cFRMTokenContractAddress, Pricing_Tokens, tokenFRMBSCMainnet } from "../../../utils/const.utils";
import { Crucible_Farm_Address_Details } from "../common/utils";
import { getAPRInformationForPublicUser } from "../../../_apis/APRCrud";
import { MetaMaskConnector } from "../../../container-components";
import { ConnectWalletDialog } from "../../../utils/connect-wallet/ConnectWalletDialog";
import { getCrucibleDetail } from "../common/Helper";
import { getErrorMessage, TruncateWithoutRounding } from "../../../utils/global.utils";
import { isTypeNode } from "typescript";

const CrucibleDashboardPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { networkClient, walletAddress, isConnected } = useSelector((state: RootState) => state.walletConnector);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);



  // useEffect(() => {
  //   if (userLpStakingDetails && userLpStakingDetails["cFRM-BNB"] && userLpStakingDetails["cFRM-BNB"].openCap) {
  //     setIsLoading(false);
  //   }
  // }, [userLpStakingDetails]);

  useEffect(() => {
    getAPRInformation();
    dispatch(CrucibleActions.resetCrucible());
  }, []);

  useEffect(() => {
    if (networkClient) {
      setIsLoading(true);
      dispatch(loadPricingInfo());
      Object.keys(Crucible_Farm_Address_Details).forEach((farm: string) => {
        getCrucibleDetail(Crucible_Farm_Address_Details[farm], networkClient, walletAddress, dispatch, setIsLoading)
      })
    }
  }, [networkClient]);

  const loadPricingInfo = createAsyncThunk("crucible/loadUserInfo", async () => {
    const actions = crucibleSlice.actions;
    const web3Helper = new Web3Helper(networkClient as any);
    const client = new CrucibleClient(web3Helper);

    for (let item of Pricing_Tokens) {
      const priceDetails = await web3Helper.getTokenPriceFromRouter(item.currency);
      let truncuateDecimal = 3;
      if (item.currency === tokenFRMBSCMainnet || item.currency === cFRMTokenContractAddress) {
        truncuateDecimal = 5;
      }
      if (!!priceDetails) {
        dispatch(
          actions.priceDataLoaded({
            data: {
              token: item.token,
              price: TruncateWithoutRounding((priceDetails), truncuateDecimal),
            },
          })
        );
      }
    }
  });

  const getAPRInformation = async () => {
    try {
      let aprResponse: any = await getAPRInformationForPublicUser();
      aprResponse = aprResponse.data && aprResponse.data.body && aprResponse.data.body.priceDetails;
      let updatedResponse: any = {};
      aprResponse.forEach((element: any) => {
        updatedResponse[element.tokenSymbol] = element
      });
      dispatch(CrucibleActions.updateAPRData(updatedResponse));
    } catch (e: any) {
      getErrorMessage(e, activeTranslation)
    }
  };

  return (
    <FContainer className="f-ml-0 crucible-dashboard">
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <img src={Loader} />
            {/* <ClipLoader color="#cba461" loading={true} size={150} /> */}
          </FItem>
        </FCard>
      ) : (
        <>

          {isConnected && tokenV2 ? (
            <>
              <CrucibleMyBalance />
              <FTypo className="page-title">Dashboard</FTypo>
              <CruciblePrice />
              <CardAPR />
            </>
          ) : (
            <>
              <FCard className="card-apr f-mt-2 f-mb-2 f-pb-2">
                <FTypo className="card-title f-pl-1">Connect your wallet to access Crucible Dashboard</FTypo>
                <MetaMaskConnector.WalletConnector
                  WalletConnectView={FButton}
                  WalletConnectModal={ConnectWalletDialog}
                  isAuthenticationNeeded={true}
                  WalletConnectViewProps={{ className: "w-100" }}
                />
              </FCard>
            </>)
          }
        </>
      )}
    </FContainer>
  );
};
export default CrucibleDashboardPage;
