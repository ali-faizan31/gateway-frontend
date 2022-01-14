import axios from "axios";
import { baseUrl, apiKeyForApplicationUser } from "../utils/const.utils";

export function getAccessTokenForApplicationUser() {
  const url = `${baseUrl}/api/v1/application-user/token`;
  return axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      apikey: `${apiKeyForApplicationUser}`,
    },
  });
}

export function checkUniqueWalletAddress(address, ferrumNetworkIdentifier, applicationUserToken) {
  const url = `${baseUrl}/api/v1/application-user/addresses/is/unique?address=${address}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`;
  return axios.get(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      Authorization: `Bearer ${applicationUserToken}`,
    },
  });
}

export function saveAddressAndGenerateNonce(userId, values, applicationUserToken) {
    const url = `${baseUrl}/api/v1/application-user/addresses/create?userId=${userId}`;
    return axios.post(url, values, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${applicationUserToken}`,
      },
    });
}

export function verifySignatureAndUpdateNonce(userId, values, applicationUserToken) {
    const url = `${baseUrl}/api/v1/application-user/addresses/verify-signature?userId=${userId}`;
    return axios.put(url, values, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${applicationUserToken}`,
      },
    });
}
  
export function getIp() {
    return axios.get("https://api.ipify.org?format=json");
}