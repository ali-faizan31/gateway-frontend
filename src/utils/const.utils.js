import { Environment } from "./Environment";

export const CRUCIBLE_ALPHA_V4 = "v4";
export const CRUCIBLE_BETA = "beta";
export const Site_Name = "gateway.ferrumnetwork.io";
export const defaultEndPointDetails = Environment.defaultEndPoint();

export const tokenFRMBSCMainnet = "0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc";
export const tokenFRMxBSCMainnet = "0x8523518001ad5d24b2a04e8729743c0643a316c0";
export const tokenUSDCBSCMainnet = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
export const stakingContractAddressListFerrum = ["0x35e15ff9ebb37d8c7a413fd85bad515396dc8008"];
export const stakingContractAddressListFOMO = [
  "0x90Bdee77ed081777C12b216f968db706f071b589",
  "0x3e6b25a764d43ac75dd1d108ffa10eea9f42acbf",
  "0x6c034b217287b64cb6c6970c1e556045843ee479",
];
export const BSC_api_key = "QFQI7J6GMJXYJW6T5GYNGNNFCWI41S21JI";
export const apiKey = "ckey_173b82c807954a8697b251305c5:"; // to be removed
export const TOKEN_TAG = "tokenV2";
export const ME_TAG = "meV2";
export const ORG_ROLE_TAG = "organizationAdmin";
export const COMMUNITY_ROLE_TAG = "communityMember";
export const PHRASE_TOKEN = "bf3fa63f66e88f4453c018f568445a03889f494343973cc33c90401d9d525447";
export const PHRASE_PROJECT = "dbc35f418d27873591479252f9883427";
export const PUBLIC_TAG = "/pub";
export const FRM_FRMx_leaderboard_Details = { id: "61b6d48337f5125acbbfddeb", name: "FRM & FRMx BSC Leaderboard" };
export const cFRM_Volume_Competition_Details = { id: "627be21bece9d7534513a7f3", name: "cFRM Volume Competition" };
export const cFRMx_Volume_Competition_Details = { id: "627be3a2ece9d7534513a877", name: "cFRMx Volume Competition" };
export const cFRM_Trading_Competition_Details = { id: "62826f92248e400f93b7316e", name: "cFRM Trading Competition" };
export const cFRMx_Trading_Competition_Details = { id: "628270b8248e400f93b731cd", name: "cFRMx Trading Competition" };

export const cFRMxTokenContractAddress = "0x1fC45F358D5292bEE1e055BA7CebE4d4100972AE";
export const cFRMTokenContractAddress = "0xaf329a957653675613D0D98f49fc93326AeB36Fc";
export const APELPCFRMBNBTokenContractAddress = "0x9aa0AB73409311984ED84f3Edef962201Bd11712";
export const APELPCFRMxBNBTokenContractAddress = "0xb76b11410A506495418D20c58F9452c17CF285c1";

export const Start_Competition_Buy_Button_Link =
  "https://pancakeswap.finance/swap?inputCurrency=0x8523518001ad5d24b2a04e8729743c0643a316c0&outputCurrency=0x1fC45F358D5292bEE1e055BA7CebE4d4100972AE&exactField=output&exactAmount=1";

export const Pricing_Tokens = [
  {
    token: "FRM",
    currency: tokenFRMBSCMainnet,
  },
  {
    token: "FRMx",
    currency: tokenFRMxBSCMainnet,
  },
  {
    token: "cFRM-BNB",
    currency: APELPCFRMBNBTokenContractAddress,
  },
  {
    token: "cFRMx-BNB",
    currency: APELPCFRMxBNBTokenContractAddress,
  },
  {
    token: "cFRM",
    currency: cFRMTokenContractAddress,
  },
  {
    token: "cFRMx",
    currency: cFRMxTokenContractAddress,
  },
];

export function isGateWaySite() {
  if (window.origin.includes(CRUCIBLE_ALPHA_V4) || window.origin.includes(CRUCIBLE_BETA)) {
    return false;
  }
  return true;
}
