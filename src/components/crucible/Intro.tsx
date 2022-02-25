import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
    FButton,
    FCard,
    FCardTitle,
    FContainer,
    FDivider,
    FGridItem,
    FInputText,
    FGrid,
    FLabel
} from "ferrum-design-system";
import { RootState } from "../../redux/rootReducer";
import { info } from 'console';
import { MetaMaskConnector } from '../../container-components';
import { ConnectWalletDialog } from '../../utils/connect-wallet/ConnectWalletDialog';

const Intro = () => {

    const cardData = ({ title, value, token }: any) => {
        return (<>
            <FCard variant="secondary">
                <div className='font-10'>{title}</div>
                <h3 className='f-mt-2'>{value} {token} </h3>
            </FCard>
        </>)
    }

    const info = ({ title, value }: any) => {
        return (<>
            <div className='justify-content-space-between'>
                <div> {value}  </div>
                <div className='font-10 text-end'> {title} </div>
            </div>
        </>)
    }

    const { walletAddress, isConnected } = useSelector((state: RootState) => state.walletConnector)
    return (<>
        <FContainer width={700}>
            <FCard variant="primary">
                <FCardTitle>
                    <h2> W Crucible Beta </h2>
                </FCardTitle>
                <FGrid>
                    <FGridItem size={[6, 6, 6]} alignY={"center"}  className={"f-mt-1"}>
                        {cardData({ title: "Transfer fee", value: "2%" })}
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignY={"center"}  className={"f-mt-1"}>
                        {cardData({ title: "Total Supply", value: "28208.941", token: "wCBTe" })}
                    </FGridItem>
                </FGrid>
                <FGrid>
                    <FGridItem size={[6, 6, 6]} alignY={"center"}  className={"f-mt-1"}>
                        {cardData({ title: "CBT Price (USD)", value: "$0" })}
                    </FGridItem>
                    <FGridItem size={[6, 6, 6]} alignY={"center"}  className={"f-mt-1"}>
                        {cardData({ title: "wCBTe Price (USD)", value: "$0" })}
                    </FGridItem>
                </FGrid>

                <FCard className={"f-mt-2 position-relative overflow-visible"} variant="secondary">
                    <h5 className={"mint-info-tag"}>Minting Is Open ( 2571306 Open Cap)</h5> 
                    <h3 className='font-10 f-mb-1'>Your Available Crucible Liquidity</h3>
                    {info({ title: "wCBTe", value: "0" })}
                    {info({ title: "Your Staked Volume", value: "0 wCBTe" })}
                    {info({ title: "Your Total Reward(s) Accrued", value: "0 wCBTe" })}
                </FCard>

                <p className='primary-color text-center f-mt-1 f-mb-1'>This Crucible Token attracts 4% on withdrawal to base Token.</p>


                {/* <MetaMaskConnector.WalletConnector
                    WalletConnectView={FButton}
                    WalletConnectModal={ConnectWalletDialog}
                    WalletConnectViewProps={{
                        className: "mt-3 w-100" 
                    }}
                /> */}
            </FCard>
        </FContainer>
    </>)
}

export default Intro