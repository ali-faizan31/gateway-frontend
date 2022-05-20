import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";

export function getCrucibleMaxMintCap() {
    return axios.get(`${defaultEndPointDetails.baseUrl}/api/v1/crucibleMintCaps/last`);
}