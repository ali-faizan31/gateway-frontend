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
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bsc.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";

export const Stake = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  // const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const onApproveClick = () => {
    setTransitionStatusDialog(true);
    // setIsApproving(true);
  };

  useEffect(() => {
    console.log("approvedDone", approvedDone);
  }, [approvedDone]);

  const onStakeClick = () => {
    setIsProcessing(true);
    // setIsApproving(false);
    setTransitionStatusDialog(true);
  };

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRMx/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
            Stake cFRMx
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
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRMx Price (USD)
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
        placeholder="Amount to Stake"
        postfix={
          <FTypo color="#DAB46E" className={"f-pr-1"}>
            Max
          </FTypo>
        }
      />
      <FTypo color="#DAB46E" size={15} className={"f-mt-1 f-pl--5"}>
        You have 100000.000 available in cFRMx
      </FTypo>
      {approvedDone ? (
        <div className="btn-wrap f-mt-2">
          <FButton
            title={"Stake Crucible"}
            className={"w-100"}
            onClick={() => onStakeClick()}
          ></FButton>
        </div>
      ) : (
        <div className="btn-wrap f-mt-2">
          <FButton
            title={"Approve"}
            className={"w-100"}
            onClick={() => onApproveClick()}
          ></FButton>
        </div>
      )}

      <DialogTransitionStatus
        transitionStatusDialog={transitionStatusDialog}
        setTransitionStatusDialog={setTransitionStatusDialog}
        isProcessing={isProcessing}
        setIsProcessing={setIsProcessing}
        setapprovedDone={setapprovedDone}
      />
    </FCard>
  );
};
