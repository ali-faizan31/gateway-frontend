import React, { useEffect, useState } from "react";
import { FButton, FCard, FDialog, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { ClipLoader } from "react-spinners";

export const ApprovalWalletDialog = ({
  show,
  onHide,
  setApprovalModal,
  setIsApproved,
}: any) => {
  const [isApproving, setIsApproving] = useState(true);
  const [isInProgress, setIsInProgress] = useState(false);
  const [isApprovalDone, setIsApprovalDone] = useState(false);
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
      variant={'whiteLabeled'}
      className="dialog-connect-wallet text-center"
    >
      <div className="f-pb-2">
        <div className={'d_flex justify_center align_center f-mb-2 f-mt-2'}>
          {/* <ClipLoader color="#fff" size={70} speedMultiplier={0.6} /> */}
          <div className="loader"></div>
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
                <FTypo size={16} weight={400} color="white" className={'f-mt--5'}>
                  0x66giu393.....883343434
                </FTypo>
              </>
              : isApprovalDone ?
                'Approved'
                :
                null
          }
        </FTypo>
        {/* <FTypo size={24} weight={700} color="white">
        Transaction in progress.
        <FTypo size={16} weight={400} color="white" className={'f-mt-1'}>
          Transaction ID
        </FTypo>
        <FTypo size={16} weight={400} color="white" className={'f-mt--5'}>
          0x66giu393.....883343434
        </FTypo>
      </FTypo> */}
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
