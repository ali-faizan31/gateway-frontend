export interface WALLET_AUTHENTICATION_STATE {
    nonce: String,
    signature: String;
    applicationUserToken: String;
    isAllowedonGateway: Boolean | undefined;
    allowedNetworksonGateway: Array<any>;
    error: Boolean;
    getSignatureFromMetamask: Boolean;
    me: any;
    communityMemberToken: String;
  }
  
  export const defaultWalletAuthenticationState: WALLET_AUTHENTICATION_STATE = {
    nonce: "",
    signature: "",
    applicationUserToken:"",
    isAllowedonGateway:undefined,
    allowedNetworksonGateway: [],
    error: false,
    getSignatureFromMetamask: false,
    me: {},
    communityMemberToken: ""
  };