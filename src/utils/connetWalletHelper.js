import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          1: "https://mainnet.infura.io/v3/498f412c002d42d8ba75293910cae6f8",
          4: "https://rinkeby.infura.io/v3/498f412c002d42d8ba75293910cae6f8",
          56: "https://bsc-dataseed.binance.org/",
          97: "https://bsc-dataseed.binance.org/",
        },
      },
    },
  };
  
  const web3Modal = () =>
    new Web3Modal({
      cacheProvider: true,
      providerOptions, // required
    });
  
  function initWeb3(provider) {
    const web3 = new Web3(provider);
  
    web3.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3.utils.hexToNumber,
        },
      ],
    });
  
    return web3;
  }
  
  const disconnectWeb3 = async () => {
    const modal = web3Modal();
    await modal.clearCachedProvider();
  };
  
  const subscribeProvider = async (provider, web3, setAddress, setConnected, setNetwork) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => disconnectWeb3());
    provider.on("onConnect", async (accounts) => {
      console.log(accounts, "pppp");
      setAddress(accounts[0]);
    });
  
    provider.on("accountsChanged", async (accounts) => {
      console.log(accounts);
      setAddress(accounts[0]);
      setConnected(false); 
    });
    provider.on("chainChanged", async (chainId) => {
      const networkId = await web3.eth.net.getId();
      setNetwork(chainId);
      console.log(networkId);
    });
  
    provider.on("networkChanged", async (networkId) => {
      const chainId = await web3.eth.chainId();
      setNetwork(chainId);
    });
  };

 export const connectWeb3 = async (setAddress, setConnected, setWeb3, setNetwork, toast) => { 
    try {
      const modal = web3Modal();
      const provider = await modal.connect();
      const web3 = await initWeb3(provider);
      const accounts = await web3.eth.getAccounts();
      const network = await web3.eth.chainId();
      const address = accounts[0];
      setWeb3(web3);
      setNetwork(network);
      setConnected(true);
      setAddress(address); 
      const walletInformation = {address: address, network: network};
      console.log( address, network) 
      await subscribeProvider(provider, web3, setAddress, setConnected, setNetwork);
      return walletInformation;
    //   onSubmit(values, network, address);
    } catch (e) {
      toast.error(`Error Occured ${e}`); 
    }
  };
