import axios from 'axios';
import { baseUrl } from '../utils/const.utils';  

export function getAllRoleBasedUsers(role, isEmailAuthenticated, offset, limit, isPagination, token) { 
    return axios.get(`${baseUrl}/api/v1/admin/users/list?role=${role}&isEmailAuthenticated=${isEmailAuthenticated}&offset=${offset}&limit=${limit}&isPagination=${isPagination}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'Application/json',
        Authorization: `Bearer ${token}`
      }
    });
  }
  