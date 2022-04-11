import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo, FLabel } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { ApprovableButtonWrapper, approvalKey } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { useHistory, useLocation, useParams } from "react-router";
import { CRUCIBLE_CONTRACTS_V_0_1, getBaseTokenName, getCrucibleTokenName, STEP_FLOW_IDS } from "./../../../common/utils";
import { RootState } from "../../../../../redux/rootReducer";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast, { Toaster } from "react-hot-toast";
import {
  getLatestStepToRender,
  getObjectReadableFarmName
} from "../../../common/Helper";
import { MetaMaskConnector } from "../../../../../container-components";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import { ClipLoader } from "react-spinners";
import { getCrucibleMaxMintCap } from "../../../../../_apis/CrucibleCapCrud";

export const CrucibleDeposit = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { farm } = useParams<{ farm?: string }>();
  const [transactionId, setTransactionId] = useState("");
  const { isConnected, walletAddress, networkClient, } = useSelector((state: RootState) => state.walletConnector);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { approvals, } = useSelector((state: RootState) => state.approval);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const [maxCap, setMaxCap] = useState("");

  useEffect(() => {
    getMaxCapInformation();
  }, [])

  const getMaxCapInformation = async () => {
    let response = await getCrucibleMaxMintCap();
    let maxCapResponse = response && response.data && response.data.body && response.data.body.crucibleMintCap;
    console.log(maxCapResponse);
    farm?.includes('cFRMx') ? setMaxCap(maxCapResponse.cFRMxMaxCap) : setMaxCap(maxCapResponse.cFRMMaxCap);
  }


  useEffect(() => {
    if (Number(approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1["BSC"].router, crucible?.baseCurrency)]) > 0) {
      if (currentStep.step.name === "Approve") {
        getStepCompleted(false);
      }
    }
    // eslint-disable-next-line
  }, [approvals]);

  const [mintAmount, setMintAmount] = useState(0);
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);


  console.log(tokenPrices, userCrucibleData, "tokenPricestokenPrices");

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
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`);
    }
  };

  const onMintClick = async (currency: string, crucibleAddress: string, amount: string, isPublic: boolean, network: string, userAddress: string) => {
    if (networkClient) {

      if (Number(amount) <= Number(maxCap)) {
        setTransitionStatusDialog(true);
        setIsProcessing(true);
        const web3Helper = new Web3Helper(networkClient as any);
        const client = new CrucibleClient(web3Helper);

        const response = await client.mintCrucible(dispatch, currency, crucibleAddress, amount, isPublic, network, userAddress);
        if (response) {
          let transactionId = response.split("|");
          setTransactionId(transactionId[0]);
          setIsProcessing(false);
          setIsProcessed(true);
          if (currentStep.step.name === "Mint") {
            getStepCompleted(false);
          }
        }
      } else { 
        toast.error(`You have entered an amount that exceeds your minting limit. Please enter a valid amount.`)
      }
    }
  };

  const onContinueToNextStepClick = () => {
    let nextStepInfo: any;
    setIsLoading(true);
    if (farm === "cFRM-BNB" || farm === "cFRMx-BNB") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].generalAddLiquidity;
    } else if (farm === "cFRM" || farm === "cFRMx") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].stakingMint;
    }
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
  };

  const getOpenCapClass = () => {
    if (Number(crucible[farm!]?.openCap) > 0) {
      return "open-cap-label green-cap";
    } else {
      return "open-cap-label red-cap";
    }
  };

  const getOpenCapInfo = () => {
    if (Number(crucible[farm!]?.openCap) > 0) {
      return `Minting Is Open ( ${crucible[farm!]?.openCap} Open Cap )`;
    } else {
      return `Minting Is Closed ( ${crucible[farm!]?.openCap} Open Cap )`;
    }
  };

  const getDisabledCheck = (isApproveMode: boolean) => {
    if (isApproveMode) {
      return false;
    } else {
      return Number(userCrucibleData[farm!]?.baseBalance || "0") === 0 || Number(crucible[farm!]?.openCap) === 0;
    }
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </FCard>
      ) : (
        <FCard variant={"secondary"} className="card-deposit  card-shadow">
          <div className="card-title f-mb-2">
            <FItem display={"flex"} alignY="center">
              <Link to={`/dashboard/crucible/${farm}/manage`} className="btn-back">
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
            value={mintAmount === 0 ? "" : mintAmount}
            onChange={(e: any) => setMintAmount(e.target.value)}
            postfix={
              <FTypo color="#DAB46E" className={"f-pr-1"}>
                {/* <span onClick={() => setMintAmount(Number(userCrucibleData[farm!]?.baseBalance || "0"))}>Max</span> */}
                <span onClick={() => setMintAmount(Number(maxCap || "0"))}>Max</span>
              </FTypo>
            }
          />
          <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
            You have {Number(userCrucibleData[farm!]?.baseBalance || "0").toFixed(3)} available in the Base Token {userCrucibleData[farm!]?.baseSymbol}.
            You can mint maximum { (maxCap)} {userCrucibleData[farm!]?.baseSymbol}.
          </FTypo>
          <FTypo size={15} className={"f-mt-2 f-pl--5 justify-content-space-between"}>
            Amount you will receive
            <FLabel className={getOpenCapClass()} text={getOpenCapInfo()}></FLabel>
          </FTypo>
          <FInputText
            inputSize="input-lg"
            type={"text"}
            placeholder="0"
            disabled={true}
            value={mintAmount}
            postfix={
              <FTypo color="#DAB46E" className={"f-pr-1 f-mt-1"}>
                {/* <span onClick={() => setMintAmount(userCrucibleData[farm!]?.baseBalance)}> */}
                {crucible[farm!]?.symbol}
                {/* </span> */}
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
                      disabled={getDisabledCheck(ownProps.isApprovalMode)}
                      onClick={
                        ownProps.isApprovalMode
                          ? () => ownProps.onApproveClick()
                          : () =>
                            onMintClick(
                              crucible[farm!]?.baseCurrency,
                              crucible[farm!]?.currency || "",
                              mintAmount.toString(),
                              true,
                              crucible[farm!]?.network,
                              walletAddress as string
                            )
                      }
                    ></FButton>
                  </div>
                );
              }}
              currency={crucible[farm!]?.baseCurrency}
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
            transactionId={transactionId}
            isProcessed={isProcessed}
            crucible={crucible[farm!]}
            onContinueToNextStepClick={() => onContinueToNextStepClick()}
          />
        </FCard>
      )}
    </>
  );
};
