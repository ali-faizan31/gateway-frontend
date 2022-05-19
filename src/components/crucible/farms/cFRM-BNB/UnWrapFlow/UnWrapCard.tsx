import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { ApprovableButtonWrapper } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { useHistory, useLocation, useParams } from "react-router";
// import { useWeb3React } from "@web3-react/core";
import { CRUCIBLE_CONTRACTS_V_0_1, getBaseTokenName, getCrucibleTokenName } from "./../../../common/utils";
import { RootState } from "../../../../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { BigUtils } from "./../../../../../container-components/web3Client/types";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import {
  getLatestStepToRender,
  //  getNextStepFlowStepId
} from "../../../common/Helper";
import { ClipLoader } from "react-spinners";
import { MetaMaskConnector } from "../../../../../container-components";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import { changeExponentToPoints, getErrorMessage, TruncateWithoutRounding } from "../../../../../utils/global.utils";
import Big from "big.js";

export const UnWrap = () => {
  const location: any = useLocation();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const { farm } = useParams<{ farm?: string }>();
  const dispatch = useDispatch();
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  const [transactionId, setTransactionId] = useState("");
  const { isConnected, walletAddress, networkClient } = useSelector((state: RootState) => state.walletConnector);
  const [amount, setAmount] = useState(0);
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  const getStepCompleted = async (renderNeeded: any) => {
    setIsLoading(true);
    try {
      let updatedCurrentStep = { ...currentStep, status: "completed" };
      let updHistory = stepFlowStepHistory.map((obj, index) => (index === currentStepIndex ? { ...obj, status: "completed" } : obj));
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
      await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading, renderNeeded);
    } catch (e: any) {
      getErrorMessage(e, activeTranslation)
    }
  };

  const onUnWrapClick = async (currency: string, crucibleAddress: string, amount: string, isPublic: boolean, network: string, userAddress: string) => {
    if (networkClient) {
      setTransitionStatusDialog(true);
      setIsProcessing(true);
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);

      const response = await client.unwrapCrucible(dispatch, currency, crucibleAddress, amount, isPublic, network, userAddress);
      if (response) {
        let transactionId = response.split("|");
        setTransactionId(transactionId[0]);
        setIsProcessing(false);
        //setIsSubmitted(true)
        setIsProcessed(true);
        getStepCompleted(false);
      }
      //setIsApproving(false);
      //setTransitionStatusDialog(true);
    }
  };

  const onContinueToNextStepClick = () => {
    setIsLoading(true);
    if (currentStep.status === "pending") {
      location.state.id = currentStep.stepFlow;
      let splitted = currentStep.stepFlowStep.name.split("-");
      location.state.name = splitted[0].trim() + " - " + splitted[1].trim();
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    }
  };

  const getDisabledCheck = () => {
    return Number(userCrucibleData[farm!]?.balance) === 0 || Number(amount) === 0 || Number(userCrucibleData[farm!]?.balance) < Number(amount);
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
        <FCard variant={"secondary"} className="card-deposit  card-shadow">
          <div className="card-title">
            <FItem display={"flex"} alignY="center">
              <Link to={`/dashboard/crucible/${farm}/manage`} className="btn-back">
                <IconGoBack />
              </Link>
              <FTypo size={24} weight={700}>
                Unwrap Crucible Token
              </FTypo>
            </FItem>
          </div>
          <FGrid>
            <FGridItem size={[6, 6, 6]}>
              <FItem bgColor="#1C2229" className={"f-p-2"}>
                <FTypo size={20} className="f-mb-1">
                  {getBaseTokenName(farm)} Price (USD)
                </FTypo>
                <FTypo size={30} weight={500}>
                  ${tokenPrices[getBaseTokenName(farm)!]}
                </FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[6, 6, 6]}>
              <FItem bgColor="#1C2229" className={"f-p-2"}>
                <FTypo size={20} className="f-mb-1">
                  {getCrucibleTokenName(farm)} Price (USD)
                </FTypo>
                <FTypo size={30} weight={500}>
                  ${tokenPrices[getCrucibleTokenName(farm)!]}
                </FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <FInputText
            className={"f-mt-1"}
            inputSize="input-lg"
            type={"text"}
            placeholder="0"
            value={amount === 0 ? "" : amount}
            onChange={(e: any) => setAmount(e.target.value)}
            postfix={
              <FTypo color="#DAB46E" className={"f-pr-1"}>
                <span onClick={() => setAmount(userCrucibleData[farm!]?.balance || "0")}>Max</span>
              </FTypo>
            }
          />
          <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
            You have {TruncateWithoutRounding(userCrucibleData[farm!]?.balance || "0", 3)} available in Token {userCrucibleData[farm!]?.symbol}.
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
            value={changeExponentToPoints(Number(amount) - Number(amount) * (Number(BigUtils.safeParse(crucible[farm!]?.feeOnWithdrawRate || "0").times(100)) / 100))}
            postfix={
              <FTypo color="#DAB46E" className={"f-pr-1 f-mt-1"}>
                {crucible[farm!]?.symbol}
              </FTypo>
            }
          />
          {meV2._id && isConnected ? (
            <ApprovableButtonWrapper
              View={(ownProps) => (
                <div className="btn-wrap f-mt-2">
                  <FButton
                    title={"Unwrap"}
                    className={"w-100"}
                    disabled={getDisabledCheck()}
                    onClick={
                      ownProps.isApprovalMode
                        ? () => ownProps.onApproveClick()
                        : () => onUnWrapClick(crucible[farm!]?.baseCurrency, crucible[farm!]?.currency || "", amount.toString(), true, crucible[farm!]?.network, walletAddress as string)
                    }
                  ></FButton>
                </div>
              )}
              currency={crucible[farm!]?.currency}
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
            transactionId={transactionId}
            isSubmitted={false}
            isProcessed={isProcessed}
            crucible={crucible[farm!]}
            onContinueToNextStepClick={() => onContinueToNextStepClick()}
          />
        </FCard>
      )}
    </>
  );
};
