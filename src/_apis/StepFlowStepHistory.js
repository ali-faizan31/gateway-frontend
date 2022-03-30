import axios from "axios";
import { baseUrl } from "../utils/const.utils";

export function getLatestStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId( id, token ) {
    return axios.get(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/stepFlow/latest/${id}?isPagination=false`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}

export function getStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId( id, token ) {
    return axios.get(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/stepFlow/${id}?isPagination=false`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}

export function updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId( id, values, token ) {
    return axios.put(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/update/status/${id}`, values, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}

export function startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId( id, token ) {
    return axios.get(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/restart/stepFlow/${id}?isPagination=false`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}