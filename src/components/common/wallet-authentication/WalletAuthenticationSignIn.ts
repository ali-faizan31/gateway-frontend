import React, { useState, useEffect } from 'react'; 
import { useSelector, useDispatch } from "react-redux";
import { walletConnectorActions } from '../../../container-components/wallet-connector';
import { RootState } from "../../../redux/rootReducer";
import { getAccessTokenForApplicationUser, generateNonceByABN, verifySignatureAndSignin } from "../../../_apis/WalletAuthencation";
import * as walletAuthenticatorActions from "./redux/walletAuthenticationActions";
import toast from 'react-hot-toast';

const WalletAuthenticationSignIn = () => {
    const dispatch = useDispatch(); 
    const { currentWalletNetwork, walletAddress  } = useSelector((state: RootState) => state.walletConnector);
    const { applicationUserToken, signature } = useSelector((state: RootState) => state.walletAuthenticator);

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

      const getNonce = async (currentWalletNetwork: any, walletAddress: any, applicationUserToken: any) => {
      let data = { address: walletAddress, ferrumNetworkIdentifier: currentWalletNetwork}
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
      let data = { address: walletAddress, ferrumNetworkIdentifier: currentWalletNetwork, signature: signature, role: "communityMember"};
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

    // useEffect(() => {
    //   getUserAccessToken();
    //   if (currentWalletNetwork &&  walletAddress && applicationUserToken){
    //     getNonce(currentWalletNetwork, walletAddress, applicationUserToken);
    //   }
    // }, [currentWalletNetwork, walletAddress, applicationUserToken ]);  

    // useEffect(() => { 
    //   if (currentWalletNetwork &&  walletAddress && applicationUserToken && signature){
    //     verifySignatureToSignin(currentWalletNetwork, walletAddress, signature, applicationUserToken);
    //   }
    // }, [currentWalletNetwork, walletAddress, signature, applicationUserToken])
    
 
}

export default WalletAuthenticationSignIn