import { FButton, FCard, FGrid, FGridItem, FItem, FTypo } from 'ferrum-design-system';
import { WalletConnector } from 'foundry';
import React, { useState } from 'react';
import { ConnectWalletDialog } from '../../../connect-wallet/ConnectWalletDialog';
import { ApprovalWalletDialog } from '../ApprovalWalletDialog';
interface Props {
    isConnected: any;
}
const PrivateRoundCard = ({ isConnected }: Props) => {
    const [approvalModal, setApprovalModal] = useState(false);
    const [isApproved, setIsApproved] = useState(false);
    return (
        <>
            <div className={'ml_0 vesting-option-card'}>
                <FTypo size={25} weight={400} color="#DAB46E" className={"f-pb-1"}>
                    Private Round
                </FTypo>
                <FGrid className={'f-mt--3'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#6F767E" className={"f-pb--2"}>
                            Allocation
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            0.0
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#6F767E" className={"f-pb--2"}>
                            Claimable
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            0.0
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                </FGrid>
                <FGrid className={'f-mt-2'}>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#6F767E" className={"f-pb--2"}>
                            Total Claimed
                        </FTypo>
                        <FTypo size={22} weight={600} color="white" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            0.0
                            <FTypo size={14} weight={400} color="white" className={"f-pl--5 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignX="left">
                        <FTypo size={16} weight={400} color="#6F767E" className={"f-pb--2"}>
                            Networks
                        </FTypo>
                        <div style={{ display: "flex" }}>
                            <div className={'white-small-box'}>
                                <span className={'custom-font-size-14 font-400'}>BEP20</span>
                            </div >
                            <div className={'white-small-box f-mr--8'}>
                                <span className={'custom-font-size-14 font-400'}>ERC20</span>
                            </div >
                        </div>
                    </FGridItem>
                </FGrid>
                <div>
                    <FTypo size={20} weight={400} color="#6F767E" className={"f-mt-2"}>
                        Vesting
                    </FTypo>
                    <FTypo size={16} weight={400} color="white" className={"f-mt--8"}>
                        10% at TGE, 1 month cliff + 7 months linear
                    </FTypo>
                </div>
                {isApproved &&
                    <div>
                        <FTypo size={16} weight={400} color="white" className={"f-mt-3"}>
                            Amount to Claim
                        </FTypo>
                        <div className={'custom_input_wrap d_flex justify_between custom-padding-10 align_center f-mt--8'}>
                            <FTypo size={14} weight={400} color="white">
                                1111111
                            </FTypo>
                            <FTypo size={14} weight={400} color="#DAA961" className={'text_right'}>
                                MAX
                            </FTypo>

                        </div>
                    </div>
                }
                <div className={`d_flex justify_end align_center ${isApproved ? 'f-mt-1' : 'f-mt-4'}`}>
                    {isConnected ?
                        <FButton
                            className={`custom-font-size-14 clr_black font-700 font-face-mod ${!isApproved && 'connectBtn bg-transparent clr_white'}`}
                            onClick={() => { setApprovalModal(true) }}
                            title={`${isApproved ? 'Claim' : 'Approve to Claim'}`}
                            variant={`${isApproved && 'primary'}`} />
                        :
                        <WalletConnector.WalletConnector
                            WalletConnectView={FButton}
                            WalletConnectModal={ConnectWalletDialog}
                            WalletConnectViewProps={{
                                className: "custom-font-size-14 font-700 connectBtn clr_black font-face-mod",
                                variant: "primary"
                            }}
                        />
                    }
                </div>
                {approvalModal &&
                    <ApprovalWalletDialog
                        show={approvalModal}
                        onHide={() => { setApprovalModal(false) }}
                        setApprovalModal={setApprovalModal}
                        setIsApproved={setIsApproved} />
                }
            </div>
        </>
    )
}
export default PrivateRoundCard;







