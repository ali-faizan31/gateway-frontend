import axios from 'axios';
import { baseUrl, apiKey, BSC_api_key } from '../utils/const.utils';  

export function getNetworkInformationForPublicUser(id) {
    return axios.get(`${baseUrl}/api/v1/networks?ferrumNetworkIdentifier${id}`);
  }