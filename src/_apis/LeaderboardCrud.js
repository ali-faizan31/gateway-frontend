import axios from 'axios';
import { baseUrl, apiKey, BSC_api_key } from '../utils/const.utils';  

export function getAllLeaderboards(offset, limit, token) { 
  return axios.get(`${baseUrl}/api/v1/admin/leaderboards/list?offset=${offset}&limit=${limit}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateLeaderboardStatusById(id, values, token) { 
  return axios.put(`${baseUrl}/api/v1/admin/leaderboards/update/status/${id}`,
   values,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}


export function getLeaderboardById(id, token) { 
  return axios.get(`${baseUrl}/api/v1/admin/leaderboards/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function addLeaderboard(values, token) {
  return axios.post(`${baseUrl}/api/v1/admin/leaderboards/create`, values, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getCovalenthqResponse(chainId, tokenContractAddress, token) {
  const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenContractAddress}/token_holders/?key=${apiKey}&page-size=1`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}
 
export function getTokenHolderListByContractAddressAndChainID(chainId, tokenContractAddress,limit, token) {
  const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenContractAddress}/token_holders/?key=${apiKey}&page-size=15000&`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getLeaderboardByIdForPublicUser(id, token) {
  return axios.get(`${baseUrl}/api/v1/leaderboards/${id}`);
}

export function getTokenPriceFrom1Inch(chainId,fromToken, toToken) {
  const url = `https://api.1inch.exchange/v3.0/${chainId}/quote?fromTokenAddress=${fromToken}&toTokenAddress=${toToken}&amount=1000000000000000000`;    
  return axios.get(url);
}

export function getStakingBalanceByCABN(chainId, tokenContractAddress, stakingContractAddress, limit){
  let url = `https://api.covalenthq.com/v1/${chainId}/address/${stakingContractAddress}/transfers_v2/?quote-currency=USD&format=JSON&contract-address=${tokenContractAddress}&key=${apiKey}&page-size=1&match={"transfers":{"$elemmatch":{"to_address":${stakingContractAddress}}}}`;
  if(limit){
  url = `https://api.covalenthq.com/v1/${chainId}/address/${stakingContractAddress}/transfers_v2/?quote-currency=USD&format=JSON&contract-address=${tokenContractAddress}&key=${apiKey}&page-size=5000&match={"transfers":{"$elemmatch":{"to_address":${stakingContractAddress}}}}`;
  }
  return axios.get(url);
}

export function getTokenHolderlistByContractAddressBSC(tokenContractAddress){
  return axios.get(`https://api.bscscan.com/api?module=token&action=tokenholderlist&contractaddress=${tokenContractAddress}&apikey=${BSC_api_key}`);
}