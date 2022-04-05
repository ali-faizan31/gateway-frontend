import axios from 'axios';
import { baseUrl } from '../utils/const.utils'; 

export function uniqueOrganizationSiteName(name) {
  return axios.get(`${baseUrl}/api/v1/organizations/?search=${name}`);
}

export function getSubscriptionInformationForAssociatedOrganizationBySiteName(name) {
  return axios.get(`${baseUrl}/api/v1/subscriptions/details/of/organization/by/sitename/${name}`)
} 