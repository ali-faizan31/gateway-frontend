import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import {
  FButton,
  FCard,
  FGrid,
  FGridItem,
  FInputText,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import {
  ApprovableButtonWrapper,
  approvalKey,
} from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { useHistory, useLocation, useParams } from "react-router";
// import { useWeb3React } from "@web3-react/core";
import {
  CFRM_BNB_STEP_FLOW_IDS,
  CRUCIBLE_CONTRACTS_V_0_1,
} from "./../../../common/utils";
import { RootState } from "../../../../../redux/rootReducer";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import {
  getLatestStepToRender,
  // getNextStepFlowStepId
} from "../../../common/Helper";
import { MetaMaskConnector } from "../../../../../container-components";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
// import { PATH_DASHBOARD } from "../../../../../routes/paths";

export const CrucibleDeposit = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const { farm } = useParams<{ farm?: string }>();
  const {
    isConnected,
    // isConnecting,
    walletAddress,
    // walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector(
    (state: RootState) => state.crucible
  );
  const {
    // approveTransactionId,
    approvals,
  } = useSelector((state: RootState) => state.approval);
  const { meV2, tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );

  useEffect(() => {
    // if (approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1['BSC'].router, crucible?.baseCurrency)] === undefined) {
    //   history.push({ pathname: PATH_DASHBOARD.crucible.index })
    // }
    if (
      Number(
        approvals[
          approvalKey(
            walletAddress as string,
            CRUCIBLE_CONTRACTS_V_0_1["BSC"].router,
            crucible?.baseCurrency
          )
        ]
      ) > 0
    ) {
      if (currentStep.step.name === "Approve") {
        getStepCompleted(false);
      }
    }
    // eslint-disable-next-line
  }, [approvals]);
  // const { active, activate, deactivate, library, account, chainId, error } =
  //   useWeb3React();
  const [mintAmount, setMintAmount] = useState(0);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  //@ts-ignore
  const crucible = useSelector((state) => state.crucible.selectedCrucible);
  //@ts-ignore
  const userCrucibleData = useSelector(
    (state: RootState) => state.crucible.userCrucibleDetails
  );
  //@ts-ignore
  const tokenPrices = useSelector((state) => state.crucible.tokenPrices);
  console.log(tokenPrices, "tokenPricestokenPrices");

  useEffect(() => {
    console.log(location, crucible);
    // eslint-disable-next-line
  }, [location]);

  // const [approvedDone, setapprovedDone] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const getStepCompleted = async (renderNeeded: any) => {
    try {
      let updatedCurrentStep = { ...currentStep, status: "completed" };
      let updHistory = stepFlowStepHistory.map((obj, index) =>
        index === currentStepIndex ? { ...obj, status: "completed" } : obj
      );
      let data = { status: "completed" };

      dispatch(
        CrucibleActions.updateCurrentStep({
          currentStep: updatedCurrentStep,
          currentStepIndex: currentStepIndex,
        })
      );
      dispatch(
        CrucibleActions.updateStepFlowStepHistory({
          stepFlowStepHistory: updHistory,
        })
      );

      // let updateResponse: any =
      await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
        currentStep._id,
        data,
        tokenV2
      );
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(
        location.state,
        tokenV2,
        currentStep,
        currentStepIndex,
        stepFlowStepHistory,
        dispatch,
        history,
        renderNeeded,
        farm
      );
    } catch (e: any) {
      let errorResponse =
        e &&
        e.response &&
        e.response.data.status &&
        e.response.data.status.message;
      errorResponse
        ? toast.error(`Error Occured: ${errorResponse}`)
        : toast.error(`Error Occured: ${e}`);
    }
  };

  const onMintClick = async (
    currency: string,
    crucibleAddress: string,
    amount: string,
    isPublic: boolean,
    network: string,
    userAddress: string
  ) => {
    if (networkClient) {
      setTransitionStatusDialog(true);
      setIsProcessing(true);
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);

      const response = await client.mintCrucible(
        dispatch,
        currency,
        crucibleAddress,
        amount,
        isPublic,
        network,
        userAddress
      );
      if (response) {
        setIsProcessing(false);
        setIsProcessed(true);
        if (currentStep.step.name === "Mint") {
          getStepCompleted(false);
        }
      }
    }
  };

  const onContinueToNextStepClick = () => {
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.generalAddLiquidity;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history,
      false,
      farm
    );
  };

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title f-mb-2">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRM-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={24} weight={700}>
            Deposit and Mint Crucible Token
          </FTypo>
        </FItem>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              FRM Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              ${tokenPrices["FRM"] || "0"}
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              cFRM Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              ${tokenPrices["cFRM"] || "0"}
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
        onChange={(e: any) => setMintAmount(e.target.value)}
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
            <span
              onClick={() =>
                setMintAmount(Number(userCrucibleData?.baseBalance || "0"))
              }
            >
              Max
            </span>
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have {Number(userCrucibleData?.baseBalance || "0").toFixed(3)}{" "}
        available in Token Base {userCrucibleData?.baseSymbol}.
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
            <span onClick={() => setMintAmount(userCrucibleData?.baseBalance)}>
              cFRM
            </span>
          </FTypo>
        }
      />
      {meV2._id && isConnected ? (
        <ApprovableButtonWrapper
          View={(ownProps) => {
            // onPropChange(ownProps);
            return (
              <div className="btn-wrap f-mt-2">
                <FButton
                  title={ownProps.isApprovalMode ? "Approve" : "Mint"}
                  className={"w-100"}
                  onClick={
                    ownProps.isApprovalMode
                      ? () => ownProps.onApproveClick()
                      : () =>
                          onMintClick(
                            crucible!.baseCurrency,
                            crucible?.currency || "",
                            mintAmount.toString(),
                            true,
                            crucible?.network,
                            walletAddress as string
                          )
                  }
                ></FButton>
              </div>
            );
          }}
          currency={crucible!.baseCurrency}
          contractAddress={CRUCIBLE_CONTRACTS_V_0_1["BSC"].router}
          userAddress={walletAddress as string}
          amount={"0.0001"}
        />
      ) : (
        <MetaMaskConnector.WalletConnector
          WalletConnectView={FButton}
          WalletConnectModal={ConnectWalletDialog}
          isAuthenticationNeeded={true}
          WalletConnectViewProps={{ className: "btn-wrap f-mt-2 w-100" }}
        />
      )}

      <DialogTransitionStatus
        transitionStatusDialog={transitionStatusDialog}
        setTransitionStatusDialog={setTransitionStatusDialog}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        setapprovedDone={false}
        isSubmitted={false}
        isProcessed={isProcessed}
        crucible={crucible}
        onContinueToNextStepClick={() => onContinueToNextStepClick()}
      />
    </FCard>
  );
};
