import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Datatable from "react-bs-datatable";
import {
  FButton,
  FCard,
  FInputText,
  FItem,
  FTable,
  FTypo,
  FDialog
} from "ferrum-design-system";
import { ReactComponent as IconNetworkcFRM } from "../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../assets/img/icon-network-bnb.svg";
import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../redux/rootReducer";
// import { PATH_DASHBOARD } from "../../../routes/paths";
import * as SFSH_API from "../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../redux/CrucibleActions";
import { getLatestStepToRender, renderComponent } from "./Helper";
import { ClipLoader } from "react-spinners";
import { RootState } from "../../../redux/rootReducer";
import { MetaMaskConnector } from "../../../container-components";
import { ConnectWalletDialog } from "../../../utils/connect-wallet/ConnectWalletDialog";

export const CardAPR = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const { tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );
  const { currentStep, currentStepIndex, stepFlowStepHistory } = useSelector(
    (state: RootState) => state.crucible
  );

  // const [isSet, setIsSet] = useState(false);
  const { isConnected } = useSelector(
    (state: RootState) => state.walletConnector
  );

  useEffect(() => {
    if (tokenV2){
      setShowConnectDialog(false);
    }
  }, [tokenV2])
  

  const tableHeads: any[] = [
    {
      width: 200,
      prop: "sustainableCrucibleFarms",
      title: "Sustainable Crucible Farms",
    },
    { prop: "totalDeposited", title: "Total Deposited" },
    { prop: "yourDeposit", title: "Your Deposit" },
    { prop: "yourRewards", title: "Your Rewards" },
    {
      prop: "apr",
      title: (
        <FTypo color="#DAB46E" align={"center"}>
          APR
        </FTypo>
      ),
    },
    { prop: "action", title: <></> },
  ];

  const stepFlowsMock = [
    {
      sustainableCrucibleFarms: "cFRM / BNB",
      stepFlowName: "cFRM / BNB Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.1",
      apr: "10%",
      network: "BSC",
      id: "6238314dd292da2db05524dd",
      contract: "0x1a59bf30d6dc8e8363c90a14c142dcb85825c5a7", // crucible contract address
      LpCurrency: "0x1a59bf30d6dc8e8363c90a14c142dcb85825c5a7",  // ape-lp token for crucible and bnb pair
      LPstakingAddress: "0xeab8290c54b6307016a736ff2191bf2aaef3b697", // lp farm where lp currency will be staked
      internalName: "cFRM-BNB",
    },
    {
      sustainableCrucibleFarms: "cFRM",
      stepFlowName: "cFRM Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.2",
      apr: "20%",
      id: "6238386bd292da2db05524f9",
      contract: "0x1a59bf30d6dc8e8363c90a14c142dcb85825c5a7",
      LpCurrency: "0x1a59bf30d6dc8e8363c90a14c142dcb85825c5a7",
      LPstakingAddress: "0xab0433aa0b5e05f1ff0fd293cff8bee15882ccad",
      network: "BSC",
      internalName: "cFRM",
    },
    {
      sustainableCrucibleFarms: "cFRMx / BNB",
      stepFlowName: "cFRMx / BNB Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.3",
      apr: "20%",
      network: "BSC",
      id: "62383841d292da2db05524f3",
      contract: "0x176e6504bfa5edf24d3a2665cc766f16959c2633",
      LpCurrency: "0x176e6504bfa5edf24d3a2665cc766f16959c2633",
      LPstakingAddress: "0xeab8290c54b6307016a736ff2191bf2aaef3b697",
      internalName: "cFRMx-BNB",
    },
    {
      sustainableCrucibleFarms: "cFRMx",
      stepFlowName: "cFRMx Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.4",
      apr: "40%",
      id: "62383865d292da2db05524f6",
      contract: "0x176e6504bfa5edf24d3a2665cc766f16959c2633",
      LpCurrency: "0x176e6504bfa5edf24d3a2665cc766f16959c2633",
      LPstakingAddress: "0xab0433aa0b5e05f1ff0fd293cff8bee15882ccad",
      network: "BSC",
      internalName: "cFRMx",
    },
  ];

  const body = stepFlowsMock.map((stepFlow, index) => {
    return {
      key: index,
      sustainableCrucibleFarms: (
        <FItem
          data-label="Sustainable Crucible Farms"
          className={"col-crucible-farming"}
          display={"flex"}
          alignY="center"
        >
          <span className="network-icon-wrap f-mr-1">
            <IconNetworkcFRM />
            <IconNetworkBsc />
          </span>
          {stepFlow.sustainableCrucibleFarms}
        </FItem>
      ),
      totalDeposited: (
        <FTypo className={"col-amount"}>{stepFlow.totalDeposited}</FTypo>
      ),
      yourDeposit: (
        <FTypo className={"col-amount"}>{stepFlow.yourDeposit}</FTypo>
      ),
      yourRewards: (
        <FTypo className={"col-amount"}>{stepFlow.yourRewards}</FTypo>
      ),
      apr: (
        <FTypo className={"col-amount"} size={24} color="#DAB46E" weight={500}>
          {" "}
          {stepFlow.apr}{" "}
        </FTypo>
      ),
      action: (
        <div className="col-action">
          <FButton
            title={"Manage"}
            onClick={() =>
              getStepToRender(
                stepFlow.id,
                stepFlow.stepFlowName,
                stepFlow.contract,
                stepFlow.network,
                stepFlow.LpCurrency,
                stepFlow.LPstakingAddress,
                stepFlow.internalName
              )
            }
          />
          <FButton
            title={"Deposit"}
            onClick={() =>
              getStepToRender(
                stepFlow.id,
                stepFlow.stepFlowName,
                stepFlow.contract,
                stepFlow.network,
                stepFlow.LpCurrency,
                stepFlow.LPstakingAddress,
                stepFlow.internalName
              )
            }
          ></FButton>
        </div>
      ),
    };
  });



  
  const getStepToRender = async (
    id: any,
    stepFlowName: any,
    contract: string,
    network: string,
    LpCurrency?: string,
    LPstakingAddress?: string,
    farm?: any
  ) => {
    if (isConnected && tokenV2) {
      setIsLoading(true);
      console.log('on manage click', currentStep, currentStepIndex, stepFlowStepHistory,)
      getLatestStepToRender(
        { id, stepFlowName, contract, network, LpCurrency, LPstakingAddress },
        tokenV2,
        currentStep,
        currentStepIndex,
        stepFlowStepHistory,
        dispatch,
        history,
        farm,
        setIsLoading
      );
    } else {
      setShowConnectDialog(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </FCard>
      ) : (
        <FCard className="card-apr f-mt-2">
          <FItem
            display={"flex"}
            alignX="between"
            alignY={"center"}
            className="f-pb-1 f-m-0"
          >
            <FTypo className="card-title f-pl-1">APR</FTypo>
            <FInputText
              type={"text"}
              placeholder="Search by Farm Name, Token Name, Token Contract Address"
            />
          </FItem>
          <FTable>
            <Datatable
              tableBody={body}
              tableHeaders={tableHeads}
              rowsPerPage={10}
            />
          </FTable>
        </FCard>
      )}

      <FDialog
        show={showConnectDialog}
        size={"medium"}
        onHide={() => setShowConnectDialog(false)}
        title={"Connect to Metamask"}
        className="connect-wallet-dialog "
      >
        <MetaMaskConnector.WalletConnector
          WalletConnectView={FButton}
          WalletConnectModal={ConnectWalletDialog}
          isAuthenticationNeeded={true}
          WalletConnectViewProps={{ className: "w-100" }}
        />
      </FDialog>
    </>
  );
};
