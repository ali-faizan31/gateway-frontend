import axios from 'axios';
import {baseUrl,apiKey} from '../utils/const.utils';

export function getAllCompetitions(offset, limit, token) {
  return axios.get(`${baseUrl}/api/v1/admin/competitions/list?offset=${offset}&limit=${limit}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getCompetitionById(id, token) {
  return axios.get(`${baseUrl}/api/v1/competitions/${id}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function updateCompetitionStatusById(id, values, token) {
  return axios.put(`${baseUrl}/api/v1/admin/competitions/update/status/${id}`,
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



export function addCompetition(values, token) {
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

export function getCompetitionByIdForPublicUser(id, token) {
  return axios.get(`${baseUrl}/api/v1/competitions/${id}`);
}

export function getStartBlockHolders(chainId, tokenContractAddress, startBlockHeight, token ) {
  const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenContractAddress}/token_holders/?key=${apiKey}&block-height=${startBlockHeight}&page-size=9000`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getEndBlockHolders(chainId, tokenContractAddress, endBlockHeight, token ) {
  const url = `https://api.covalenthq.com/v1/${chainId}/tokens/${tokenContractAddress}/token_holders/?key=${apiKey}&block-height=${endBlockHeight}&page-size=8000`;
  return axios.get(url, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}

export function getCompetitionsParticipantsRanks(competitionId, isPagination, offset, limit) {
  return axios.get(`${baseUrl}/api/v1/competitions/participants/growth/${competitionId}?isPagination=${isPagination}&offset=${offset}&limit=${limit}`, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json'
    }
  });
}
