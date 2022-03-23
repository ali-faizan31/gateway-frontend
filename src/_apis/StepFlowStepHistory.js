import axios from "axios";
import { baseUrl, apiKey } from "../utils/const.utils";

export function getUserLatestStepFlowStepHistoryByStepFlowId( id, token ) {
    return axios.get(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/stepFlow/latest/${id}`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}
  
export function updateStepFlowStepHistoryByStepFlowStepHistoryId( id, values, token ) {
    return axios.put(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/update/status/${id}`, values, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}

export function startNewSequenceForStepFlowStepHistoryByStepFlowId( id, token ) {
    return axios.get(`${baseUrl}/api/v1/community-member/stepsFlowStepsHistory/restart/stepFlow/${id}`, {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        },
    });
}