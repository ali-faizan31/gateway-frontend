import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FButton, FItem, FLoader, FTypo } from "ferrum-design-system";
import { ReactComponent as IconApprove } from "../../../assets/img/new-transaction-approved.svg";
import IconSubmitted from "../../../assets/img/icon-transaction-submitted.svg";
import underLine from "../../../assets/img/lines-in-end.svg"
import Loader from "../../../assets/gif/loader.svg";
import { FDialog } from "../../vesting/ferrum-design-system/Fdialog/Fdialog";

export const DialogTransitionStatus = ({
  transitionStatusDialog,
  setTransitionStatusDialog,
  isProcessing,
  setapprovedDone,
  setIsProcessing,
}: any) => {
  const history = useHistory();
  const [approved, setApproved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    setApproved(true);
    setTimeout(() => {
      setApproved(false);
    }, 3000);
  }, []);

  const transactionContinue = () => {
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setProcessed(true);
    }, 6000);
  };

  console.log(approved);
  const onclose = () => {
    setTransitionStatusDialog(false);
  };
  return (
    <FDialog
      size={"medium"}
      variant={"new-popup"}
      show={transitionStatusDialog}
      onHide={() => onclose()}
      className="transaction-status text-center"
      showClose={true}
    >
      {approved ? (
        <React.Fragment>
          <FItem align="center">
            <FLoader loading={true} width={100} loaderImage={Loader} />
            <FTypo size={20} weight={700} className="f-mt-1 f-pb-3">
              Confirm This Transaction in your Wallet.
            </FTypo>
          </FItem>
        </React.Fragment>
      ) : submitted === true ? (
        <React.Fragment>
          <FItem align="center">
            <img src={IconSubmitted} style={{ width: 100, height: 100 }} alt="" />

            <FTypo color="#FFFFFF" size={20} weight={700} className="f-mt-1">
              Transaction Submitted
            </FTypo>
            <FTypo size={14} weight={700} className="f-mt-1">
              View on Explorer
            </FTypo>
            <FButton
              title={"ADD TOKEN TO METAMASK"}
              outlined
              variant={"secondary"}
              className="f-mt-2 f-mb-1 custom-font-size-16 font-700 primary-border btn-44-h"
            />
            <FTypo size={12} weight={700} color={'#D9B373'} className={'f-mt--5'}>
              Tx Processing - Please Wait
            </FTypo>
            <img src={underLine} alt="" className={'f-mb-2 f-mt-1'} />
          </FItem>
        </React.Fragment>
      ) : processed === true ? (
        <React.Fragment>
          <FItem align="center">
            <IconApprove />
            <FTypo color="#FFFFFF" size={20} weight={700} className="f-mt-1">
              Transaction Submitted
            </FTypo>
            <FTypo size={14} weight={700} className="f-mt-1">
              View on Explorer
            </FTypo>
            <FItem>
              <FButton
                title={"ADD TOKEN TO METAMASK"}
                outlined
                variant={"secondary"}
                className="f-mt-2 f-mb-1 custom-font-size-16 font-700 primary-border btn-44-h"
              />
            </FItem>
            <FItem>
              <FButton
                title={"CONTINUE TO NEXT STEP"}
                className="btn-step f-mt-1 f-mb-1  custom-font-size-16 font-700 btn-44-h"
                onClick={() => history.push("/dashboard/crucible/steps")}
              />
            </FItem>
          </FItem>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <FItem align="center">
            <IconApprove />
            <FTypo color="#DAB46E" size={22} weight={600} className="f-mt-1">
              Approved
            </FTypo>
            <FTypo size={20} className="f-mt-1 f-pb-3">
              <span onClick={() => transactionContinue()}>Continue.</span>
            </FTypo>
          </FItem>
        </React.Fragment>
      )}
    </FDialog>
  );
};
