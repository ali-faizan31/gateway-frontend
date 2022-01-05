import axios from 'axios';
import {baseUrl } from '../utils/const.utils'

const token = localStorage.getItem('token');

export function login(values) {
  return axios.post(`${baseUrl}/api/v1/admin/users/sign-in`, values);
}

export function register(values) {
  return axios.post(`${baseUrl}/api/v1/admin/users/sign-up`, values);
}

export function communityMemberLogin(values) {
  return axios.post(`${baseUrl}/api/v1/community-member/users/sign-in`, values);
}

export function communityMemberRegister(values) {
  return axios.post(`${baseUrl}/api/v1/community-member/users/sign-up`, values);
}

export function communityMemberEmailVerify(values) {
  return axios.post(`${baseUrl}/api/v1/users/authenticate/email/otp`, values);
}

export function communityMemberResendVerifyCode(values) {
  return axios.post(`${baseUrl}/api/v1/users/re-send/email/otp`, values);
}

export function updateUser(values, token) {
  return axios.put(`${baseUrl}/api/v1/community-member/users/update/me`, values , {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  });
}