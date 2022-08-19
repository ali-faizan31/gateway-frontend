import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo, FLabel } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-back-white.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { ApprovableButtonWrapper, approvalKey } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { useHistory, useLocation, useParams } from "react-router";
import { CRUCIBLE_CONTRACTS_V_0_1, Crucible_Farm_Address_Details, getBaseTokenName, getCrucibleTokenName, STEP_FLOW_IDS } from "./../../../common/utils";
import { RootState } from "../../../../../redux/rootReducer";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast, { Toaster } from "react-hot-toast";
import {
  getCrucibleDetail,
  getLatestStepToRender,
  getObjectReadableFarmName
} from "../../../common/Helper";
import { WalletConnector } from "foundry";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import { ClipLoader } from "react-spinners";
import { getCrucibleMaxMintCap } from "../../../../../_apis/CrucibleCapCrud";
import { getErrorMessage, TruncateWithoutRounding } from "../../../../../utils/global.utils";

export const CrucibleDeposit = () => {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const history = useHistory();
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { farm } = useParams<{ farm?: string }>();
  const [transactionId, setTransactionId] = useState("");
  const [maxCap, setMaxCap] = useState<any>();
  const [mintAmount, setMintAmount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const userCrucibleData = useSelector((state: RootState) => state.crucible.userCrucibleDetails);
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const { isConnected, walletAddress, networkClient, } = useSelector((state: RootState) => state.walletConnector);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { approvals, } = useSelector((state: RootState) => state.approval);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  useEffect(() => {
    getMaxCapInformation();
  }, [])

  useEffect(() => {
    if (Number(approvals[approvalKey(walletAddress as string, CRUCIBLE_CONTRACTS_V_0_1["BSC"].router, crucible[farm!]?.baseCurrency)]) > 0) {
      if (currentStep.step.name === "Approve" && currentStep.status !== "completed") {
        getStepCompleted(false);
      }
    }
    // eslint-disable-next-line
  }, [approvals]);

  const getMaxCapInformation = async () => {
    let response = await getCrucibleMaxMintCap();
    let maxCapResponse = response && response.data && response.data.body && response.data.body.crucibleMintCap;
    if (maxCapResponse) {
      if (farm?.includes('cFRMx')) {
        maxCapResponse.cFRMxMaxCap ? setMaxCap(maxCapResponse.cFRMxMaxCap) : setMaxCap(null)
      } else {
        maxCapResponse.cFRMMaxCap ? setMaxCap(maxCapResponse.cFRMMaxCap) : setMaxCap(null)
      }
    } else {
      setMaxCap(null)
    }
  }

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
      // console.log('updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId', 'depoand mint 90')
      // updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading, renderNeeded);
    } catch (e: any) {
      getErrorMessage(e, activeTranslation)
    }
  };

  const onMintClick = async (currency: string, crucibleAddress: string, amount: string, isPublic: boolean, network: string, userAddress: string) => {
    let maxCapCheck = false;
    if (maxCap) {
      if (Number(amount) > Number(maxCap)) {
        maxCapCheck = false;
      } else {
        maxCapCheck = true;
      }
    } else {
      maxCapCheck = true;
    }
    if (networkClient) {
      if (maxCapCheck) {
        dispatch(CrucibleActions.transactionProcessing())
        setTransitionStatusDialog(true);
        setIsProcessing(true);
        const web3Helper = new Web3Helper(networkClient as any);
        const client = new CrucibleClient(web3Helper);

        const response = await client.mintCrucible(dispatch, currency, crucibleAddress, amount, isPublic, network, userAddress, setTransitionStatusDialog);
        if (response) {
          dispatch(CrucibleActions.transactionProcessed())
          let transactionId = response.split("|");
          setTransactionId(transactionId[0]);
          setIsProcessing(false);
          setIsProcessed(true);
          if (currentStep.step.name === "Mint") {
            getStepCompleted(false);
          }
          getCrucibleDetail(Crucible_Farm_Address_Details[farm!], networkClient, walletAddress, dispatch, setIsLoading)
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
      return `Minting Is Open ( ${TruncateWithoutRounding(crucible[farm!]?.openCap || "0", 3)} Open Cap )`;
    } else {
      return `Minting Is Closed ( ${crucible[farm!]?.openCap} Open Cap )`;
    }
  };

  const getDisabledCheck = (isApproveMode: boolean) => {
    if (isApproveMode) {
      return false;
    } else {
      return Number(userCrucibleData[farm!]?.baseBalance || "0") === 0
        || Number(crucible[farm!]?.openCap) === 0
        || Number(mintAmount) === 0
        || Number(userCrucibleData[farm!]?.baseBalance || "0") < Number(mintAmount);
    }
  };

  const setMaxAmount = () => {
    if (maxCap) {
      setMintAmount(maxCap)
    } else {
      setMintAmount((userCrucibleData[farm!]?.baseBalance || "0"))
    }
  }

  return (
    <>
      <Toaster />
      {isLoading ? (
        <div>
          <FItem align={"center"}>
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </div>
      ) : (
        <div className={'crucible-farm-dashboard-card'}>
          <div className="card-title f-mb-2">
            <FItem display={"flex"} alignY="center">
              <Link to="/dashboard/crucible" className="btn-back custom-mr-14">
                <IconGoBack />
              </Link>
              <FTypo size={20} weight={700}>
                Deposit and Mint Crucible Token
              </FTypo>
              <div className="justify-content-end">
                <FLabel className={getOpenCapClass()} text={getOpenCapInfo()}></FLabel>
              </div>
            </FItem>
          </div>
          <FGrid>
            <FGridItem size={[6, 6, 6]}>
              <FItem bgColor="#1A1D1F" className={"f-p-2"}>
                <FTypo size={18} color={'#6F767E'} className="f-mb-1">
                  {getBaseTokenName(farm)} Price (USD)
                </FTypo>
                <FTypo size={30} weight={500}>
                  ${tokenPrices[getBaseTokenName(farm)!] || 0}
                </FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[6, 6, 6]}>
              <FItem bgColor="#1A1D1F" className={"f-p-2"}>
                <FTypo size={18} color={'#6F767E'} className="f-mb-1">
                  {getCrucibleTokenName(farm)} Price (USD)
                </FTypo>
                <FTypo size={30} weight={500}>
                  ${tokenPrices[getCrucibleTokenName(farm)!] || 0}
                </FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <div className="f-mt-1 f-mb-2 flex-center-aligned-center ">
            <div className="custom-mr-16 w-100">
              <div>
                <FTypo size={18} weight={700}>
                  Deposit
                </FTypo>
                <FInputText
                  className={"f-mt-1 w-100 f-mb--7"}
                  inputSize="input-lg"
                  type={"text"}
                  placeholder="0"
                  value={mintAmount === 0 ? "" : mintAmount}
                  onChange={(e: any) => setMintAmount(e.target.value)}
                  postfix={
                    <FTypo color="#DAB46E" className={"f-pr-1"}>
                      <span onClick={() => setMaxAmount()}>Max</span>
                    </FTypo>
                  }
                />
                <FTypo size={12} weight={500} color={'#6F767E'}>
                  You have {TruncateWithoutRounding((userCrucibleData[farm!]?.baseBalance || "0"), 3)} available in the Base Token {userCrucibleData[farm!]?.baseSymbol}.
                </FTypo>
              </div>

            </div>
            <div className={'w-100'}>
              <FTypo size={18} weight={700}>
                Receive
              </FTypo>
              <FInputText
                inputSize="input-lg"
                className={'f-mt-1 w-100 f-mb--7'}
                type={"text"}
                placeholder="0"
                disabled={true}
                value={mintAmount}
                postfix={
                  <FTypo color="#DAB46E" className={"f-pr-1"}>
                    {/* <span onClick={() => setMintAmount(userCrucibleData[farm!]?.baseBalance)}> */}
                    {crucible[farm!]?.symbol}
                    {/* </span> */}
                  </FTypo>
                }
              />
              <FTypo size={12} weight={500} color={'#6F767E'}>
                Amount cFRM you will receive
              </FTypo>
            </div>
          </div>
          {meV2._id && isConnected ? (
            <ApprovableButtonWrapper
              View={(ownProps) => {
                // onPropChange(ownProps);
                return (
                  <div className="btn-wrap f-mt-2 f-mb-2">
                    <FButton
                      title={ownProps.isApprovalMode ? "APPROVE" : "MINT"}
                      className={"w-100 clr_new_black custom-font-size-16 font-700"}
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
            <WalletConnector.WalletConnector
              WalletConnectView={FButton}
              WalletConnectModal={ConnectWalletDialog}
              WalletConnectViewProps={{ className: "btn-wrap f-mt-2 w-100 f-mb-2" }}
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
        </div>
        // <FCard variant={"secondary"} className="card-deposit  card-shadow">
        //   <div className="card-title f-mb-2">
        //     <FItem display={"flex"} alignY="center">
        //       <Link to={`/dashboard/crucible/${farm}/manage`} className="btn-back">
        //         <IconGoBack />
        //       </Link>
        //       <FTypo size={24} weight={700}>
        //         Deposit and Mint Crucible Token
        //       </FTypo>
        //     </FItem>
        //   </div>
        //   <FGrid>
        //     <FGridItem size={[6, 6, 6]}>
        //       <FItem bgColor="#1C2229" className={"f-p-2"}>
        //         <FTypo size={20} className="f-mb-1">
        //           {getBaseTokenName(farm)} Price (USD)
        //         </FTypo>
        //         <FTypo size={30} weight={500}>
        //           ${tokenPrices[getBaseTokenName(farm)!]}
        //         </FTypo>
        //       </FItem>
        //     </FGridItem>
        //     <FGridItem size={[6, 6, 6]}>
        //       <FItem bgColor="#1C2229" className={"f-p-2"}>
        //         <FTypo size={20} className="f-mb-1">
        //           {getCrucibleTokenName(farm)} Price (USD)
        //         </FTypo>
        //         <FTypo size={30} weight={500}>
        //           ${tokenPrices[getCrucibleTokenName(farm)!]}
        //         </FTypo>
        //       </FItem>
        //     </FGridItem>
        //   </FGrid>
        // <FInputText
        //   className={"f-mt-1"}
        //   inputSize="input-lg"
        //   type={"text"}
        //   placeholder="0"
        //   value={mintAmount === 0 ? "" : mintAmount}
        //   onChange={(e: any) => setMintAmount(e.target.value)}
        //   postfix={
        //     <FTypo color="#DAB46E" className={"f-pr-1"}>
        //       <span onClick={() => setMaxAmount()}>Max</span>
        //     </FTypo>
        //   }
        // />
        //   <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        //     You have {TruncateWithoutRounding((userCrucibleData[farm!]?.baseBalance || "0"), 3)} available in the Base Token {userCrucibleData[farm!]?.baseSymbol}.
        //     {maxCap && `You can mint maximum ${maxCap} ${userCrucibleData[farm!]?.baseSymbol}.`}
        //   </FTypo>
        //   <FTypo size={15} className={"f-mt-2 f-pl--5 justify-content-space-between"}>
        //     Amount you will receive
        //     <FLabel className={getOpenCapClass()} text={getOpenCapInfo()}></FLabel>
        //   </FTypo>
        // <FInputText
        //   inputSize="input-lg"
        //   type={"text"}
        //   placeholder="0"
        //   disabled={true}
        //   value={mintAmount}
        //   postfix={
        //     <FTypo color="#DAB46E" className={"f-pr-1 f-mt-1"}>
        //       {/* <span onClick={() => setMintAmount(userCrucibleData[farm!]?.baseBalance)}> */}
        //       {crucible[farm!]?.symbol}
        //       {/* </span> */}
        //     </FTypo>
        //   }
        // />
        // {meV2._id && isConnected ? (
        //   <ApprovableButtonWrapper
        //     View={(ownProps) => {
        //       // onPropChange(ownProps);
        //       return (
        //         <div className="btn-wrap f-mt-2">
        //           <FButton
        //             title={ownProps.isApprovalMode ? "Approve" : "Mint"}
        //             className={"w-100"}
        //             disabled={getDisabledCheck(ownProps.isApprovalMode)}
        //             onClick={
        //               ownProps.isApprovalMode
        //                 ? () => ownProps.onApproveClick()
        //                 : () =>
        //                   onMintClick(
        //                     crucible[farm!]?.baseCurrency,
        //                     crucible[farm!]?.currency || "",
        //                     mintAmount.toString(),
        //                     true,
        //                     crucible[farm!]?.network,
        //                     walletAddress as string
        //                   )
        //             }
        //           ></FButton>
        //         </div>
        //       );
        //     }}
        //     currency={crucible[farm!]?.baseCurrency}
        //     contractAddress={CRUCIBLE_CONTRACTS_V_0_1["BSC"].router}
        //     userAddress={walletAddress as string}
        //     amount={"0.0001"}
        //   />
        // ) : (
        //   <WalletConnector.WalletConnector
        //     WalletConnectView={FButton}
        //     WalletConnectModal={ConnectWalletDialog}
        //     WalletConnectViewProps={{ className: "btn-wrap f-mt-2 w-100" }}
        //   />
        // )}

        // <DialogTransitionStatus
        //   transitionStatusDialog={transitionStatusDialog}
        //   setTransitionStatusDialog={setTransitionStatusDialog}
        //   isProcessing={isProcessing}
        //   setIsProcessing={setIsProcessing}
        //   setapprovedDone={false}
        //   isSubmitted={false}
        //   transactionId={transactionId}
        //   isProcessed={isProcessed}
        //   crucible={crucible[farm!]}
        //   onContinueToNextStepClick={() => onContinueToNextStepClick()}
        // />
        // </FCard>
      )}
    </>
  );
};
