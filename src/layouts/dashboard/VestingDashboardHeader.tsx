import React, { useEffect, useState } from "react";
import { FButton, FGrid, FGridItem, FTypo } from "ferrum-design-system";
import { WalletConnector } from "foundry";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { FToggle } from "../../components/global/switch";
import { ConnectWalletDialog } from "../../components/vesting/connect-wallet/ConnectWalletDialog";
import bnbIcon from "../../assets/img/yellow-bnb.svg";

const VestingDashboardHeader = ({ title }: any) => {
  const { isConnected, isConnecting, walletAddress } = useSelector((state: RootState) => state.walletConnector);
  const [myClaims, setMyClaims] = useState(false);

  return (
    <FGrid className={'w-100 bg_black_new justify-content-space-between align-item-center header_layout ml-mr-0'}>
      <FGridItem alignX="left" size={[4, 4, 4]}>
        <div className={'d-flex justify_start align-item-center'}>
          {/* <img src={IconRandom} alt={IconRandom} height="58px" width="50px"></img> */}
          {/* <p className="f-pl--5 custom-font-size-20">YOUR LOGO</p> */}
        </div>
      </FGridItem>
      <FGridItem alignX="end" alignY="center" size={[8, 8, 8]}>
        {isConnected &&
          <>
            <div className={'f-mr-1 d-flex align-item-center justify_start'}>
              <FTypo size={12} weight={700} color="white" className={"f-pr--7"}>
                My claims
              </FTypo>
              <FToggle isChecked={myClaims} setIsChecked={setMyClaims} isVesting={true} />
            </div>
            <div className={'wallet_address_card d-flex align-item-center justify_start'}>
              <img src={bnbIcon} alt={bnbIcon} style={{ width: 28, height: 28 }} />
              <FTypo size={12} width={145} weight={700} color="white" className={"f-pl--2"} truncate={{ truncateLength: 7, truncatePosition: "center" }}>
                {walletAddress}
              </FTypo>
              <div className={'BNB_card d-flex align-item-center justify_center text_center'}>
                <FTypo size={12} weight={700} family={'Aber Mono'} color="white">
                  1212
                </FTypo>
                <FTypo size={10} weight={700} family={'Aber Mono'} color="#F3BA2F" className={"f-pl--2"}>
                  BNB
                </FTypo>
              </div>
            </div>
          </>
        }
        <WalletConnector.WalletConnector
          WalletConnectView={FButton}
          WalletConnectModal={ConnectWalletDialog}
          WalletConnectViewProps={{
            className: "custom-font-size-14 font-700 connectBtn clr_black font-face-mod",
            variant: "primary"
          }}
        />
      </FGridItem>
    </FGrid>
  );
};

export default VestingDashboardHeader;
