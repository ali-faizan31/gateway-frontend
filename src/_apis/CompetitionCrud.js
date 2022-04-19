import axios from 'axios';
import { defaultEndPointDetails } from '../utils/const.utils';

export function getAllCompetitions(offset, limit, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/admin/competitions/list?offset=${offset}&limit=${limit}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function getCompetitionById(id, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/competitions/${id}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

export function updateCompetitionStatusById(id, values, token) {
    return axios.put(`${defaultEndPointDetails.baseUrl}/api/v1/admin/competitions/update/status/${id}`,
        values, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}



export function addCompetition(values, token) {
    return axios.post(`${defaultEndPointDetails.baseUrl}/api/v1/admin/competitions/create`,
        values, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-type": "Application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );
}

export function getCompetitionByIdForPublicUser(id, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/competitions/${id}`);
}


export function getCompetitionsParticipantsRanks(competitionId, isPagination, offset, limit) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/competitions/participants/growth/${competitionId}?isPagination=${isPagination}&offset=${offset}&limit=${limit}`, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'Application/json'
        }
    });
}