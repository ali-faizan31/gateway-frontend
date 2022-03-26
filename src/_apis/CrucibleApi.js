import axios from 'axios';
import { baseUrl, apiKey } from '../utils/const.utils';  

export class crucibleApi {
  jwtToken = '';
  
  async signInToServer(userAddress) {
    const res = await  await axios.post(`https://4ikenxgwge.execute-api.us-east-2.amazonaws.com/default/kb-staging-backend`,{
      command: 'signInUsingAddress', data: {userAddress}, params: [] });
    const { unsecureSession } = res.data;
    this.address = userAddress;
    this.jwtToken = unsecureSession;
    console.log(res,'lores')
    return unsecureSession;
  }

  crucibleApi(data) { 
    return axios.post(`https://4ikenxgwge.execute-api.us-east-2.amazonaws.com/default/kb-staging-backend`, 
    data,
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        'Authorization': `Bearer ${this.jwtToken}`
      }
    }
  )}

}

  