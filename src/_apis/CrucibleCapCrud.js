import axios from "axios";
import { baseUrl } from "../utils/const.utils";

export function getCrucibleMaxMintCap() {
  return axios.get(`${baseUrl}/api/v1/crucibleMintCaps/last`);
}
