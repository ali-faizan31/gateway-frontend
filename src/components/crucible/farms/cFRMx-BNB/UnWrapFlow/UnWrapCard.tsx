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
import { Web3Helper } from "./../../../../../container-components/web3Client/web3Helper";
import { CrucibleClient } from "./../../../../../container-components/web3Client/crucibleClient";
import { ApprovableButtonWrapper } from "./../../../../../container-components/web3Client/approvalButtonWrapper";
// import { useHistory, useLocation } from "react-router";
// import { useWeb3React } from "@web3-react/core";
import { CRUCIBLE_CONTRACTS_V_0_1 } from "./../../../common/utils";
import { RootState } from "../../../../../redux/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import { BigUtils } from "./../../../../../container-components/web3Client/types";

export const UnWrap = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const location: any = useLocation();
  // const history = useHistory();
  //@ts-ignore
  const crucible = useSelector(
    (state: RootState) => state.crucible.selectedCrucible
  );
  //@ts-ignore
  const userCrucibleData = useSelector(
    (state: RootState) => state.crucible.userCrucibleDetails
  );
  const {
    // isConnected,
    // isConnecting,
    walletAddress,
    // walletBalance,
    networkClient,
  } = useSelector((state: RootState) => state.walletConnector);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);

  // const onApproveClick = () => {
  //   setTransitionStatusDialog(true);
  //   setIsApproving(true);
  // }

  useEffect(() => {
    console.log("approvedDone", approvedDone);
  }, [approvedDone]);

  const onUnWrapClick = async (
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

      const response = await client.unwrapCrucible(
        dispatch,
        currency,
        crucibleAddress,
        amount,
        isPublic,
        network,
        userAddress,
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

  // const onUnWrapClick = () => {
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
          <FTypo size={30} weight={600}>
            Unwrap Crucible Token
          </FTypo>
        </FItem>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              FRM Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRM Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FInputText
        className={"f-mt-1"}
        inputSize="input-lg"
        type={"text"}
        placeholder="0"
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
            <span onClick={() => setAmount(userCrucibleData?.balance || "0")}>
              Max
            </span>
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have {userCrucibleData?.balance || "0"} available in Token{" "}
        {userCrucibleData?.symbol}.
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
        value={
          Number(amount) -
          Number(amount) *
          (Number(
            BigUtils.safeParse(crucible?.feeOnWithdrawRate || "0").times(100)
          ) /
            100)
        }
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1 f-mt-1"}>
            FRM
          </FTypo>
        }
      />
      {
        <ApprovableButtonWrapper
          View={(ownProps) => (
            <div className="btn-wrap f-mt-2">
              <FButton
                title={"Unwrap"}
                className={"w-100"}
                onClick={
                  ownProps.isApprovalMode
                    ? () => ownProps.onApproveClick()
                    : () =>
                      onUnWrapClick(
                        crucible!.baseCurrency,
                        crucible?.currency || "",
                        amount.toString(),
                        true,
                        crucible?.network,
                        walletAddress as string
                      )
                }
              ></FButton>
            </div>
          )}
          currency={crucible!.currency}
          contractAddress={CRUCIBLE_CONTRACTS_V_0_1["BSC"].router}
          userAddress={walletAddress as string}
          amount={"0.0001"}
        />
      }

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
