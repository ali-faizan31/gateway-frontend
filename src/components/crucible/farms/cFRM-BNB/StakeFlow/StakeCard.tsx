import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { ApprovableButtonWrapper, approvalKey } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { useHistory, useLocation, useParams } from "react-router";
import {
  // CFRM_BNB_STEP_FLOW_IDS,
  CRUCIBLE_CONTRACTS_V_0_1,
  Crucible_Farm_Address_Detail,
  getBaseTokenName,
  getCrucibleTokenName,
} from "./../../../common/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import {
  getCrucibleDetail,
  getLatestStepToRender,
  isLPFarm,
  isSingleTokenFarm,
  // getNextStepFlowStepId
} from "../../../common/Helper";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import { MetaMaskConnector } from "../../../../../container-components";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import { ClipLoader } from "react-spinners";
import { getErrorMessage, TruncateWithoutRounding } from "../../../../../utils/global.utils";

export const Stake = () => {
  const dispatch = useDispatch();
  const { farm } = useParams<{ farm?: string }>();
  const location: any = useLocation();
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  // const [approvedDone, setapprovedDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const history = useHistory();
  const [isProcessed, setIsProcessed] = useState(false);
  const [tokenInfo, setTokenInfo] = useState<any>({});
  const [transactionId, setTransactionId] = useState("");
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const { isConnected, walletAddress, networkClient } = useSelector((state: RootState) => state.walletConnector);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  const LPStakingDetails = useSelector((state: RootState) => state.crucible.userLpStakingDetails);
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { approvals } = useSelector((state: RootState) => state.approval);



  useEffect(() => {
    if (networkClient && farm) {
      getCrucibleDetail(Crucible_Farm_Address_Detail[farm!], networkClient, walletAddress, dispatch, setIsLoading)
    }
  }, [networkClient, farm])

  useEffect(() => {
    console.log("stake payload", LPStakingDetails, userCrucibleData);
  }, [userCrucibleData, LPStakingDetails])



  useEffect(() => {
    // console.log(Number(approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1["BSC"].router, crucible[farm!]?.currency)]))
    // console.log((approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1["BSC"].router, crucible[farm!]?.currency)]))
    // console.log(approvals)
    // console.log(crucible[farm!]?.currency)
    // console.log(crucible[farm!])
    if (Number(approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1["BSC"].router, crucible[farm!]?.currency)]) > 0) {
      if (currentStep.step.name === "Approve" && currentStep.status !== "completed") {
        getStepCompleted(false);
      }
    }
    // eslint-disable-next-line
  }, [approvals]);

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

  const onStakeClick = async (amountToStake: number) => {
    if (networkClient) {
      let currency: string = "";
      let stakingAddress: string = "";
      let amount: string = "";
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
        amount = amountToStake.toString();
        network = crucible[farm!]?.network;
        userAddress = walletAddress as string;

        response = await client.stakeLPToken(dispatch, currency, userAddress, stakingAddress, network, amount);
      } else if (isSingleTokenFarm(farm)) {
        stakingAddress = (crucible[farm!]?.staking || [])[1]?.address || "";
        currency = crucible[farm!].currency;
        amount = amountToStake.toString();
        network = crucible[farm!]?.network;
        userAddress = walletAddress as string;

        response = await client.StakeCrucible(dispatch, currency, amount, stakingAddress, userAddress, network);
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

  const getAmount = () => {
    if (farm?.includes("BNB")) {
      return crucible[farm!]?.LP_balance;
    } else {
      return userCrucibleData[farm!]?.balance;
    }
  };

  const getAmountSymbol = () => {
    if (farm?.includes("BNB")) {
      return `${crucible[farm!]?.LP_symbol} ${crucible[farm!]?.symbol}-BNB`;
    } else {
      return crucible[farm!]?.symbol;
    }
  };

  const getDisabledCheck = () => {
    return Number(getAmount()) === 0 || Number(amount) === 0 || Number(getAmount()) < Number(amount);
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
              <FTypo size={30} weight={600}>
                Stake {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} {farm?.includes("BNB") ? "/ BNB LP" : ""} Token
              </FTypo>
            </FItem>
          </div>
          <FGrid>
            <FGridItem size={[6, 6, 6]}>
              <FItem bgColor="#1C2229" className={"f-p-2"}>
                <FTypo size={24} className="f-mb-1">
                  {getBaseTokenName(farm)} Price (USD)
                </FTypo>
                <FTypo size={36} weight={500}>
                  ${tokenPrices[getBaseTokenName(farm)!]}
                </FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[6, 6, 6]}>
              <FItem bgColor="#1C2229" className={"f-p-2"}>
                <FTypo size={24} className="f-mb-1">
                  {getCrucibleTokenName(farm)} Price (USD)
                </FTypo>
                <FTypo size={36} weight={500}>
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
            placeholder="Amount to Stake"
            postfix={
              <FTypo color="#DAB46E" className={"f-pr-1"}>
                <span onClick={() => setAmount(getAmount())}>Max</span>
              </FTypo>
            }
          />
          <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
            You have {TruncateWithoutRounding(getAmount(), 3)} available in Token {getAmountSymbol()} to Stake.
          </FTypo>
          {meV2._id && isConnected ? (
            <ApprovableButtonWrapper
              View={(ownProps) => (
                <div className="btn-wrap f-mt-2">
                  <FButton
                    title={ownProps.isApprovalMode ? "Approve" : "Stake Crucible"}
                    className={"w-100"}
                    disabled={getDisabledCheck()}
                    onClick={
                      ownProps.isApprovalMode ? () => ownProps.onApproveClick() : () => onStakeClick(amount)
                      // crucible+ddress as string
                    }
                  ></FButton>
                </div>
              )}
              // currency={crucible!.baseCurrency}
              currency={isSingleTokenFarm(farm) ? crucible[farm!]?.currency : isLPFarm(farm) && `${crucible[farm!]?.network}:${LPStakingDetails[farm!]?.LPaddress}`}
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
