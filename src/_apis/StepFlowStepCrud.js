import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";


export function getStepFlowStepByAssociatedOrganizationByStepFlowStepId(id, token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/admin/stepFlowSteps/${id}`, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-type": "Application/json",
            Authorization: `Bearer ${token}`,
        },
    });
}

export function getStepFlowStepByStepFlowIdForPublic(id) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/stepFlowSteps/${id}`);
}