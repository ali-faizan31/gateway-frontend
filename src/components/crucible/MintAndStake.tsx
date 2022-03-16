import { FButton, FCard, FContainer, FDialog, FInputText, FItem } from 'ferrum-design-system'
import React, { useEffect, useState } from 'react'
import { RiArrowRightCircleLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../redux/rootReducer';
import { PATH_DASHBOARD } from '../../routes/paths';

const MintAndStake = () => {
    const history = useHistory();
    const mintToken = 'FRM';
    const { userProfile } = useSelector((state: RootState) => state.walletApplicationWrapper);
    const [isApproved, setIsApproved] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [approvedModal, setApprovedModal] = useState(false);
    const [isTransactionCompleted, setIsTransactionCompleted] = useState(false);

    return (
        <>
            <FContainer width={700}>
                {approvedModal ?
                    <FCard variant="primary">

                        <FItem className={"f-mt-2 f-mb-2"} align="center">
                            <h2 className='primary-color f-mb-1'>Congratulations!</h2>
                            <img src="/ferrum/check-with-circle.svg" />
                        </FItem>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit aenean commodo ligula ege.</p>

                        <FButton title={"Mint & Stake"} className="w-100 f-mt-2 font-size-22" postfix={<img src="/ferrum/Get_Started.svg" />} onClick={() => setIsApproving(true)} />

                        <FButton title={"Go Back"} className="w-100 f-mt-2 font-size-22" onClick={() => setApprovedModal(false)} outlined />

                    </FCard>
                    : <FCard variant="primary">
                        <h2 className='primary-color f-mb-1'>Title lorem ipsum sit amet elit.</h2>
                        <p className='f-mb-1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>

                        <h3 className='f-mb-1 f-mt-1'> Mint crucible with {mintToken}</h3>

                        <FInputText
                            placeholder={`Enter ${mintToken}`}
                            prefix={<img src="" />}
                            postfix={<strong className='primary-color f-pr-1' onClick={() => console.log("max")}> Max </strong>}
                        />

                        <p className='f-mb-1 f-mt-1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>

                        <FButton title={"Approve"} className="w-100 f-mt-2 font-size-22" postfix={<img src="/ferrum/Get_Started.svg" />} onClick={() => setIsApproving(true)} />

                    </FCard>}
            </FContainer>

            <FDialog
                show={isApproving}
                size={"medium"}
                onHide={() => {
                    setIsApproving(false);
                    setIsApproved(true)
                }}>

                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <img src="/ferrum/loading.svg" />
                </FItem>
                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <h3 className='font-size-20'>Confirm This Transaction in your Wallet.</h3>
                </FItem>
            </FDialog>

            <FDialog
                show={isApproved}
                size={"medium"}
                onHide={() => {
                    setIsApproved(false)
                    setIsApproving(false);
                    setIsTransactionCompleted(true)
                }}>

                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <img src="/ferrum/big-check.svg" />
                </FItem>
                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <h1 className={`primary-color  custom-font-size-29`}>Approved</h1>
                    <h3 className='font-size-20 f-mt-1'>Continue.</h3>
                </FItem>
            </FDialog>

            <FDialog
                show={isTransactionCompleted}
                size={"medium"}
                onHide={() => {
                    setIsTransactionCompleted(false)
                    setApprovedModal(true)
                }}>

                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <img src="/ferrum/big-check.svg" />
                </FItem>
                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <h1 className={`primary-color  custom-font-size-29`}>Transaction Submitted</h1>
                    <h3 className='font-size-20 f-mt-1'>View on Explorer</h3>
                </FItem>
            </FDialog>
        </>
    )
}

export default MintAndStake