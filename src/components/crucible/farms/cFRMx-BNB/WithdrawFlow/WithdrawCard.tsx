import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FInputText, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bsc.svg";
import { DialogTransitionStatus } from "./DialogTransitionStatus";

export const Withdraw = () => {
  const [transitionStatusDialog, setTransitionStatusDialog] = useState(false);
  const [approvedDone, setapprovedDone] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    console.log("approvedDone", approvedDone)
  }, [approvedDone])


  const onWithdrawClick = () => {
    setIsProcessing(true);
    setIsApproving(false);
    setTransitionStatusDialog(true);
  }

  return (
    <FCard variant={"secondary"} className="card-deposit  card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible/cFRM-BNB/manage" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
            Withdraw Crucible Stake Rewards
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
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>

      <FGrid>
        <FGridItem size={[12, 12, 12]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1" align={"center"}>
              Your unclaimed Rewards
            </FTypo>
            <FTypo size={36} weight={500} className="primary-color" align={"center"}>
            99999999.999 cFRM
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>


      <div className="btn-wrap f-mt-2">
        <FButton title={"Withdraw Rewards"} className={"w-100"} onClick={() => onWithdrawClick()}></FButton>
      </div>

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
