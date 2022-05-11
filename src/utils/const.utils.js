export const baseUrl =
  //"https://api-leaderboard.dev.svcs.ferrumnetwork.io"; // dev
  "https://api-gateway-v1.svcs.ferrumnetwork.io"; // prod-gateway
//"https://api-gateway-v1.stage.svcs.ferrumnetwork.io" // staging-gateway
//"https://localhost:8080"
export const apiKeyForApplicationUser =
  // "66fadbfe-b625-48d1-9255-2c6317adf0bf"; // staging
  // "b63d9502-1ddd-4ccb-b0bd-e59a3531d7f6"; // dev
  "66fadbfe-b625-48d1-9255-2c6317adf0bf"; // prod
export const tokenFRMBSCMainnet = "0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc";
export const tokenFRMxBSCMainnet = "0x8523518001ad5d24b2a04e8729743c0643a316c0";
export const tokenUSDCBSCMainnet = "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d";
export const stakingContractAddressListFOMO = [
  "0x90Bdee77ed081777C12b216f968db706f071b589",
  "0x3e6b25a764d43ac75dd1d108ffa10eea9f42acbf",
  "0x6c034b217287b64cb6c6970c1e556045843ee479",
];
export const walletAuthenticationBackendURL = "https://alemytxku6.execute-api.us-east-2.amazonaws.com/default/wallet-auth-backend";
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
export const cFRM_Competition_Details = { id: "627be21bece9d7534513a7f3", name: "cFRM Competition" };
export const cFRMx_Competition_Details = { id: "627be3a2ece9d7534513a877", name: "cFRMx Competition" };

export const cFRMxTokenContractAddress = "0x1fC45F358D5292bEE1e055BA7CebE4d4100972AE";
export const cFRMTokenContractAddress = "0xaf329a957653675613D0D98f49fc93326AeB36Fc";
export const APELPCFRMBNBTokenContractAddress = "0x9aa0AB73409311984ED84f3Edef962201Bd11712";
export const APELPCFRMxBNBTokenContractAddress = "0xb76b11410A506495418D20c58F9452c17CF285c1";

export const Crucible_Farm_Address_Details = {
  cFRM: {
    DashboardStepFlowId: "6238386bd292da2db05524f9",
    network: "BSC",
    internalName: "cFRM",
    contract: "0xaf329a957653675613D0D98f49fc93326AeB36Fc",
    LpCurrency: "0x9aa0AB73409311984ED84f3Edef962201Bd11712",
    LPstakingAddress: "0x35E15ff9eBB37D8C7A413fD85BaD515396DC8008",
  },
  cFRMx: {
    DashboardStepFlowId: "62383865d292da2db05524f6",
    internalName: "cFRMx",
    contract: "0x1fC45F358D5292bEE1e055BA7CebE4d4100972AE",
    network: "BSC",
    LpCurrency: "0xb76b11410A506495418D20c58F9452c17CF285c1",
    LPstakingAddress: "0x35E15ff9eBB37D8C7A413fD85BaD515396DC8008",
  },
  "cFRM-BNB": {
    DashboardStepFlowId: "6238314dd292da2db05524dd",
    network: "BSC",
    internalName: "cFRM-BNB",
    contract: "0xaf329a957653675613D0D98f49fc93326AeB36Fc", // crucible contract address
    LpCurrency: "0x9aa0AB73409311984ED84f3Edef962201Bd11712", // CAKE-LP token for crucible and bnb pair
    LPstakingAddress: "0x35E15ff9eBB37D8C7A413fD85BaD515396DC8008",
  },
  "cFRMx-BNB": {
    DashboardStepFlowId: "62383841d292da2db05524f3",
    network: "BSC",
    internalName: "cFRMx-BNB",
    contract: "0x1fC45F358D5292bEE1e055BA7CebE4d4100972AE",
    LpCurrency: "0xb76b11410A506495418D20c58F9452c17CF285c1",
    LPstakingAddress: "0x35E15ff9eBB37D8C7A413fD85BaD515396DC8008",
  },
};

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
