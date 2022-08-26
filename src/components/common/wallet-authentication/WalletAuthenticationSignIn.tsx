import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import {
  getAccessTokenForApplicationUser,
  isFerrumNetworkIdentifierAllowedonGateway,
  verifySignatureAndUpdateProfile,
  connectToWalletAddress
} from "../../../_apis/WalletAuthencation";
import * as walletAuthenticatorActions from "./redux/walletAuthenticationActions";
import { WalletConnector } from "foundry";
import toast from "react-hot-toast";
import { getErrorMessage, GetPhraseString, localStorageHelper } from "../../../utils/global.utils";
import { ME_TAG, ORG_ROLE_TAG, TOKEN_TAG } from "../../../utils/const.utils";
import { FDialog, FItem, FList, FButton, FGridItem, FTypo } from "ferrum-design-system";
import { getNetworkInformationForPublicUser } from "../../../_apis/NetworkCrud";
import { T } from '../../../utils/translationHelper';
// import { ReactComponent as IconSubmitted } from "../../../../../assets/img/icon-transaction-submitted.svg";
import { ReactComponent as SwitchNetworkIcon } from "../../../assets/img/switch-network.svg"
import IconNetworkBNB from "../../../assets/img/icon-network-bnb.svg";

export const WalletAuthencationOnSignIn = ({ account, networkClient, isAuthenticationNeeded }: any) => {
  const dispatch = useDispatch();
  const { isConnected, isConnecting, currentWalletNetwork, walletAddress } = useSelector((state: RootState) => state.walletConnector);
  const { nonce, applicationUserToken, signature, isAllowedonGateway, allowedNetworksonGateway, getSignatureFromMetamask, tokenV2, meV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );
  const [allowedNetworkModal, setAllowedNetworkModal] = useState<boolean>(false);
  const [getSignatureForSignin, setGetSignatureForSignin] = useState<boolean>(false);
  const [isForSigninFlow, setIsForSigninFlow] = useState<boolean | undefined>(undefined);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);

  useEffect(() => {
    if (isConnected && !applicationUserToken && isConnecting === false) {
      getUserAccessToken();
    }

    if (isConnected && currentWalletNetwork && applicationUserToken && isConnecting === false) {
      if (tokenV2 && ((meV2.addresses[0]?.network?.ferrumNetworkIdentifier.toString() !== currentWalletNetwork.toString()) || meV2.role === ORG_ROLE_TAG)) {
        dispatch(walletAuthenticatorActions.saveSignature({ signature: "" }));
        dispatch(walletAuthenticatorActions.saveNonce({ nonce: "" }));
        checkAllowedIdentifier(currentWalletNetwork, applicationUserToken);
      } else if (tokenV2 === "") {
        dispatch(walletAuthenticatorActions.saveSignature({ signature: "" }));
        dispatch(walletAuthenticatorActions.saveNonce({ nonce: "" }));
        checkAllowedIdentifier(currentWalletNetwork, applicationUserToken);
      }
    }
    // eslint-disable-next-line
  }, [currentWalletNetwork, applicationUserToken, isConnected, isConnecting]);

  useEffect(() => {
    if (isAllowedonGateway === false) {
      setAllowedNetworkModal(true);
      dispatch(walletAuthenticatorActions.error({ error: true }));
    }
    // eslint-disable-next-line
  }, [isAllowedonGateway]);

  useEffect(() => {
    if (currentWalletNetwork) {
      getCurrentNetworkInformation(currentWalletNetwork);
    }
  }, [currentWalletNetwork]);

  const getCurrentNetworkInformation = async (currentWalletNetwork: any) => {
    let networkResponse = await getNetworkInformationForPublicUser(currentWalletNetwork);
    networkResponse = networkResponse.data && networkResponse.data.body && networkResponse.data.body.network;
    if (networkResponse) {
      dispatch(walletAuthenticatorActions.saveNetworkInformation({ networkResponse }));
    }
  };

  useEffect(() => {
    if(isConnected && isAllowedonGateway && currentWalletNetwork && walletAddress && applicationUserToken){
      connectToWallet(currentWalletNetwork, walletAddress, applicationUserToken) 
    }
  },[isConnected, isAllowedonGateway, currentWalletNetwork, walletAddress, applicationUserToken])

  useEffect(() => {
    if (tokenV2 && signature && getSignatureFromMetamask) {
      // profile
      verifySignatureToUpdateProfileForCommunityMember(signature, tokenV2);
    }
    // eslint-disable-next-line
  }, [signature, getSignatureFromMetamask]);

  useEffect(() => {
    if (!networkClient && getSignatureFromMetamask) {
      toast.error("Connect Metamask!");
      dispatch(
        walletAuthenticatorActions.getSignatureFromMetamask({
          getSignatureFromMetamask: false,
        })
      );
    } else if (networkClient && isConnected && account && nonce && currentWalletNetwork && (getSignatureForSignin || getSignatureFromMetamask)) {
      const msg = `0x${Buffer.from(
        `This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.${nonce}. id: ${currentWalletNetwork}`,
        "utf8"
      ).toString("hex")}`;

      networkClient.eth.personal.sign(
        msg,
        account,
        "This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner.",
        function (err: any, signature: any) {
          if (err) {
            // setIsValidated(false);
            err.message && toast.error(err.message);
            dispatch(WalletConnector.walletConnectorActions.resetWalletConnector());
            dispatch(
              walletAuthenticatorActions.resetWalletAuthentication({
                userToken: applicationUserToken,
              })
            );
            dispatch(
              walletAuthenticatorActions.removeSession({
                userToken: applicationUserToken,
              })
            );
            refreshAuthenticationVariables();
          } else if (signature) {
            dispatch(walletAuthenticatorActions.saveSignature({ signature }));
          }
        }
      );
    }
    // eslint-disable-next-line
  }, [networkClient, nonce, getSignatureForSignin, getSignatureFromMetamask]);

  const refreshAuthenticationVariables = () => {
    setIsForSigninFlow(false);
    // setIsValidated(false);
    // setIsValidationCompleted(false);
    setGetSignatureForSignin(false);
  };

  const getUserAccessToken = () => {
    getAccessTokenForApplicationUser()
      .then((res: any) => {
        if (res && res.data && res.data.body && res.data.body.token) {
          dispatch(
            walletAuthenticatorActions.saveApplicationUserToken({
              userToken: res.data.body.token,
            })
          );
        }
      })
      .catch((e: any) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  const checkAllowedIdentifier = async (identifier: any, applicationUserToken: any) => {
    // let chainId: any = await connector?.getChainId();
    // let networkId = parseInt(chainId, 16);
    isFerrumNetworkIdentifierAllowedonGateway(identifier, applicationUserToken)
      .then((res: any) => {
        if (res && res.data && res.data.body) {
          dispatch(
            walletAuthenticatorActions.isAllowedOnGateway({
              isAllowedOnGateway: res.data.body.status,
            })
          );
          dispatch(
            walletAuthenticatorActions.allowedNetworksonGateway({
              allowedNetworksonGateway: res.data.body.networks,
            })
          );
        }
      })
      .catch((e) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  const connectToWallet = (currentWalletNetwork: number, walletAddress: any, applicationUserToken: any) => {
    let data = {
      address: walletAddress,
      ferrumNetworkIdentifier: currentWalletNetwork.toString(),
      role: "communityMember",
    };
    connectToWalletAddress(data, applicationUserToken)
      .then((res: any) => {
        if (res && res.data && res.data.body) {
          dispatch(walletAuthenticatorActions.saveME({ meV2: res.data.body.user }));
          dispatch(
            walletAuthenticatorActions.saveToken({
              tokenV2: res.data.body.token,
            })
          );
          dispatch(
            walletAuthenticatorActions.resetWalletAuthentication({
              userToken: applicationUserToken,
            })
          );
          localStorageHelper.storeObject(ME_TAG, res.data.body.user);
          localStorageHelper.storeToken(TOKEN_TAG, res.data.body.token);
          refreshAuthenticationVariables();
        }
      })
      .catch((e) => {
        refreshAuthenticationVariables();
        getErrorMessage(e, activeTranslation)
      });
  };

  const verifySignatureToUpdateProfileForCommunityMember = (signature: any, communityMemberToken: any) => {
    let data = { signature: signature };
    verifySignatureAndUpdateProfile(data, communityMemberToken)
      .then((res: any) => {
        if (res && res.data && res.data.body && res.data.body) {
          // account && setConnectedAndVerifiedWallet(account);
          dispatch(
            walletAuthenticatorActions.saveCommunityMemberProfileToken({
              profileToken: res.data.body.token,
            })
          );
          refreshAuthenticationVariables();
          // setIsValidationCompleted(true);
        }
      })
      .catch((e: any) => {
        refreshAuthenticationVariables();
        dispatch(
          walletAuthenticatorActions.getSignatureFromMetamask({
            getSignatureFromMetamask: false,
          })
        );
        if (e.response) {
          if (e?.response?.data?.status?.phraseKey !== '') {
            const fetchedMessage = GetPhraseString(e?.response?.data?.status?.phraseKey);
            toast.error(fetchedMessage);
          } else {
            toast.error(
              `You attempted authentication with  
      account: ${account} on network: ${currentWalletNetwork} which doesn't match the address you are signed in with. Please retry authentication with the correct address and network to continue.
      \n Wallet Authentication is required to edit profile!`,
              {
                style: {
                  maxWidth: "650px ",
                },
                duration: 4000,
              }
            );
          }
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const performSwitchNetwork = async (item: any) => {
    dispatch(
      walletAuthenticatorActions.isAllowedOnGateway({
        isAllowedOnGateway: false,
      })
    );
    try {
      let ethereum = window.ethereum;
      if (ethereum) {
        const hexChainId = Number(item.networkId).toString(16);
        let response = await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${hexChainId}` }],
        });
        if (response === null) {
          setTimeout(() => {
            dispatch(
              walletAuthenticatorActions.isAllowedOnGateway({
                isAllowedOnGateway: true,
              })
            );
          }, 2000);
        }
      }
      setAllowedNetworkModal(false);
    } catch (err: any) {
      onSwitchNetworkClose();
      setAllowedNetworkModal(false);
      toast.error(err?.message);
    }
  };

  const onSwitchNetworkClose = () => {
    dispatch(WalletConnector.walletConnectorActions.resetWalletConnector());
    dispatch(
      walletAuthenticatorActions.resetWalletAuthentication({
        userToken: applicationUserToken,
      })
    );
    dispatch(
      walletAuthenticatorActions.removeSession({
        userToken: applicationUserToken,
      })
    );
    setAllowedNetworkModal(false);
  };

  let itemarray = [{ name: '1' }, { name: "2" }]

  return (
    <>
      <FDialog show={allowedNetworkModal} size={"medium"} onHide={onSwitchNetworkClose} className="connect-wallet-dialog ">
        <FList variant="info" className="w-100">
          <FItem align={"center"}  >
            {/* <SwitchNetworkIcon /> */}
            <img src={"/ferrum/switch-network.svg"} alt="" height={"100px"} width={"100px"} />
            <FItem className={"f-mt-2"}>
              <FTypo className={"primary-color"} size={30} weight={600}>Allowed Networks on Gateway </FTypo>
              <p className={"f-mt--7"}> Change your network into one of the following:</p>
            </FItem>
            {allowedNetworksonGateway &&
              allowedNetworksonGateway.length ?
              allowedNetworksonGateway.map((item: any, index) => {
                return (
                  <FGridItem className={"f-mt-1"} key={index} alignX={"center"}>
                    <FItem className={"f-mt-1 f-mb-1"}>
                      <img src={IconNetworkBNB} height="18px" width="18px" alt="" className="allowed-network-icon" />{item.name}</FItem>
                    <FButton title={"Switch Network"} className={"custom-width-20"} onClick={() => performSwitchNetwork(item)} />
                  </FGridItem>
                );
              }) : null}
          </FItem>
        </FList>
      </FDialog>
    </>
  );
}; 