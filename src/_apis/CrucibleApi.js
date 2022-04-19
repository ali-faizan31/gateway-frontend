import axios from 'axios';
import { defaultEndPointDetails } from '../utils/const.utils';

export class crucibleApi {
    jwtToken = '';

    async signInToServer(userAddress) {
            const res = await axios.post(defaultEndPointDetails.crucibleBaseUrl, {
                command: 'signInUsingAddress',
                data: { userAddress },
                params: []
            });
            const { unsecureSession } = res.data;
            this.address = userAddress;
            this.jwtToken = unsecureSession;
            return unsecureSession;
        }
        //https://4ikenxgwge.execute-api.us-east-2.amazonaws.com/default/kb-staging-backend
    crucibleApi(data) {
        return axios.post(defaultEndPointDetails.crucibleBaseUrl,
            data, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-type': 'Application/json',
                    'Authorization': `Bearer ${this.jwtToken}`
                }
            }
        )
    }

}