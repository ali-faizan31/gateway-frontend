import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";

export function uniqueOrganizationSiteName(name) {
  return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/organizations/?search=${name}`);
}

export function getSideMenuForAssociatedOrganizationBySiteName(name, token, isForGateway) {
  if (token) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/products/menu?siteName=${name}&isForGateway=${isForGateway}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/products/menu?siteName=${name}&isForGateway=${isForGateway}`);
}
