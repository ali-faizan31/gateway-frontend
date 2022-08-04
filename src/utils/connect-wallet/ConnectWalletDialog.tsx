import React from "react";
import IconMetaMask from "../../assets/img/icon-metamask.svg";
import IconWalletConnect from "../../assets/img/icon-wallet-connect.svg";
import { FDialog, FList, FListItem } from "ferrum-design-system";
import "./ConnectWalletDialog-styles.scss";

export const ConnectWalletDialog = ({
  show,
  onHide,
  metaMaskClickEvent,
  walletConnectClickEvent,
}: any) => {

  return (
    <FDialog
      show={show}
      onHide={onHide}
      size="medium"
      showClose={false}
      className="dialog-connect-wallet text-center"
    >
      {/* custom-padding-11 */}
      <FList display="block" type="number" variant="connect-wallet" className={'f-mb-2'}>
        <p className={'text_left custom-font-size-20 f-mb-2 font-400'}>Select Wallet</p>
        <FListItem display="flex" className={'cursor_pointer'} onClick={metaMaskClickEvent}>
          <p className={'text_left custom-font-size-24 clr_black_new font-700'}>MetaMask</p>
          <span className="icon-wrap">
            <img src={IconMetaMask} alt={IconMetaMask}></img>
          </span>
        </FListItem>
        <FListItem display="flex" className={'cursor_pointer'} onClick={walletConnectClickEvent}>
          <p className={'text_left custom-font-size-24 clr_black_new font-700'}>WalletConnect</p>
          <span className="icon-wrap">
            <img src={IconWalletConnect} alt={IconWalletConnect}></img>
          </span>
        </FListItem>
      </FList>
    </FDialog>
  );
};
