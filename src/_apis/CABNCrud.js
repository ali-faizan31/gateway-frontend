import axios from "axios";
import { defaultEndPointDetails } from "../utils/const.utils";

export function getCABNInformationForPublicUser(tokenContractAddress) {
    return axios.get(
        `${defaultEndPointDetails.baseUrl}/api/v1/currencies/cabn/list?search=${tokenContractAddress}&offset=0&limit=10&isPagination=false`
    );
}