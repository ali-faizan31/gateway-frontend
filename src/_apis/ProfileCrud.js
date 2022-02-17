import axios from "axios";
import { baseUrl, apiKey } from "../utils/const.utils";

export function sendOTP(token, profileToken, values) {
  return axios.put(
    `${baseUrl}/api/v1/community-member/users/profile/re-send/email/otp`,
    values,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        "Profile-Authorization": profileToken,
      },
    }
  );
}

export function updateEmail(token, profileToken, values) {
  return axios.post(
    `${baseUrl}/api/v1/community-member/users/edit/profile/update/email`,
    values,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
        "Profile-Authorization": profileToken,
      },
    }
  );
}
export function getMe(token) {
  return axios.get(`${baseUrl}/api/v1/community-member/users/profile/me`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "Application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export function mockGetToken(token, values) {
  console.log(values);
  return axios.post(
    `${baseUrl}/api/v1/community-member/users/edit/profile/mock/token`,
    values,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "Application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
