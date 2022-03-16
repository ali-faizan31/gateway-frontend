import React from 'react'
import { FButton, FGrid, FGridItem, FItem } from "ferrum-design-system";
import { ConnectWalletDialog } from '../../utils/connect-wallet/ConnectWalletDialog';
import { MetaMaskConnector } from '../../container-components'; 
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const CrucibleActionButtons = ({ isConnected }: any) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const mintStakeWithdrawButtons = () => {

        return (<>
        <FGrid>
            <FGridItem dir={"row"} size={[4, 4, 4]}> <FButton title="Mint" className={"w-100"}/> </FGridItem>
            <FGridItem size={[4, 4, 4]}>  <FButton title="Stake" className={"w-100"} variant="secondary"/> </FGridItem>
            <FGridItem size={[4, 4, 4]}>  <FButton title="Withdraw" className={"w-100"} outlined/> </FGridItem>
        </FGrid>
        </>)
    }

    return (<>
        {isConnected ? mintStakeWithdrawButtons() :
            <MetaMaskConnector.WalletConnector
                WalletConnectView={FButton}
                WalletConnectModal={ConnectWalletDialog}
                isAuthenticationNeeded={false}
                WalletConnectViewProps={{
                    className: "mt-3 w-100"
                }}
            />
        }
    </>
    )
}

export default CrucibleActionButtons