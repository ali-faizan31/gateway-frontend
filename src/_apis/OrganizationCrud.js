import axios from 'axios';
import { baseUrl } from '../utils/conts.utils';

const token = localStorage.getItem('token');

export function uniqueOrganizationSiteName(name) {
  return axios.get(`${baseUrl}/api/v1/organizations/?search=${name}`);
}
