import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { WalletConnectorProps } from "./walletConnectorInterfaces";
import { walletConnectorActions } from ".";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./web3React/connectors";
import Web3 from "web3";
import { RootState } from "../../redux/rootReducer";
import { AiOutlineDisconnect, AiOutlineLoading3Quarters } from "react-icons/ai";
// import { GrConnect } from "react-icons/gr";
import { VscDebugDisconnect } from "react-icons/vsc";
import toast from "react-hot-toast";
import * as walletAuthenticatorActions from "../../components/common/wallet-authentication/redux/walletAuthenticationActions";
import 
// { getUserAccessToken, getNonce, verifySignatureToSignin} 
WalletAuthenticationSignIn
from "../../components/common/wallet-authentication/WalletAuthenticationSignIn";

import { getAccessTokenForApplicationUser, generateNonceByABN, verifySignatureAndSignin, isFerrumNetworkIdentifierAllowedonGateway } from "../../_apis/WalletAuthencation";
import { FDialog, FItem, FList, FButton, FGridItem} from "ferrum-design-system";


export const WalletConnector = ({WalletConnectView,  WalletConnectModal,  WalletConnectViewProps, }: WalletConnectorProps) => {
  
  const [showWalletDialog, setShowWalletDialog] = useState<boolean>(false);
  const [reconnect, setReconnect] = useState<boolean>(false);
  const [networkClient, setNetworkClient] = useState<Web3 | undefined>(undefined);
  const dispatch = useDispatch();
  const { active, activate, deactivate, library, account, chainId, error, connector } =  useWeb3React();
  const { isConnected, isConnecting, currentWalletNetwork, walletAddress } = useSelector((state: RootState) => state.walletConnector);
  const { nonce, applicationUserToken, signature, isAllowedonGateway, allowedNetworksonGateway  } = useSelector((state: RootState) => state.walletAuthenticator); 
  const [allowedNetworkModal, setAllowedNetworkModal] = useState<boolean>(false);


  useEffect(() => {
    if ( account && walletAddress && walletAddress !== account && isConnected && active ) { 
      activate(injected); 
      setReconnect(true);
    } 
  }, [walletAddress, account, isConnected, active]);

  useEffect(() => { 
    if ( chainId && currentWalletNetwork && currentWalletNetwork !== chainId && isConnected && active ) { 
      activate(injected); 
      setReconnect(true);
    } 
  }, [currentWalletNetwork, chainId, isConnected, active]);

  useEffect(() => {
    if (active && !isConnected && library && !networkClient) { 
      dispatch(walletConnectorActions.connectWallet());
      setNetworkClient(library);
    }
    if (!active && isConnected && !library && !isConnecting) { 
      activate(injected);
      setReconnect(true);
    } 
  }, [isConnected, active, library, isConnecting, networkClient]);

  useEffect(() => {
    if (reconnect && active) { 
      dispatch(walletConnectorActions.reconnectWallet());
      setNetworkClient(undefined);
      setReconnect(false);
    } 
  }, [reconnect, active]);
 
  // wallet authentication

  useEffect(() => {
      if ( isConnected && !applicationUserToken) {
        getUserAccessToken();
      }
      
      if (currentWalletNetwork && applicationUserToken && isAllowedonGateway === undefined){
        checkAllowedIdentifier(currentWalletNetwork, applicationUserToken)
      } 

      if ( isAllowedonGateway === false ){
        setAllowedNetworkModal(true);
        dispatch( walletAuthenticatorActions.error({ error: true }) );
      }

      if (!error && currentWalletNetwork &&  walletAddress && applicationUserToken && nonce === "" && isAllowedonGateway){
         getNonce(currentWalletNetwork, walletAddress, applicationUserToken);
      }
    }, [currentWalletNetwork, walletAddress, applicationUserToken, isConnected, isAllowedonGateway, error, nonce ]);  

    useEffect(() => {
      if (chainId === 56){
        dispatch( walletAuthenticatorActions.isAllowedOnGateway({ isAllowedOnGateway: true }) );
        dispatch( walletAuthenticatorActions.error({ error: false }) );
      }
    }, [chainId])
    

    useEffect(() => { 
      if (!error && currentWalletNetwork &&  walletAddress && applicationUserToken && signature){
         verifySignatureToSignin(currentWalletNetwork.toString(), walletAddress, signature, applicationUserToken);
      }
    }, [currentWalletNetwork, walletAddress, signature, applicationUserToken])

  useEffect(() => { 
    if ( active && networkClient && isConnected && account &&  nonce && currentWalletNetwork ) { 

    const msg = `0x${Buffer.from(
      `This signature verifies that you are the authorized owner of the wallet. The signature authentication 
      is required to ensure allocations are awarded to the correct wallet owner.${nonce}. id: ${currentWalletNetwork}`,
      "utf8"
    ).toString("hex")}`;

 
    networkClient.eth.personal.sign(msg, account, 
      "This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.",
       function (err, signature) {
        console.log(signature);   
        dispatch( walletAuthenticatorActions.saveSignature({ signature }) ); 
      })
    }
  }, [networkClient, library, isConnected, active, account, chainId, isConnecting, nonce, currentWalletNetwork])
  

  useEffect(() =>{
    if ( active && networkClient && library && !isConnected && account && chainId && isConnecting ) { 
 
      networkClient.eth
        .getBalance(account?.toString())
        .then((balance: String) => { 
          dispatch( walletConnectorActions.walletConnected({ chainId, account, balance, currentWallet: undefined, networkClient, }) );
        })
        .catch((err: any) => { 
          toast.error(err || "Error connecting wallet");
          dispatch(walletConnectorActions.resetWalletConnector());
        });
    } 
  }, [ networkClient, library, isConnected, active, account, chainId, isConnecting, ]);

  const openWalletSelectorDialog = () => { 
    if (!isConnecting) {
      if (!isConnected) {
        setShowWalletDialog(true);
      } else { 
        dispatch(walletConnectorActions.resetWalletConnector());
        setNetworkClient(undefined);
        deactivate();
      }
    } else {
    // console.log("wallet is already in connect state");
    }
  };

  // console.log(isConnecting, "isConnecting");
  // console.log(isConnected, "isConnected");
  // console.log(active, "active");
  // console.log(library, "library");
  // console.log(networkClient, "networkClient");
  // console.log(walletAddress, "walletAddress");
  // console.log(account, "account");
  // console.log(walletAddress === account);
  // console.log(chainId, "chainId");
  // console.log(currentWalletNetwork, "currentWalletNetwork");
  // console.log(currentWalletNetwork === chainId);
  // console.log(error);

  const connectMetaMask = () => { 
    if (isConnected) { 
      dispatch(walletConnectorActions.resetWalletConnector());
      setNetworkClient(undefined);
      deactivate();
    } else { 
      activate(injected);
      setShowWalletDialog(false);
      setNetworkClient(undefined);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(walletConnectorActions.resetWalletConnector());
    // console.log(error);
      toast.error(error?.message || "Error connecting wallet");
    } 
  }, [error]);

  const getUserAccessToken = () => {
    getAccessTokenForApplicationUser()
      .then((res: any) => {
        if (res && res.data && res.data.body && res.data.body.token) { 
          dispatch( walletAuthenticatorActions.saveApplicationUserToken({ userToken: res.data.body.token }) ); 
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(` Error Occured: user token ${e?.response?.data?.status?.message}`);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  }

  const checkAllowedIdentifier = async (identifier: any, applicationUserToken: any) => {
    isFerrumNetworkIdentifierAllowedonGateway(identifier, applicationUserToken)
      .then((res: any) => {
        if (res && res.data && res.data.body ) { 
          dispatch( walletAuthenticatorActions.isAllowedOnGateway({ isAllowedOnGateway: res.data.body.status }) ); 
          dispatch( walletAuthenticatorActions.allowedNetworksonGateway({ allowedNetworksonGateway: res.data.body.networks }) ); 
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(` Error Occured: allowed on gateway ${e?.response?.data?.status?.message}`);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      }); 
    }

    const getNonce = async (currentWalletNetwork: any, walletAddress: any, applicationUserToken: any) => {
    let data = { address: walletAddress, ferrumNetworkIdentifier: currentWalletNetwork.toString()}
    generateNonceByABN(data, applicationUserToken)
    .then((res: any) => {
      if (res && res.data && res.data.body && res.data.body.nonce) { 
        dispatch( walletAuthenticatorActions.saveNonce({ nonce: res.data.body.nonce }) ); 
      }
    })
    .catch((e) => {
      if (e.response) {
        toast.error(` Error Occured: nonce ${e?.response?.data?.status?.message}`);
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    });
  }

    const verifySignatureToSignin = (currentWalletNetwork: any, walletAddress: any, signature: any, applicationUserToken: any) => {
    let data = { address: walletAddress, ferrumNetworkIdentifier: currentWalletNetwork.toString(), signature: signature, role: "communityMember"};
    verifySignatureAndSignin(data, applicationUserToken)
    .then((res: any) => {
      if (res && res.data && res.data.body && res.data.body) { 
        console.log(res.data.body)
        // dispatch( walletAuthenticatorActions.saveNonce({ nonce: res.data.body.nonce }) ); 
      }
    })
    .catch((e) => {
      if (e.response) {
        toast.error(` Error Occured: nonce ${e?.response?.data?.status?.message}`);
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    });
  }

  const performSwitchNetwork = async (item: any) => { 
    try { 
      let ethereum = window.ethereum;
      if (ethereum) { 
        const hexChainId = Number(item.networkId).toString(16); 
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${hexChainId}` }],
        });
      }  
      setAllowedNetworkModal(false)
    } catch (err: any) {
      toast.error(err?.message);
    }
  };
 


  return (
    <>
      <WalletConnectView {...{...WalletConnectViewProps,  prefix: { ...(isConnecting ? ( <AiOutlineLoading3Quarters /> ) : !isConnected ? ( <VscDebugDisconnect /> ) : ( <AiOutlineDisconnect /> )), },
          title: isConnecting
            ? "Connecting..."
            : !isConnected
            ? "Connect"
            : "Disconnect",
          disabled: isConnecting,
        }}
        onClick={() => {
          openWalletSelectorDialog();
        }}
      />
      <WalletConnectModal
        show={showWalletDialog}
        metaMaskClickEvent={() => {
          connectMetaMask();
        }}
        onHide={() => setShowWalletDialog(false)}
      />

<FDialog
          show={allowedNetworkModal}
          size={"medium"}
          onHide={() => setAllowedNetworkModal(false)}
          title={"Allowed Networks on Gateway"}
          className="connect-wallet-dialog w-50"
        >
          <FItem className={"f-mt-2"}>
            Change your network into one of the following:
          </FItem>
          <FList variant="info" className="w-100">
            {allowedNetworksonGateway &&
              allowedNetworksonGateway.length &&
              allowedNetworksonGateway.map((item: any, index) => {
                return ( 
                    <FGridItem className={"f-mt-2"}  key={index} > 
                      <FItem className={"f-mt-1 f-mr-3 w-100"} > 
                        {item.name} 
                      </FItem>
                      <FButton
                        title={"Switch Network"}
                        className="w-100"
                        onClick={() => performSwitchNetwork(item)}
                      />
                    </FGridItem> 
                );
              })}
          </FList>
        </FDialog>
    </>
  );
};
