import React, { useState, useEffect } from 'react';  
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getAccessTokenForApplicationUser, generateNonceByABN, verifySignatureAndSignin, isFerrumNetworkIdentifierAllowedonGateway } from "../../../_apis/WalletAuthencation";
import * as walletAuthenticatorActions from "./redux/walletAuthenticationActions";
import toast from 'react-hot-toast';

 
export const StartAuthenticationProcess = ( payload: any ) => (dispatch: any) => {
  
  console.log( payload )
  getUserAccessToken(dispatch);

  try { 
  } catch (e) {
    toast.error(`Error occured: ${e}`)
  }
}

const getUserAccessToken = ( dispatch: any) => {
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

const checkAllowedIdentifier = async (identifier: any, applicationUserToken: any, dispatch: any) => {
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

      const getNonce = async (currentWalletNetwork: any, walletAddress: any, applicationUserToken: any, dispatch: any) => {
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

      const verifySignatureToSignin = (currentWalletNetwork: any, walletAddress: any, signature: any, applicationUserToken: any, dispatch: any) => {
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
     