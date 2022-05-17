import axios from 'axios';
import { defaultEndPointDetails, BSC_api_key } from '../utils/const.utils';

export function getAllLeaderboards(offset, limit, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/admin/leaderboards/list?offset=${offset}&limit=${limit}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function updateLeaderboardStatusById(id, values, token) {
    return axios.put(`${defaultEndPointDetails.baseUrl}/api/v1/admin/leaderboards/update/status/${id}`,
        values, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export function getLeaderboardById(id, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/admin/leaderboards/${id}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function getLeaderboardByIdForPublicUser(id, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/leaderboards/${id}`);
}

export function addLeaderboard(values, token) {
    return axios.post(`${defaultEndPointDetails.baseUrl}/api/v1/admin/leaderboards/create`, values, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function getTokenPriceFrom1Inch(chainId, fromToken, toToken) {
    const url = `https://api.1inch.exchange/v3.0/${chainId}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=1000000000000000000`;
    return axios.get(url);
}

export function getTokenHolderlistByContractAddressBSC(tokenContractAddress) {
    return axios.get(`https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${tokenContractAddress}&apikey=${BSC_api_key}`);
}

export function getStakingBalancesByCABNBSC(tokenContractAddress, stakingContractAddress) {
    return axios.get(`https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${tokenContractAddress}&address=${stakingContractAddress}&apikey=${BSC_api_key}`);
}

export function getTokenHolderlistByCABNId(id, isPagination = false, offset = 0, limit = 10) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/cabn/token-holders/list?cabnId=${id}&offset=${offset}&limit=${limit}&isPagination=${isPagination}`);
}