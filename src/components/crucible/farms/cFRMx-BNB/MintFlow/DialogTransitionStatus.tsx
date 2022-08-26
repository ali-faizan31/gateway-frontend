import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { FButton, FItem, FLoader, FTypo } from "ferrum-design-system";
import { ReactComponent as IconApprove } from "../../../../../assets/img/new-transaction-approved.svg";
import IconSubmitted from "../../../../../assets/img/icon-transaction-submitted.svg";
import underLine from "../../../../../assets/img/lines-in-end.svg"
import Loader from "../../../../../assets/gif/wallet-transaction-loader.gif";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import {
  linkForTransaction,
  addToken,
} from "./../../../../../container-components/web3Client/types";
import { getActualRoute } from "../../../common/Helper";
import { FDialog } from "../../../../vesting/ferrum-design-system/Fdialog/Fdialog";

export const DialogTransitionStatus = ({
  transitionStatusDialog,
  setTransitionStatusDialog,
  isProcessing,
  isProcessed,
  setapprovedDone,
  setIsProcessing,
  isSubmitted,
  network,
  tx,
  crucible,
}: any) => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  // const [approved, setApproved] = useState(false);
  //const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // setApproved(true);
    // setTimeout(() => {
    //   setApproved(false);
    //   setapprovedDone(true);
    //   if (isProcessing === false){
    //   setTransitionStatusDialog(false)
    //   }
    // }, 3000);
    // setTimeout(() => {
    //   setSubmitted(false);
    //   setProcessed(true);
    // }, 6000);
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
      {isProcessing ? (
        <React.Fragment>
          <FItem align="center">
            <img src={Loader} alt={''} style={{ width: 100, height: 100 }} />
            <FTypo size={20} weight={700} className="f-mt-1 f-pb-3">Confirm This Transaction in your Wallet.</FTypo>
          </FItem>
        </React.Fragment>
      ) : isSubmitted === true ? (
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
            <img src={underLine} alt="" className={'f-mb-3 f-mt-1'} />
          </FItem>
        </React.Fragment>
      ) : isProcessed === true ? (
        <React.Fragment>
          <FItem align="center">
            <img src={IconSubmitted} style={{ width: 100, height: 100 }} alt="" />
            <FTypo color="#FFFFFF" size={20} weight={700} className="f-mt-1">
              Transaction Submitted
            </FTypo>
            <FTypo size={14} weight={700} className="f-mt-1 cursor-pointer">
              <span
                onClick={() =>
                  window.open(linkForTransaction(network, tx), "_blank")
                }
              >
                View on Explorer
              </span>
            </FTypo>
            <FItem>
              <FButton
                title={"ADD TOKEN TO METAMASK"}
                outlined
                variant={"secondary"}
                className="f-mt-2 f-mb-1 custom-font-size-16 font-700 primary-border btn-44-h"
                onClick={() =>
                  addToken({
                    currency: crucible?.contractAddress,
                    address: crucible?.contractAddress,
                    symbol: crucible?.symbol,
                    decimals: 18,
                    logoURI: "",
                  })
                }
              />
            </FItem>
            <FItem>
              <FButton
                title={"CONTINUE TO NEXT STEP"}
                className="btn-step f-mt-1 f-mb-3 custom-font-size-16 font-700 btn-44-h clr_black_new"
                onClick={() =>
                  history.push({
                    pathname: getActualRoute(
                      farm,
                      PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.steps
                    ),
                  })
                }
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
              <span onClick={() => { }}>Continue.</span>
            </FTypo>
          </FItem>
        </React.Fragment>
      )}
    </FDialog>
  );
};
