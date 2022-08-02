import React, { useEffect, useState } from "react";
import { FButton, FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/rootReducer";
import { FDialog } from "../../ferrum-design-system/Fdialog/Fdialog";
import transactionUpdatedImg from '../../../../assets/img/transaction-updated.svg';

export const ApprovalWalletDialog = ({
  show,
  onHide,
  setApprovalModal,
  setIsApproved,
}: any) => {
  const [isApproving, setIsApproving] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isApprovalDone, setIsApprovalDone] = useState(false);
  const { walletAddress } = useSelector((state: RootState) => state.walletConnector);
  useEffect(() => {
    if (isApproving) {
      setTimeout(function () {
        setIsApproving(false);
        setIsInProgress(true);
      }, 3000);
    }
  })
  useEffect(() => {
    if (isInProgress) {
      const myTimeout = setTimeout(function () {
        setIsInProgress(false);
        setIsApprovalDone(true);
        clearTimeout(myTimeout);
      }, 3000);
    }
  }, [isInProgress])
  return (
    <FDialog
      show={show}
      onHide={onHide}
      size="medium"
      showClose={false}
      variant={'crucibleApprovalModal'}
      className="dialog-connect-wallet text-center"
    >
      <div className="f-pb-2">
        <div className={'d_flex justify_center align_center f-mb-2 f-mt-2'}>
          {/* <ClipLoader color="#fff" size={70} speedMultiplier={0.6} /> */}
          {isApprovalDone ?
            <img src={transactionUpdatedImg} alt={transactionUpdatedImg} />
            :
            <div className="loader"></div>
          }
        </div>
        <FTypo size={24} weight={700} color="white">
          {isApproving ?
            <span>
              Approving your wallet. < br />
              Please wait!
            </span>
            : isInProgress ?
              <>
                <span>Transaction in progress.</span>
                <FTypo size={16} weight={400} color="white" className={'f-mt-1'}>
                  Transaction ID
                </FTypo>
                <FTypo size={16} weight={400} color="white" className={'f-mt--5'} truncate={{ truncateLength: 7, truncatePosition: "center" }}>
                  {walletAddress}
                </FTypo>
              </>
              : isApprovalDone ?
                'Approved'
                :
                null
          }
        </FTypo>
        {isApprovalDone &&
          <div className={'d_flex justify_center align_center f-mt-2'}>
            <FButton
              className={`custom-font-size-14 font-700 connectBtn`}
              onClick={() => {
                setApprovalModal(false);
                setIsApproved(true);
              }}
              title={'Continue'} />
          </div>
        }
      </div>
    </FDialog>
  );
};
