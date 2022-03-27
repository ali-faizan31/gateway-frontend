import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
import Datatable from "react-bs-datatable";
import {
  FButton,
  FCard,
  FInputText,
  FItem,
  FTable,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconNetworkcFRM } from "../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../assets/img/icon-network-bnb.svg";
import { useDispatch } from "react-redux";
// import { RootState } from "../../../redux/rootReducer";
// import { PATH_DASHBOARD } from "../../../routes/paths";
import { getStepFlowStepByStepFlowIdForPublic } from "../../../_apis/StepFlowStepCrud";
import * as CrucibleActions from "../redux/CrucibleActions";
import { renderComponent } from "./Helper";
import { ClipLoader } from "react-spinners";

export const CardAPR = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const [isSet, setIsSet] = useState(false);
  // const { isConnected, isConnecting } = useSelector(
  //   (state: RootState) => state.walletConnector
  // );

  const { farm } = useParams<{ farm?: string }>();

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
      id: "6238314dd292da2db05524dd",
      contract: "0x5e767cadbd95e7b9f777ddd9e65eab1c29c487e6",
      network: "BSC",
      LpCurrency: "0xe8606F8F4e8D2D1fBbB0086775Fb0b3456423224",
      LPstakingAddress: "0xAb0433AA0b5e05f1FF0FD293CFf8bEe15882cCAd",
    },
    {
      sustainableCrucibleFarms: "cFRM",
      stepFlowName: "cFRM Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.2",
      apr: "20%",
      id: "6238386bd292da2db05524f9",
      contract: "0x5D8df66ea3e5c3C30A1dB4aFC6F17A917B201118",
      network: "BSC",
    },
    {
      sustainableCrucibleFarms: "cFRMx / BNB",
      stepFlowName: "cFRMx / BNB Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.3",
      apr: "20%",
      id: "62383841d292da2db05524f3",
      contract: "0x5D8df66ea3e5c3C30A1dB4aFC6F17A917B201118",
      network: "BSC",
      LpCurrency: "0xe8606F8F4e8D2D1fBbB0086775Fb0b3456423224",
      LPstakingAddress: "0xAb0433AA0b5e05f1FF0FD293CFf8bEe15882cCAd",
    },
    {
      sustainableCrucibleFarms: "cFRMx",
      stepFlowName: "cFRMx Crucible Farm - Farming Dashboard Flow",
      totalDeposited: "127",
      yourDeposit: "$13",
      yourRewards: "$.4",
      apr: "40%",
      id: "62383865d292da2db05524f6",
      contract: "0x5D8df66ea3e5c3C30A1dB4aFC6F17A917B201118",
      network: "BSC",
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
                stepFlow.LPstakingAddress
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
                stepFlow.LPstakingAddress
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
    LPstakingAddress?: string
  ) => {
    // history.push({pathname: PATH_DASHBOARD.crucible.deployer, state: {id, name,contract,network}})
    setIsLoading(true);
    let stepResponse = await getStepFlowStepByStepFlowIdForPublic(id);
    dispatch(
      CrucibleActions.updateStepFlowStepHistory({
        stepFlowStepHistory: stepResponse.data.body.stepsFlowStep,
      })
    );
    let stepFlowStep = stepResponse.data.body.stepsFlowStep[0];
    dispatch(
      CrucibleActions.updateCurrentStep({
        currentStep: stepFlowStep,
        currentStepIndex: 0,
      })
    );
    // let stepFlowName = stepFlowStep.name.split("-");
    //  stepFlowName = (splitted[0].trim() + " - " + splitted[1].trim());
    renderComponent(
      stepFlowStep.step.name,
      { id, stepFlowName, contract, network, LpCurrency, LPstakingAddress },
      history,
      farm
    );
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <ClipLoader color="#cba461" loading={true} size={150} />
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
    </>
  );
};
