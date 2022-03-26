import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { FButton, FDialog, FItem, FLoader, FTypo } from "ferrum-design-system";
import { ReactComponent as IconApprove } from "../../../../../assets/img/icon-transaction-approved.svg";
import { ReactComponent as IconSubmitted } from "../../../../../assets/img/icon-transaction-submitted.svg";
import Loader from "../../../../../assets/gif/loader.svg";
import { PATH_DASHBOARD } from "../../../../../routes/paths";

export const DialogTransitionStatus = ({ transitionStatusDialog, setTransitionStatusDialog, isProcessing, setapprovedDone, setIsProcessing }: any) => {
  const history = useHistory();
  const [approved, setApproved] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [processed, setProcessed] = useState(false); 


  useEffect(() => {
  setApproved(true);
  setTimeout(() => {
    setApproved(false);
    setapprovedDone(true); 
    if (isProcessing === false){
    setTransitionStatusDialog(false)
    }
  }, 3000);
  setTimeout(() => {
    setSubmitted(false);
    setProcessed(true);
  }, 6000);
}, []);

  // useEffect(() => {
  //   if (isProcessing === false){
  //     setApproved(true);

  //     setTimeout(() => {
  //       setApproved(false);
  //       setapprovedDone(true)
  //     }, 3000);
  //   }

  //   if ( isProcessing ){ 
  //     setSubmitted(true); 
    
  //   setTimeout(() => {
  //     setSubmitted(false);
  //     setProcessed(true);
  //   }, 3000);
  // }
  // }, []);

const onclose = () => {
  setTransitionStatusDialog(false);

}

  return (
    <FDialog
      size={"medium"}
      show={transitionStatusDialog}
      onHide={() => onclose()}
      className="transaction-status text-center"
      showClose={true}>
      {approved ? (
        <React.Fragment>
          <FItem align="center">
            <FLoader loading={true} width={100} loaderImage={Loader} />
            <FTypo size={20}>Confirm This Transaction in your Wallet.</FTypo>
          </FItem>
        </React.Fragment>
      ) : submitted === true ? (
        <React.Fragment>
          <FItem align="center">
            <IconSubmitted />
            <FTypo color="#DAB46E" size={22} weight={600} className="f-mt-1">
              Transaction Submitted
            </FTypo>
            <FTypo size={20} weight={600} className="f-mt-1">
              View on Explorer
            </FTypo>
            <FButton title={"Add Token to Metamask"} outlined variant={"secondary"} className="f-mt-1 f-mb-1" />
            <FItem bgColor="#1D232B" align={"center"} className="f-pt--5 f-pb--5 f-pl-3 f-pr-3" display={"inline-block"}>
              <FTypo size={16} weight={500}>
                Tx Processing - Please Wait
              </FTypo>
            </FItem>
          </FItem>
        </React.Fragment>
      ) : processed === true ? (
        <React.Fragment>
          <FItem align="center">
            <IconSubmitted />
            <FTypo color="#DAB46E" size={22} weight={600} className="f-mt-1">
              Transaction Processed
            </FTypo>
            <FTypo size={20} weight={600} className="f-mt-1">
              View on Explorer
            </FTypo>
            <FItem>
              <FButton title={"Add Token to Metamask"} outlined variant={"secondary"} className="f-mt-1 f-mb-1" />
            </FItem>
            <FItem>
              <FButton title={"Continue To Next Step"} className="btn-step f-mt-1 f-mb-1" onClick={() => history.push({pathname: PATH_DASHBOARD.crucible.cFRM.withdraw.success})} />
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
              <span onClick={() => setApproved(true)}>Continue.</span>
            </FTypo>
          </FItem>
        </React.Fragment>
      )}
    </FDialog>
  );
};
