import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FButton,
  FCard,
  FGrid,
  FGridItem,
  // FInputText,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
// import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { ApprovableButtonWrapper } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { CRUCIBLE_CONTRACTS_V_0_1 } from "./../../../common/utils";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import toast from "react-hot-toast";
import {
  getLatestStepToRender,
  // getNextStepFlowStepId,
} from "../../../common/Helper";
import { useHistory, useLocation, useParams } from "react-router";

export const Withdraw = () => {
  const dispatch = useDispatch();
  const { farm } = useParams<{ farm?: string }>();
  const history = useHistory();
  const location: any = useLocation();
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  // const [approvedDone, setapprovedDone] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  //@ts-ignore
  const crucible = useSelector((state) => state.crucible.selectedCrucible);
  const {
    // isConnected,
    // isConnecting,
    walletAddress,
    // walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  //@ts-ignore
  const userCrucibleData = useSelector(
    (state: RootState) => state.crucible.userCrucibleDetails
  );
  let userStake = (userCrucibleData.stakes || []).find(
    (e: any) => e.address === "0xAb0433AA0b5e05f1FF0FD293CFf8bEe15882cCAd"
  );
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector(
    (state: RootState) => state.crucible
  );
  const { tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );

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

  const onWithdrawClick = async (
    currency: string,
    stakingAddress: string,
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

      const response = await client.withdrawRewards(
        dispatch,
        network,
        amount,
        currency,
        stakingAddress,
        userAddress
      );
      if (response) {
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
    if (currentStep.status === "pending") {
      location.state.id = currentStep.stepFlow;
      let splitted = currentStep.stepFlowStep.name.split("-");
      location.state.name = splitted[0].trim() + " - " + splitted[1].trim();
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
    }
  };

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title f-mb-2">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRM-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={24} weight={700}>
            Withdraw Crucible Stake Rewards
          </FTypo>
        </FItem>
      </div>
      <FGrid className={"f-mb-1"}>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              FRM Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>

      <FGrid>
        <FGridItem size={[12, 12, 12]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1" align={"center"}>
              Your unclaimed Rewards
            </FTypo>
            <FTypo
              size={36}
              weight={500}
              className="primary-color"
              align={"center"}
            >
              {userStake?.rewardOf || 0} {crucible.symbol}
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>

      <div className="btn-wrap f-mt-2">
        <ApprovableButtonWrapper
          View={(ownProps) => (
            <FButton
              title={"Withdraw Rewards"}
              className={"w-100"}
              onClick={
                ownProps.isApprovalMode
                  ? () => ownProps.onApproveClick()
                  : () =>
                      onWithdrawClick(
                        crucible!.currency,
                        (crucible?.staking || [])[0]?.address || "",
                        userStake?.rewardOf || 0,
                        true,
                        crucible?.network,
                        walletAddress as string
                      )
              }
            ></FButton>
          )}
          currency={crucible!.currency}
          contractAddress={CRUCIBLE_CONTRACTS_V_0_1["BSC"].router}
          userAddress={walletAddress as string}
          amount={"0.0001"}
        />
      </div>

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
