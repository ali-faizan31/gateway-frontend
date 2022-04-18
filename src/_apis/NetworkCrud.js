import axios from 'axios';
import { defaultEndPointDetails } from '../utils/const.utils';

export function getNetworkInformationForPublicUser(id) {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/networks?ferrumNetworkIdentifier=${id}`);
}