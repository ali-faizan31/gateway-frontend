import axios from "axios";
import { defaultEndPointDetails, BSC_api_key } from "../utils/const.utils";

export function getTokenSupplyByContractAddressBSC(tokenContractAddress) {
  return axios.get(`https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=${tokenContractAddress}&apikey=${BSC_api_key}`);
}

// https://api.bscscan.com/api?module=stats&action=tokensupply&contractaddress=0xA719b8aB7EA7AF0DDb4358719a34631bb79d15Dc&apikey=28I5ITFX1EYAC8XZGHXZTFRZAUP5K7II8P
