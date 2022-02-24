export interface WALLET_AUTHENTICATION_STATE {
    nonce: String,
    signature: String;
    applicationUserToken: String;
    isAllowedonGateway: Boolean | undefined;
    allowedNetworksonGateway: Array<any>;
    error: Boolean;
    getSignatureFromMetamask: Boolean;
    meV2: any;
    tokenV2: String;
    profileToken: string;
  }
  
  export const defaultWalletAuthenticationState: WALLET_AUTHENTICATION_STATE = {
    nonce: "",
    signature: "",
    applicationUserToken:"",
    isAllowedonGateway:undefined,
    allowedNetworksonGateway: [],
    error: false,
    getSignatureFromMetamask: false,
    meV2: {},
    tokenV2: "",
    profileToken:""
  };