import axios from 'axios';
import { baseUrl } from '../utils/conts.utils'; 

export function uniqueOrganizationSiteName(name) {
  return axios.get(`${baseUrl}/api/v1/organizations/?search=${name}`);
}
