import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { verify } from 'jsonwebtoken';
import { useHistory } from "react-router-dom"; 
import toast, { Toaster } from "react-hot-toast"; 
import { PATH_DASHBOARD, PATH_PUBLIC_USER } from "../../../routes/paths";
import { connectWeb3, disconnectWeb3 } from "../../../utils/connect-wallet/connetWalletHelper";
import { checkUniqueWalletAddressAndAuthenticated,
   saveAddressAndGenerateNonce, getIp, verifySignatureAndUpdateNonce, 
   isFerrumNetworkIdentifierAllowedonGateway } from "../../../_apis/WalletAuthencation";
import { FDialog, FItem, FList, FListItem, FContainer } from "ferrum-design-system";
import { chainData } from "../../../utils/constants";

const checkSession = async () => {
  const session = localStorage.getItem('token'); 
  if(session){
      try {
          const isValid = verify(session||'','secret');
          if(isValid.data){
              return isValid.data
          }
          return false
      } catch (error) {
          return false
      }       
  }
  return false
}
  

export function Web3AuthWrapper(props) {
  const dispatch = useDispatch();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("ETHEREUM");
  const [web3, setWeb3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [walletInformation, setWalletInformation] = useState({});
  const [allowedNetworksData, setAllowedNetworksData] = useState([]);
  const [networkModal, setNetworkModal] = useState(false);
  const history = useHistory();

  const validateUserAddr = async () => {
    setLoading(true);  

    if (props.email && props.user) {
      await dispatch(validateAddress({ web3, address, network, email: props.email, applicationUserToken: props.applicationUserToken, user: props.user }));
      await disconnectWeb3();
    } else {
      toast.error(`User not found!`);
    }
    setLoading(false);
  };

  const isUserWalletAddressUniqueAndAuthenticated = async (address, network, applicationUserToken) => {
    try {
      const res = await checkUniqueWalletAddressAndAuthenticated(`${address}`, network, applicationUserToken)
      return res.data.body.isUnique;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }
  
  const saveUserWalletAddressAndGenerateNonce = async (userId, values, applicationUserToken) => { 
    try {
      const res = await saveAddressAndGenerateNonce(userId, values, applicationUserToken)
      return res?.data?.body?.address?.nonce;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }

  const saveUserSignatureAndGenerateNonce = async (userId, values, applicationUserToken) => {
     try {
      const res = await verifySignatureAndUpdateNonce(userId, values, applicationUserToken)
      return res?.data?.body;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }

   const isNetworkAllowedonGateway = async (identifier, applicationUserToken) => {
    try {  
      const res = await isFerrumNetworkIdentifierAllowedonGateway(identifier, applicationUserToken)
      return res.data.body;
    } catch (e) { 
      throw (e?.response?.data?.status?.message)
    }
  }

  const validateAddress = createAsyncThunk("connect", async (payload) => {
    try {
      const session = await checkSession(); 
      if (session) {
        return;
      }  

      const uniqueResponse = await isUserWalletAddressUniqueAndAuthenticated(payload.address, payload.network.toString(), payload.applicationUserToken)

      if ( uniqueResponse === true){
        const ipResponse = await getIp();
        const ipAddress = ipResponse?.data?.ip;
        const data = { address: payload.address , ferrumNetworkIdentifier: payload.network.toString(), lastConnectedIpAddress: ipAddress};
      
         const nonceResponse = await saveUserWalletAddressAndGenerateNonce(payload.user._id, data, payload.applicationUserToken);
          
         if (payload.web3) {
          const connection = payload.web3;
          const accounts = (await connection?.eth.getAccounts()) || "";
          const from = accounts[0];
          const msg = `0x${Buffer.from(
            `This signature verifies that you are the authorized owner of the wallet. The signature authentication 
            is required to ensure allocations are awarded to the correct wallet owner.${nonceResponse}. id: ${payload.network}`,
            "utf8"
          ).toString("hex")}`;

          try {
            await connection.currentProvider.sendAsync(
              {
                method: "personal_sign",
                params: [msg, from, "This signature verifies that you are the authorized owner of the wallet. The signature authentication is required to ensure allocations are awarded to the correct wallet owner."],
              },
              async (err, result) => { 
                if (result.result) {
                  const data = {signature: result.result,address: payload.address , ferrumNetworkIdentifier: payload.network.toString(), ipAddress: ipAddress }
                  try {
                    const saveResponse = await saveUserSignatureAndGenerateNonce(payload.user._id, data, payload.applicationUserToken); 
                     if (saveResponse && saveResponse.address.nonce){
                      if ( props && props.user && props.user.role === "organizationAdmin") {
                      history.push(PATH_DASHBOARD.general.leaderboardManagement) 
                      } else if (props && props.user && props.user.role === "communityMember") {
                        history.push(PATH_PUBLIC_USER.multiLeaderboard.detailLeaderBoardByProvidedId);
                      }
                    }
                  } catch (e) {
                    toast.error(`Error occured ${e}`); 
                  }
                }
              }
            )
          }  catch (e) { 
            toast.error(`Signature Verification failed, kindly ensure you are connected to right account ${e}`);
          }
        }
      } else {
        throw "Address not unique"
      } 
    } catch (e) {
      toast.error(`Error occured ${e}`); 
    }
  });
 
  const checkAllowedIdentifier = async (walletInformation) => {
    let allowedNetworksResponse = await isNetworkAllowedonGateway(walletInformation.network, props.applicationUserToken);
    if ( allowedNetworksResponse.status === true ){
      setConnected(true)
    } else {
      setAllowedNetworksData(allowedNetworksResponse.networks);
      setNetworkModal(true);
    } 
  }
 
  const handleClick = async () => {
    if (connected) {
      validateUserAddr();
    } else {
      let walletInformation = await connectWeb3(setAddress, setConnected, setWeb3, setNetwork, toast);
      setConnected(false); 
      setWalletInformation(walletInformation);
      checkAllowedIdentifier(walletInformation);
    }
  } 
 
  return (
    <>
      <Toaster />
      <FContainer type="fluid">
      <props.View
        connected={connected.toString()}
        network={network}
        // onClick={() => (!connected ? connectWeb3() : validateUserAddr())}
        onClick={handleClick}
        loading={loading}
        text={connected ? "Validate Address" : "Connect Wallet to Validate"}
      />

      <FDialog
        show={networkModal}
        size={"medium"}
        onHide={() => setNetworkModal(false)}
        title={"Allowed Networks on Gateway"}
        className="connect-wallet-dialog w-50"
      >
        <FItem className={"f-mt-2"}>
          Change your network into one of the following:
        </FItem>
        <FList variant="info" className="w-100">
          {allowedNetworksData &&
            allowedNetworksData.length &&
            allowedNetworksData.map((item, index) => {
              return (
                <FListItem display={"flex"} className={"f-mt-1"} key={index}>
                  {item.name}
                </FListItem>
              );
            })}
        </FList>
      </FDialog>
      </FContainer>
    </>
  );
}
