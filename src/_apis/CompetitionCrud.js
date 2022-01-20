import axios from 'axios';
import {baseUrl,apiKey} from '../utils/const.utils'
 
let token = localStorage.getItem('token');
const startBlockHeight = '12531865';
const endBlockHeight = '12587580';

export function getAllCompetitions(offset, limit, paramToken = token) {
  if(paramToken){
    token = paramToken
  }
  return axios.get(`${baseUrl}/api/v1/admin/competitions/list?offset=${offset}&limit=${limit}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getCompetitionById(id) {
  return axios.get(`${baseUrl}/api/v1/admin/competitions/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function addCompetition(values) { 
  return axios.post(`${baseUrl}/api/v1/admin/competitions/create`,
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

export function getCompetitionByIdForPublicUser(id) {
  return axios.get(`${baseUrl}/api/v1/competitions/${id}`);
}

export function getStartBlockHolders(chainId, tokenContractAddress, startBlockHeight ) {
  const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenContractAddress}/token_holders/?key=${apiKey}&block-height=${startBlockHeight}&page-size=9000`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getEndBlockHolders(chainId, tokenContractAddress, endBlockHeight ) {
  const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenContractAddress}/token_holders/?key=${apiKey}&block-height=${endBlockHeight}&page-size=8000`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}