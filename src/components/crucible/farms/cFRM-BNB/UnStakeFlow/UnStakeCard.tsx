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
import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { ApprovableButtonWrapper } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
import { CRUCIBLE_CONTRACTS_V_0_1 } from "./../../../common/utils";

export const UnStake = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  //@ts-ignore
  const crucible = useSelector((state) => state.crucible.selectedCrucible);
  const {
    isConnected,
    isConnecting,
    walletAddress,
    walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  const [isProcessed, setIsProcessed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  //@ts-ignore
  const userCrucibleData = useSelector(
    (state: RootState) => state.crucible.userCrucibleDetails
  );
  let userStake = (userCrucibleData.stakes || []).find(
    (e: any) => e.address === "0xAb0433AA0b5e05f1FF0FD293CFf8bEe15882cCAd"
  );
  console.log(userStake);
  const dispatch = useDispatch();

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

      const response = await client.UnStakeCrucible(
        dispatch,
        currency,
        amount,
        stakingAddress,
        userAddress,
        network
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
          <Link to="/dashboard/crucible/cFRM-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={24} weight={700}>
            Unstake cFRM / BNB LP Token
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
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FInputText
        className={"f-mt-1"}
        inputSize="input-lg"
        type={"text"}
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
        placeholder="Amount to unstake"
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
            <span onClick={() => setAmount(Number(userStake?.stakeOf || "0"))}>
              Max
            </span>
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have {Number(userStake?.stakeOf || "0").toFixed(3)} cFRM / BNB LP
        available to unstake.
      </FTypo>

      <div className="btn-wrap f-mt-2">
        <ApprovableButtonWrapper
          View={(ownProps) => (
            <FButton
              title={"Unstake Crucible"}
              className={"w-100"}
              onClick={
                ownProps.isApprovalMode
                  ? () => ownProps.onApproveClick()
                  : () =>
                      onUnStakeClick(
                        crucible!.currency,
                        (crucible?.staking || [])[0]?.address || "",
                        amount.toString(),
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
        setapprovedDone={setapprovedDone}
        isSubmitted={isSubmitted}
        isProcessed={isProcessed}
        crucible={crucible}
      />
    </FCard>
  );
};
