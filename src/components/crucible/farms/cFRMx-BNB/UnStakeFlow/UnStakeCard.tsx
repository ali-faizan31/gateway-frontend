import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { RootState } from "../../../../../redux/rootReducer";
import { ApprovableButtonWrapper } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { CRUCIBLE_CONTRACTS_V_0_1 } from "./../../../common/utils";

export const UnStake = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);

  //@ts-ignore
  const crucible = useSelector((state) => state.crucible.selectedCrucible);
  //@ts-ignore
  const tokenPrices = useSelector((state) => state.crucible.tokenPrices);
  const {
    //  isConnected, isConnecting,
    walletAddress,
    //  walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  const dispatch = useDispatch();
  //@ts-ignore
  const LPStakingDetails = useSelector(
    (state: RootState) => state.crucible.userLpStakingDetails
  );
  console.log(LPStakingDetails, crucible, "tcrucibleokenPricestokenPrices234");

  // const onApproveClick = () => {
  //   setTransitionStatusDialog(true);
  //   setIsApproving(true);
  // };

  useEffect(() => {
    console.log("approvedDone", approvedDone);
  }, [approvedDone]);

  const onUnStakeClick = async (
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

      const response = await client.unstakeLPToken(
        dispatch,
        currency,
        userAddress,
        amount,
        stakingAddress,
        network,
        setTransitionStatusDialog
      );
      if (response) {
        setIsProcessing(false);
        //setIsSubmitted(true)
        setIsProcessed(true);
      }
      //setIsApproving(false);
      //setTransitionStatusDialog(true);
    }
  };

  // const onUnStakeClick = () => {
  //   setIsProcessing(true);
  //   setIsApproving(false);
  //   setTransitionStatusDialog(true);
  // }

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRMx-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
            Unstake cFRMx / BNB LP Token
          </FTypo>
        </FItem>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              FRMx Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              ${tokenPrices["cFRM-BNB-LP"] || 0}
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              ${tokenPrices["cFRMx"] || 0}
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FInputText
        className={"f-mt-1"}
        inputSize="input-lg"
        type={"text"}
        value={amount}
        placeholder="Amount to unstake"
        onChange={(e: any) => setAmount(e.target.value)}
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
            <span
              onClick={() =>
                setAmount(LPStakingDetails["cFRMx_BNB_LP"]?.stake || 0)
              }
            >
              Max
            </span>
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have {LPStakingDetails["cFRMx_BNB_LP"]?.stake} cFRMx / BNB LP
        available to unstake.
      </FTypo>

      <div className="btn-wrap f-mt-2">
        <ApprovableButtonWrapper
          View={(ownProps) => (
            <FButton
              title={ownProps.isApprovalMode ? "Approve" : "UnStake LP"}
              className={"w-100"}
              onClick={
                ownProps.isApprovalMode
                  ? () => ownProps.onApproveClick()
                  : () =>
                      onUnStakeClick(
                        LPStakingDetails["cFRMx_BNB_LP"]?.stakeId,
                        LPStakingDetails["cFRMx_BNB_LP"]?.stakingAddress || "",
                        amount.toString(),
                        true,
                        crucible?.network,
                        walletAddress as string
                      )
              }
            ></FButton>
          )}
          currency={`${crucible?.network}:${LPStakingDetails["cFRMx_BNB_LP"]?.LPaddress}`}
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
        setapprovedDone={setapprovedDone}
        isSubmitted={false}
        isProcessed={isProcessed}
        crucible={crucible}
      />
    </FCard>
  );
};
