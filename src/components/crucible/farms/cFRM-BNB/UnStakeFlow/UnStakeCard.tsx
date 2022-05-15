import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { RootState } from "../../../../../redux/rootReducer";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { ApprovableButtonWrapper } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { CRUCIBLE_CONTRACTS_V_0_1, getBaseTokenName, getCrucibleTokenName } from "./../../../common/utils";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import {
  getLatestStepToRender,
  isLPFarm,
  isSingleTokenFarm,
  // getNextStepFlowStepId
} from "../../../common/Helper";
import { ClipLoader } from "react-spinners";
import { MetaMaskConnector } from "../../../../../container-components";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import { getErrorMessage } from "../../../../../utils/global.utils";

export const UnStake = () => {
  const dispatch = useDispatch();
  const { farm } = useParams<{ farm?: string }>();
  const history = useHistory();
  const location: any = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const LPStakingDetails = useSelector((state: RootState) => state.crucible.userLpStakingDetails);
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const { isConnected, walletAddress, networkClient } = useSelector((state: RootState) => state.walletConnector);
  const [isProcessed, setIsProcessed] = useState(false);
  const [amount, setAmount] = useState(0);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  let userStake = userCrucibleData[farm!] && (userCrucibleData[farm!].stakes || []).find((e: any) => e.address.toLowerCase() === location.state.LPstakingAddress.toLowerCase());
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const [transactionId, setTransactionId] = useState("");
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

  const onUnStakeClick = async () => {
    if (networkClient) {
      let currency: string = "";
      let stakingAddress: string = "";
      let stakeAmount: string = "";
      let network: string = "";
      let userAddress: string = "";
      let response: any;

      dispatch(CrucibleActions.transactionProcessing())
      setTransitionStatusDialog(true);
      setIsProcessing(true);
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);

      if (isLPFarm(farm)) {
        currency = LPStakingDetails[farm!]?.stakeId;
        stakingAddress = LPStakingDetails[farm!]?.stakingAddress || "";
        stakeAmount = amount.toString();
        network = crucible[farm!]?.network;
        userAddress = walletAddress as string;

        response = await client.unstakeLPToken(dispatch, currency, userAddress, stakeAmount, stakingAddress, network);
      } else if (isSingleTokenFarm(farm)) {
        currency = crucible[farm!]?.currency;
        stakingAddress = (crucible[farm!]?.staking || [])[0]?.address || "";
        stakeAmount = amount.toString();
        network = crucible[farm!]?.network;
        userAddress = walletAddress as string;

        response = await client.UnStakeCrucible(dispatch, currency, stakeAmount, stakingAddress, userAddress, network);
      }
      if (response) {
        dispatch(CrucibleActions.transactionProcessed())
        let transactionId = response.split("|");
        setTransactionId(transactionId[0]);
        setIsProcessing(false);
        setIsProcessed(true);
        getStepCompleted(false);
      }
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

  const getAmountSymbol = () => {
    if (farm?.includes("BNB")) {
      return crucible[farm!]?.LP_symbol;
    } else {
      return crucible[farm!]?.symbol;
    }
  };

  const getAmount = () => {
    if (farm?.includes("BNB")) {
      return LPStakingDetails[farm!]?.stake || 0;
    } else {
      return (userStake?.stakeOf || "0");
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
        <FCard variant={"secondary"} className="card-deposit  card-shadow">
          <div className="card-title">
            <FItem display={"flex"} alignY="center">
              <Link to={`/dashboard/crucible/${farm}/manage`} className="btn-back">
                <IconGoBack />
              </Link>
              <FTypo size={24} weight={700}>
                Unstake {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} {farm?.includes("BNB") ? "/ BNB LP" : ""} Token
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
            value={amount === 0 ? "" : amount}
            onChange={(e: any) => setAmount(e.target.value)}
            placeholder="Amount to unstake"
            postfix={
              <FTypo color="#DAB46E" className={"f-pr-1"}>
                <span onClick={() => setAmount(getAmount())}>Max</span>
              </FTypo>
            }
          />
          <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
            You have {getAmount()} {getAmountSymbol()} available to unstake.
          </FTypo>
          {meV2._id && isConnected ? (
            <div className="btn-wrap f-mt-2">
              <ApprovableButtonWrapper
                View={(ownProps) => (
                  <FButton
                    title={"Unstake Crucible"}
                    className={"w-100"}
                    disabled={Number(getAmount()) === 0}
                    onClick={ownProps.isApprovalMode ? () => ownProps.onApproveClick() : () => onUnStakeClick()}
                  ></FButton>
                )}
                currency={isSingleTokenFarm(farm) ? crucible[farm!]?.baseCurrency : isLPFarm(farm) && `${crucible[farm!]?.network}:${LPStakingDetails[farm!]?.LPaddress}`}
                contractAddress={CRUCIBLE_CONTRACTS_V_0_1["BSC"].router}
                userAddress={walletAddress as string}
                amount={"0.0001"}
              />
            </div>
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
