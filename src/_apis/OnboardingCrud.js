import axios from 'axios';
import {baseUrl } from '../utils/const.utils' 

export function organizationAdminLogin(values) {
  return axios.post(`${baseUrl}/api/v1/admin/users/sign-in`, values);
}

export function organizationAdminRegister(values) {
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
 
export function sendForgotPasswordLink(values) {
  return axios.post(`${baseUrl}/api/v1/users/forgot-password`, values);
}

export function authenticateForgotPasswordLink(values) {
  return axios.post(`${baseUrl}/api/v1/users/forgot-password/authenticate/link`, values);
}

export function resetPassword(values, token) { 
  return axios.put(`${baseUrl}/api/v1/users/reset-password`, values, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'Application/json',
      Authorization: `Bearer ${token}`
    }
  }); 
}