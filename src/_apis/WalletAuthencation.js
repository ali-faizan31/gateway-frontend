import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";

export function getAccessTokenForApplicationUser() {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/token`;
    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            apikey: `${defaultEndPointDetails.apiKeyForApplicationUser}`,
        },
    });
}

export function checkUniqueWalletAddress(address, ferrumNetworkIdentifier, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/is/unique?address=${address}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`;
    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}

export function checkUniqueWalletAddressAndAuthenticated(address, ferrumNetworkIdentifier, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/is/unique/and/authenticated?address=${address}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`;
    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}

export function walletAddressAuthenticateCheckOnSignin(userId, address, ferrumNetworkIdentifier, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/is/authenticated?address=${address}&userId=${userId}&ferrumNetworkIdentifier=${ferrumNetworkIdentifier}`;
    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}

export function saveAddressAndGenerateNonce(userId, values, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/create?userId=${userId}`;
    return axios.post(url, values, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}

export function verifySignatureAndUpdateNonce(userId, values, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/verify-signature?userId=${userId}`;
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

export function isFerrumNetworkIdentifierAllowedonGateway(identifier, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/networks/allow/on/gateway?ferrumNetworkIdentifier=${identifier}`;
    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}

//sign in by wallet flow apis

export function generateNonceByABN(values, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/generate/nonce`;
    return axios.post(url, values, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}

export function generateNonceForCommunityMember(communityMembertoken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/community-member/addresses/generate/nonce`;
    return axios.get(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${communityMembertoken}`,
        },
    });
}

export function verifySignatureAndUpdateProfile(values, communityMemberToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/community-member/addresses/verify-signature`;
    return axios.post(url, values, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${communityMemberToken}`,
        },
    });
}

export function verifySignatureAndSignin(values, applicationUserToken) {
    const url = `${defaultEndPointDetails.baseUrl}/api/v1/application-user/addresses/verify-signature`;
    return axios.post(url, values, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${applicationUserToken}`,
        },
    });
}