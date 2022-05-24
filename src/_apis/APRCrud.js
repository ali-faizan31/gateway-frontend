import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";

export function getAPRInformationForPublicUser() {
  return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/crucibleAutoCalculateApr/calculate`);
}
