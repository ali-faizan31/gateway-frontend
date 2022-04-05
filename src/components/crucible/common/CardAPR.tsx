import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import Datatable from "react-bs-datatable";
import { FButton, FCard, FInputText, FItem, FTable, FTypo, FDialog } from "ferrum-design-system";
import IconNetworkCFrmStr from "../../../assets/img/icon-network-cfrm.svg";
import IconNetworkCFrmxStr from "../../../assets/img/icon-network-cfrmx.svg";
import IconNetworkBNB from "../../../assets/img/icon-network-bnb.svg";
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
import { TruncateWithoutRounding } from "../../../utils/global.utils";

export const CardAPR = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { currentStep, currentStepIndex, stepFlowStepHistory, aprInformation, selectedCrucible, userCrucibleDetails, userLpStakingDetails } = useSelector(
    (state: RootState) => state.crucible
  );

  const { isConnected, networkClient } = useSelector((state: RootState) => state.walletConnector);

  console.log(selectedCrucible, userLpStakingDetails)

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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

  const getTotalDeposited = (farm: any) => {
    let leftCap = Number(selectedCrucible[farm!]?.openCap) - Number(selectedCrucible[farm!]?.leftFromCap);
    return `${leftCap} / 100`;
  };

  const getYourDeposited = (farm: any, lpAddress: any) => {
    let userStake = (userCrucibleDetails[farm!]?.stakes || []).find((e: any) => e.address.toLowerCase() === lpAddress);
    return farm?.includes("BNB") ? Number(userLpStakingDetails[farm!]?.stake || "0") : Number(userStake?.stakeOf || "0").toFixed(3);
  };

  const getYourRewards = (farm: any, lpAddress: any) => {
    let userStake = (userCrucibleDetails[farm!]?.stakes || []).find((e: any) => e.address.toLowerCase() === lpAddress);
    if (farm?.includes("BNB")) {
      return TruncateWithoutRounding(networkClient?.utils.fromWei(String(userLpStakingDetails[farm!]?.rewards[0]?.rewardAmount || 0), "ether"), 3);
    } else {
      return TruncateWithoutRounding(userStake?.rewardOf || 0, 3);
    }
  };

  
  const getRewardSymbol = (farm: any) => {
    return selectedCrucible[farm!]?.symbol;
  };

  const getDepositedSymbol = (farm: any) => {
    return farm?.includes("BNB") ? `APE-LP ${selectedCrucible[farm!]?.symbol}-BNB` : selectedCrucible[farm!]?.symbol
  }

  const stepFlowsMock = [
    {
      sustainableCrucibleFarms: "cFRM / BNB",
      internalName: "cFRM-BNB",
      stepFlowName: "cFRM / BNB Crucible Farm - Farming Dashboard Flow",
      totalDeposited: getTotalDeposited("cFRM-BNB"),
      yourDeposit: `${getYourDeposited("cFRM-BNB", "0xd87f304ca205fb104dc014696227742d20c8f10a")}`,
      yourRewards: `${getYourRewards("cFRM-BNB", "0xd87f304ca205fb104dc014696227742d20c8f10a")}`,
      logo: (
        <>
          <img src={IconNetworkCFrmStr} height="22px" width="22px" />
          <img src={IconNetworkBNB} height="22px" width="22px" />{" "}
        </>
      ),
      apr: aprInformation?.cfrmLp,
      network: "BSC",
      id: "6238314dd292da2db05524dd",
      contract: "0x5732a2a84ec469fc95ac32e12515fd337e143eed", // crucible contract address
      LpCurrency: "0x9528704e44feda5ea240363ee52731859683b1fb", // ape-lp token for crucible and bnb pair
      LPstakingAddress: "0xd87f304ca205fb104dc014696227742d20c8f10a", // lp farm where lp currency will be staked
    },
    {
      sustainableCrucibleFarms: "cFRM",
      stepFlowName: "cFRM Crucible Farm - Farming Dashboard Flow",
      totalDeposited: getTotalDeposited("cFRM"),
      yourDeposit: `${getYourDeposited("cFRM", "0xd87f304ca205fb104dc014696227742d20c8f10a")}`,
      yourRewards: `${getYourRewards("cFRM", "0xd87f304ca205fb104dc014696227742d20c8f10a")}`,
      apr: aprInformation?.cfrm,
      logo: (
        <>
          <img src={IconNetworkCFrmStr} height="22px" width="22px" />
        </>
      ),
      id: "6238386bd292da2db05524f9",
      contract: "0x5732a2a84ec469fc95ac32e12515fd337e143eed",
      LpCurrency: "0x5732a2a84ec469fc95ac32e12515fd337e143eed",
      LPstakingAddress: "0xd87f304ca205fb104dc014696227742d20c8f10a",
      network: "BSC",
      internalName: "cFRM",
    },
    {
      sustainableCrucibleFarms: "cFRMx / BNB",
      stepFlowName: "cFRMx / BNB Crucible Farm - Farming Dashboard Flow",
      totalDeposited: getTotalDeposited("cFRMx-BNB"),
      yourDeposit: getYourDeposited("cFRMx-BNB", "0xd87f304ca205fb104dc014696227742d20c8f10a"),
      yourRewards: getYourRewards("cFRMx-BNB", "0xd87f304ca205fb104dc014696227742d20c8f10a"),
      apr: aprInformation?.cfrmXLp,
      network: "BSC",
      logo: (
        <>
          <img src={IconNetworkCFrmxStr} height="22px" width="22px" />
          <img src={IconNetworkBNB} height="22px" width="22px" />{" "}
        </>
      ),
      id: "62383841d292da2db05524f3",
      contract: "0x422a9c44e52a2ea96422f0caf4a00e30b3e26a0d",
      LpCurrency: "0x84f624617bad7e349e194da0877120ee190e4730",
      LPstakingAddress: "0xd87f304ca205fb104dc014696227742d20c8f10a",
      internalName: "cFRMx-BNB",
    },
    {
      sustainableCrucibleFarms: "cFRMx",
      stepFlowName: "cFRMx Crucible Farm - Farming Dashboard Flow",
      totalDeposited: getTotalDeposited("cFRMx"),
      yourDeposit: getYourDeposited("cFRMx", "0xd87f304ca205fb104dc014696227742d20c8f10a"),
      yourRewards: getYourRewards("cFRMx", "0xd87f304ca205fb104dc014696227742d20c8f10a"),
      apr: aprInformation?.cfrmX,
      logo: (
        <>
          <img src={IconNetworkCFrmxStr} height="22px" width="22px" />{" "}
        </>
      ),
      id: "62383865d292da2db05524f6",
      contract: "0x422a9c44e52a2ea96422f0caf4a00e30b3e26a0d",
      LpCurrency: "0x422a9c44e52a2ea96422f0caf4a00e30b3e26a0d",
      LPstakingAddress: "0xd87f304ca205fb104dc014696227742d20c8f10a",
      network: "BSC",
      internalName: "cFRMx",
    },
  ];

  const body = stepFlowsMock.map((stepFlow, index) => {
    return {
      key: index,
      sustainableCrucibleFarms: (
        <FItem data-label="Sustainable Crucible Farms" className={"col-crucible-farming"} display={"flex"} alignY="center">
          <span className="network-icon-wrap f-mr-1">{stepFlow.logo}</span>
          {stepFlow.sustainableCrucibleFarms}
        </FItem>
      ),
      totalDeposited: <FTypo className={"col-amount"}>{stepFlow.totalDeposited}</FTypo>,
      yourDeposit: <FTypo className={"col-amount"}>{stepFlow.yourDeposit}</FTypo>,
      yourRewards: <FTypo className={"col-amount"}>{stepFlow.yourRewards}</FTypo>,
      apr: (
        <FTypo className={"col-amount"} size={24} color="#DAB46E" weight={500}>
          {" "}
          {stepFlow.apr}{" "}
        </FTypo>
      ),
      action: (
        <div className="col-action">
          {isConnected && tokenV2 ? (
            <>
              <FButton
                title={"Manage"}
                onClick={() =>
                  getStepToRender(stepFlow.id, stepFlow.stepFlowName, stepFlow.contract, stepFlow.network, stepFlow.LpCurrency, stepFlow.LPstakingAddress, stepFlow.internalName)
                }
              />
              <FButton
                title={"Deposit"}
                onClick={() =>
                  getStepToRender(stepFlow.id, stepFlow.stepFlowName, stepFlow.contract, stepFlow.network, stepFlow.LpCurrency, stepFlow.LPstakingAddress, stepFlow.internalName)
                }
              ></FButton>
            </>
          ) : (
            <MetaMaskConnector.WalletConnector
              WalletConnectView={FButton}
              WalletConnectModal={ConnectWalletDialog}
              isAuthenticationNeeded={true}
              WalletConnectViewProps={{ className: "w-100" }}
            />
          )}
        </div>
      ),
    };
  });

  const getStepToRender = async (id: any, stepFlowName: any, contract: string, network: string, LpCurrency?: string, LPstakingAddress?: string, farm?: any) => {
    if (isConnected && tokenV2) {
      setIsLoading(true);
      console.log("on manage click", currentStep, currentStepIndex, stepFlowStepHistory);
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
          <FItem display={"flex"} alignX="between" alignY={"center"} className="f-pb-1 f-m-0">
            <FTypo className="card-title f-pl-1">Crucible by Ferrum Network</FTypo>
            <FInputText type={"text"} placeholder="Search by Farm Name, Token Name, Token Contract Address" disabled />
          </FItem>
          <FTable>
            <Datatable tableBody={body} tableHeaders={tableHeads} rowsPerPage={10} />
          </FTable>
        </FCard>
      )}

      <FDialog show={showConnectDialog} size={"medium"} onHide={() => setShowConnectDialog(false)} title={"Connect to Metamask"} className="connect-wallet-dialog ">
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
