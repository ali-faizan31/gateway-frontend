export interface WALLET_AUTHENTICATION_STATE {
    nonce: String,
    signature: String;
    applicationUserToken: String;
    isAllowedonGateway: Boolean | undefined;
    allowedNetworksonGateway: string[];
    error: Boolean;
  }
  
  export const defaultWalletAuthenticationState: WALLET_AUTHENTICATION_STATE = {
    nonce: "",
    signature: "",
    applicationUserToken:"",
    isAllowedonGateway:undefined,
    allowedNetworksonGateway: [],
    error: false
  };