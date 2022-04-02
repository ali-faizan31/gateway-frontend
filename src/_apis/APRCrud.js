import axios from "axios";
import { baseUrl } from "../utils/const.utils";

export function getAPRInformationForPublicUser() {
  return axios.get(`${baseUrl}/api/v1/crucibleAprs/last`);
}
