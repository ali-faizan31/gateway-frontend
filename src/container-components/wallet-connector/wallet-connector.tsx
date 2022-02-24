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
import toast, {Toaster} from "react-hot-toast";
import * as walletAuthenticatorActions from "../../components/common/wallet-authentication/redux/walletAuthenticationActions";
import { StartAuthenticationProcess } from "../../components/common/wallet-authentication/WalletAuthenticationSignIn";

import { getAccessTokenForApplicationUser, generateNonceByABN, verifySignatureAndSignin, isFerrumNetworkIdentifierAllowedonGateway, verifySignatureAndUpdateProfile } from "../../_apis/WalletAuthencation";
import { FDialog, FItem, FList, FButton, FGridItem} from "ferrum-design-system";
import { sign } from "crypto";
import { locale } from "moment";
import { localStorageHelper, checkSession } from "../../utils/global.utils";
import { ME_TAG, TOKEN_TAG } from "../../utils/const.utils";


export const WalletConnector = ({WalletConnectView,  WalletConnectModal,  WalletConnectViewProps, }: WalletConnectorProps) => {
  
  const [showWalletDialog, setShowWalletDialog] = useState<boolean>(false);
  const [reconnect, setReconnect] = useState<boolean>(false);
  const [networkClient, setNetworkClient] = useState<Web3 | undefined>(undefined);
  const dispatch = useDispatch();
  const { active, activate, deactivate, library, account, chainId, error, connector } =  useWeb3React();
  const { isConnected, isConnecting, currentWalletNetwork, walletAddress } = useSelector((state: RootState) => state.walletConnector);
  const { nonce, applicationUserToken, signature, isAllowedonGateway, allowedNetworksonGateway, getSignatureFromMetamask, tokenV2, meV2  } = useSelector((state: RootState) => state.walletAuthenticator); 
  const [allowedNetworkModal, setAllowedNetworkModal] = useState<boolean>(false);
  const [getSignatureForSignin, setGetSignatureForSignin] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean | undefined>(undefined);
  const [isForSigninFlow, setIsForSigninFlow] = useState<boolean | undefined>(undefined);
  const [isValidationCompleted, setIsValidationCompleted] = useState<boolean | undefined>(undefined);
  const [connectedAndVerifiedWallet, setConnectedAndVerifiedWallet] = useState("");

 useEffect(() => { 
   console.log('active', active, 'token', tokenV2); 
 }, [active, tokenV2])

 useEffect(() => { 
  console.log('library', library); 
}, [library])

useEffect(() => { 
  console.log('account', account); 
}, [account])

useEffect(() => { 
  console.log('chainId', chainId); 
}, [chainId])

useEffect(() => { 
 console.log('isConnected', isConnected); 
}, [isConnected])

useEffect(() => { 
 console.log('isConnecting', isConnecting); 
}, [isConnecting])

useEffect(() => { 
  console.log('currentWalletNetwork', currentWalletNetwork); 
 }, [currentWalletNetwork])

 useEffect(() => { 
  console.log('walletAddress', walletAddress); 
 }, [walletAddress])
 
 useEffect(() => {  
  console.log('networkClient', networkClient); 
  if (!networkClient && library){
    setNetworkClient(library);
  }
 }, [networkClient])
 
//  useEffect(() => { 
//   console.log('active', active);
//   console.log('library', library);
//   console.log('account', account);
//   console.log('chainId', chainId);
//   console.log('isConnected', isConnected);
//   console.log('isConnecting', isConnecting);
//   console.log('currentWalletNetwork', currentWalletNetwork);
//   console.log('walletAddress', walletAddress);
// }, [active, library, account, chainId, isConnected, isConnecting, currentWalletNetwork, walletAddress])


  useEffect(() => {  
    // if ( isValidationCompleted ){
    //   setIsValidated(false); //changed account after validation
    // }
    // if ( isValidationCompleted && connectedAndVerifiedWallet !== account){
    //   connectMetaMask();
    //   dispatch(walletConnectorActions.resetWalletConnector());
    //       dispatch(walletAuthenticatorActions.resetWalletAuthentication({userToken: applicationUserToken})) 
    //       refreshAuthenticationVariables()
    // }
    if ( account && walletAddress && walletAddress !== account && isConnected && active ) { 
      activate(injected); 
      setReconnect(true);
    } 
  }, [walletAddress, account, isConnected, active]);

  const resetHooks = () => {
    setIsForSigninFlow(false);
    setIsValidated(false);
    setGetSignatureForSignin(false);
    dispatch(walletConnectorActions.resetWalletConnector());
    dispatch(walletAuthenticatorActions.resetWalletAuthentication({userToken: applicationUserToken}))
  }

  const refreshAuthenticationVariables = () => { 
    setIsForSigninFlow(false);
    setIsValidated(false);
    setIsValidationCompleted(false);
    setGetSignatureForSignin(false);  
  }

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

      if (isConnected && currentWalletNetwork  && applicationUserToken ){
        dispatch( walletAuthenticatorActions.saveSignature({ signature: "" }) );
          dispatch( walletAuthenticatorActions.saveNonce({ nonce: "" }) ); 
          checkAllowedIdentifier(currentWalletNetwork, applicationUserToken)
        // if (tokenV2 && meV2.ferrumNetworkIdentifier !== currentWalletNetwork){
        //   dispatch( walletAuthenticatorActions.saveSignature({ signature: "" }) );
        //   dispatch( walletAuthenticatorActions.saveNonce({ nonce: "" }) ); 
        //   checkAllowedIdentifier(currentWalletNetwork, applicationUserToken)
        // } else {
        //   dispatch( walletAuthenticatorActions.saveSignature({ signature: "" }) );
        //   dispatch( walletAuthenticatorActions.saveNonce({ nonce: "" }) ); 
        //   checkAllowedIdentifier(currentWalletNetwork, applicationUserToken)
        // }
      } 

    }, [currentWalletNetwork, applicationUserToken, isConnected ]);  
 
    useEffect(() => { 
      if ( isAllowedonGateway === false ){
        setAllowedNetworkModal(true);
        dispatch( walletAuthenticatorActions.error({ error: true }) );
      }
    }, [isAllowedonGateway])

    useEffect(() => {   
      if ( isAllowedonGateway === true ){ 
        getNonce(currentWalletNetwork, walletAddress, applicationUserToken); 
      }
    }, [allowedNetworksonGateway, isValidated])
    
    useEffect(() => { 
      if (!error && currentWalletNetwork &&  walletAddress && applicationUserToken && signature && isForSigninFlow ){ // signin
        console.log('signin')
         verifySignatureToSignin(currentWalletNetwork.toString(), walletAddress, signature, applicationUserToken);
      }
    }, [currentWalletNetwork, walletAddress, signature, applicationUserToken, isForSigninFlow])

    useEffect(() => { 
      if ( localStorageHelper.getToken(TOKEN_TAG) && signature && getSignatureFromMetamask){ // profile
        console.log('profile')
         verifySignatureToUpdateProfileForCommunityMember(signature, localStorageHelper.getToken(TOKEN_TAG));
      }
    }, [ signature, getSignatureFromMetamask ])
 

  useEffect(() => {  
    if ( !networkClient && getSignatureFromMetamask ){
      toast.error("Connect Metamask!")
      dispatch( walletAuthenticatorActions.getSignatureFromMetamask({getSignatureFromMetamask: false}))
    } else if ( networkClient && isConnected && account && nonce  && currentWalletNetwork && (getSignatureForSignin || getSignatureFromMetamask)) { 

    const msg = `0x${Buffer.from(
      `This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.${nonce}. id: ${currentWalletNetwork}`,
      "utf8"
    ).toString("hex")}`; 
 
    networkClient.eth.personal.sign(msg, account, 
      "This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.",
       function (err, signature) {   
        if ( err ){
          setIsValidated(false);
          err.message && toast.error(err.message); 
          dispatch(walletConnectorActions.resetWalletConnector());
          dispatch(walletAuthenticatorActions.resetWalletAuthentication({userToken: applicationUserToken})) 
          refreshAuthenticationVariables()
        } else if ( signature ){  
          dispatch( walletAuthenticatorActions.saveSignature({ signature }) ); 
        }
      })
    }
  }, [networkClient, nonce, getSignatureForSignin, getSignatureFromMetamask])
  

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
       } 
      // else if ( !isValidated ){
      //     setIsValidated(true)
      // } 
      else { 
        dispatch(walletConnectorActions.resetWalletConnector());
        dispatch(walletAuthenticatorActions.resetWalletAuthentication({userToken: applicationUserToken}))
        dispatch(walletAuthenticatorActions.removeSession({userToken: applicationUserToken}))
        console.log('dis 1')
        // networkClient?.eth.personal
        setNetworkClient(undefined);
        deactivate();
      }
    } else {
    // console.log("wallet is already in connect state");
    }
  }; 

  const connectMetaMask = () => {  
    if (isConnected) {  
      dispatch(walletConnectorActions.resetWalletConnector());
      console.log('dis 2')
      setNetworkClient(undefined);
      deactivate();
    } else {   
      activate(injected);
      setShowWalletDialog(false);
      console.log('dis 3')
      setNetworkClient(undefined);
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(walletConnectorActions.resetWalletConnector()); 
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
    // let chainId: any = await connector?.getChainId();
    // let networkId = parseInt(chainId, 16); 
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
        setGetSignatureForSignin(true)
        setIsForSigninFlow(true);
      }
    })
    .catch((e) => {
      refreshAuthenticationVariables()
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
        setIsValidationCompleted(true);
        account && setConnectedAndVerifiedWallet(account);
        dispatch( walletAuthenticatorActions.saveME({ meV2: res.data.body.user }) );
        dispatch( walletAuthenticatorActions.saveToken({ tokenV2: res.data.body.token }) );
        dispatch(walletAuthenticatorActions.resetWalletAuthentication({userToken: applicationUserToken})) 
        localStorageHelper.storeObject(ME_TAG, res.data.body.user);
        localStorageHelper.storeToken(TOKEN_TAG, res.data.body.token);
        refreshAuthenticationVariables()
      }
    })
    .catch((e) => {
      refreshAuthenticationVariables();
      setGetSignatureForSignin(false);
      if (e.response) {
        toast.error(` Error Occured: nonce ${e?.response?.data?.status?.message}`);
      } else {
        toast.error("Something went wrong. Try again later!");
      }
    });
  }
  
  const verifySignatureToUpdateProfileForCommunityMember = (signature: any, communityMemberToken: any) => {
    let data = { signature: signature }; 
    verifySignatureAndUpdateProfile(data, communityMemberToken)
    .then((res: any) => {
      if (res && res.data && res.data.body && res.data.body) {  
        account && setConnectedAndVerifiedWallet(account);
        dispatch( walletAuthenticatorActions.saveCommunityMemberProfileToken({ profileToken: res.data.body.token }) );  
        refreshAuthenticationVariables()
        setIsValidationCompleted(true)
      }
    })
    .catch((e) => {
      refreshAuthenticationVariables()
      dispatch( walletAuthenticatorActions.getSignatureFromMetamask({getSignatureFromMetamask: false}))
      if (e.response) {
        toast.error(`You attempted authentication with  
        account: ${account} on network: ${currentWalletNetwork} which doesn't match the address you are signed in with. Please retry authentication with the correct address and network to continue.
        \n Wallet Authentication is required to edit profile!`, {
          style:{
            maxWidth:'650px '
          },
          duration: 2000 
        })
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
 
  const onSwitchNetworkClose = () => {
    dispatch(walletConnectorActions.resetWalletConnector());
    setAllowedNetworkModal(false);
  }

  return (
    <>
    <Toaster />
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
          onHide={onSwitchNetworkClose}
          title={"Allowed Networks on Gateway"}
          className="connect-wallet-dialog "
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
