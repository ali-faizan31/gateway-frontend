import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";

export function uniqueOrganizationSiteName(name) {
  return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/organizations/?search=${name}`);
}

export function getSubscriptionInformationForAssociatedOrganizationBySiteName(name) {
  return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/subscriptions/details/of/organization/by/sitename/${name}`);
}
