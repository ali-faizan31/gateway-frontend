// import { AppUserProfile } from "../container-components/wallet-application-wrapper";

export const BRIDGE_NETWORKS = [
    "ETHEREUM",
    "RINKEBY",
    "RINKEBY",
    "BSC",
    "BSC_TESTNET",
    "POLYGON",
    "MUMBAI_TESTNET",
    "AVAX_TESTNET",
    "AVAX_MAINNET",
    "MOON_MOONRIVER",
    "HARMONY_TESTNET_0",
    "FTM_TESTNET",
    "FTM_MAINNET",
  ];
  
  export const BRIDGE_CONTRACTS = {
    RINKEBY: "0x89262b7bd8244b01fbce9e1610bf1d9f5d97c877",
    BSC_TESTNET: "0x89262b7bd8244b01fbce9e1610bf1d9f5d97c877",
    MUMBAI_TESTNET: "0x89262b7bd8244b01fbce9e1610bf1d9f5d97c877",
    ETHEREUM: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
    BSC: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
    POLYGON: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
    AVAX_TESTNET: "0xbe442727d882b17144040a075acf27abbb68643f",
    MOON_MOONBASE: "0x347d11cc7fbeb535d71e1c6b34bdd33a7a999f45",
    AVAX_MAINNET: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
    MOON_MOONRIVER: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
    HARMONY_TESTNET_0: "0x1be6148e383abee84d68d3c6a9fc61809b16a6a4",
    HARMONY_MAINNET_0: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
    FTM_TESTNET: "0x769a03c4080c090d6e4e751d1e362d889c4d8bec",
    FTM_MAINNET: "0x8e01cc26d6dd73581347c4370573ce9e59e74802",
  } as any;
  
  // export const FRM: { [k: string]: [string, string, string] } = {
  //   ETHEREUM: [
  //     "ETHEREUM:0xe5caef4af8780e59df925470b050fb23c43ca68c",
  //     "FRM",
  //     "ETHEREUM",
  //   ],
  //   RINKEBY: [
  //     "RINKEBY:0xfe00ee6f00dd7ed533157f6250656b4e007e7179",
  //     "FRM",
  //     "RINKEBY",
  //   ],
  //   POLYGON: [
  //     "POLYGON:0xd99bafe5031cc8b345cb2e8c80135991f12d7130",
  //     "FRM",
  //     "MATIC",
  //   ],
  //   BSC_TESTNET: [
  //     "BSC_TESTNET:0xfe00ee6f00dd7ed533157f6250656b4e007e7179",
  //     "FRM",
  //     "BSC_TESTNET",
  //   ],
  //   MUMBAI_TESTNET: [
  //     "MUMBAI_TESTNET:0xfe00ee6f00dd7ed533157f6250656b4e007e7179",
  //     "FRM",
  //     "MUMBAI_TESTNET",
  //   ],
  // };
  
  // export interface NetworkDropdown {
  //   key: string;
  //   display: string;
  //   active: boolean;
  //   mainnet: boolean;
  // }
  
  // const _supportedNetworks: any = {
  //   ETHEREUM: ["active", "Ethereum", "mainnet"],
  //   RINKEBY: ["active", "Rinkeby testnet", "testnet"],
  //   BSC_TESTNET: ["active", "BSC testnet", "testnet"],
  //   BSC: ["active", "BSC", "mainnet"],
  //   POLYGON: ["active", "Polygon (Matic)", "mainnet"],
  //   MUMBAI_TESTNET: ["active", "Matic testnet", "testnet"],
  // };
  
  // TODO: Directly write the constants
  // export const supportedNetworks: { [k: string]: NetworkDropdown } = {};
  // Object.keys(_supportedNetworks).forEach((k) => {
  //   const [a, d, m] = _supportedNetworks[k];
  //   supportedNetworks[k] = {
  //     key: k,
  //     active: a === "active",
  //     display: d,
  //     mainnet: m === "mainnet",
  //   };
  // });
  
  const chainContent = (
    chainId: string,
    chainName: string,
    name: string,
    symbol: string,
    decimals: number,
    rpcUrls: string[],
    blockExplorerUrls: string[]
  ) => ({
    chainId: chainId,
    chainName: chainName,
    nativeCurrency: {
      name: name,
      symbol: symbol,
      decimals: decimals,
    },
    rpcUrls: rpcUrls,
    blockExplorerUrls: blockExplorerUrls,
  });
  
  // export const TokenInfo = {
  //   "RINKEBY:0xfe00ee6f00dd7ed533157f6250656b4e007e7179": {
  //     tokenAddress: "0xFe00EE6F00dD7ed533157f6250656B4E007E7179",
  //     tokenSymbol: "FRM",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/8251/small/frm.png?1563777564",
  //     type: "ERC20",
  //   },
  //   "BSC_TESTNET:0xfe00ee6f00dd7ed533157f6250656b4e007e7179": {
  //     tokenAddress: "0xFe00EE6F00dD7ed533157f6250656B4E007E7179",
  //     tokenSymbol: "FRM",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/8251/small/frm.png?1563777564",
  //     type: "ERC20",
  //   },
  //   "MUMBAI_TESTNET:0xfe00ee6f00dd7ed533157f6250656b4e007e7179": {
  //     tokenAddress: "0xFe00EE6F00dD7ed533157f6250656B4E007E7179",
  //     tokenSymbol: "FRM",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/8251/small/frm.png?1563777564",
  //     type: "ERC20",
  //   },
  //   "MUMBAI_TESTNET:0xc7b58945a08aa90f6db6440fb0bcc22fb45e6e98": {
  //     tokenAddress: "0xc7b58945a08aa90f6db6440fb0bcc22fb45e6e98",
  //     tokenSymbol: "RVF",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/14728/small/7.png?1618414105",
  //     type: "ERC20",
  //   },
  //   "ETHEREUM:0xe5caef4af8780e59df925470b050fb23c43ca68c": {
  //     tokenAddress: "0xe5caef4af8780e59df925470b050fb23c43ca68c",
  //     tokenSymbol: "FRM",
  //     tokenDecimals: 6,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/8251/small/frm.png?1563777564",
  //     type: "ERC20",
  //   },
  //   "POLYGON:0xd99bafe5031cc8b345cb2e8c80135991f12d7130": {
  //     tokenAddress: "0xd99bafe5031cc8b345cb2e8c80135991f12d7130",
  //     tokenSymbol: "FRM",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/8251/small/frm.png?1563777564",
  //     type: "ERC20",
  //   },
  //   "ETHEREUM:0xdc8af07a7861bedd104b8093ae3e9376fc8596d2": {
  //     tokenAddress: "0xdc8af07a7861bedd104b8093ae3e9376fc8596d2",
  //     tokenSymbol: "RVF",
  //     tokenDecimals: 18,
  //     tokenImage: "https://etherscan.io/token/images/rocketvault_32.png",
  //     type: "ERC20",
  //   },
  //   "POLYGON:0x2ce13e4199443fdfff531abb30c9b6594446bbc7": {
  //     tokenAddress: "0x2ce13e4199443fdfff531abb30c9b6594446bbc7",
  //     tokenSymbol: "RVF",
  //     tokenDecimals: 18,
  //     tokenImage: "https://etherscan.io/token/images/rocketvault_32.png",
  //     type: "ERC20",
  //   },
  //   "BSC_TESTNET:0x532197ec38756b9956190b845d99b4b0a88e4ca9": {
  //     tokenAddress: "0x532197ec38756b9956190b845d99b4b0a88e4ca9",
  //     tokenSymbol: "PAID",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/13761/small/PAID.png?1612493556",
  //     type: "ERC20",
  //   },
  //   "RINKEBY:0xe1de1dc4de074e9c8bbf5e2d66cfdb4f0b2cb61a": {
  //     tokenAddress: "0xe1de1dc4de074e9c8bbf5e2d66cfdb4f0b2cb61a",
  //     tokenSymbol: "PAID",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/13761/small/PAID.png?1612493556",
  //     type: "ERC20",
  //   },
  //   "ETHEREUM:0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787": {
  //     tokenAddress: "0x1614f18fc94f47967a3fbe5ffcd46d4e7da3d787",
  //     tokenSymbol: "PAID",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/13761/small/PAID.png?1612493556",
  //     type: "ERC20",
  //   },
  //   "BSC:0xad86d0e9764ba90ddd68747d64bffbd79879a238": {
  //     tokenAddress: "0xad86d0e9764ba90ddd68747d64bffbd79879a238",
  //     tokenSymbol: "PAID",
  //     tokenDecimals: 18,
  //     tokenImage:
  //       "https://assets.coingecko.com/coins/images/13761/small/PAID.png?1612493556",
  //     type: "ERC20",
  //   },
  // } as any;
  
  export const chainData = {
    ETHEREUM: chainContent(
      "0x1",
      "Ethereum Mainnet",
      "ETH",
      "ETH",
      1,
      ["https://mainnet.infura.io/v3/"],
      ["https://etherscan.io/"]
    ),
    RINKEBY: chainContent(
      "0x4",
      "Rinkeby Test Network",
      "ETH",
      "ETH",
      4,
      ["https://rinkeby.infura.io/v3/"],
      ["https://rinkeby.etherscan.io/"]
    ),
    BSC_TESTNET: chainContent(
      "0x61",
      "BSC Testnet",
      "BNB",
      "BNB",
      18,
      ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
      ["https://explorer.binance.org/smart-testnet/"]
    ),
    BSC: chainContent(
      "0x38",
      "Binance Smart Chain",
      "BNB",
      "BNB",
      18,
      ["https://bsc-dataseed.binance.org/"],
      ["https://bscscan.com/"]
    ),
    POLYGON: chainContent(
      "0x89",
      "Polygon (Matic)",
      "MATIC",
      "MATIC",
      18,
      ["https://rpc-mainnet.maticvigil.com/"],
      ["https://ploygonscan.com/"]
    ),
    MUMBAI_TESTNET: chainContent(
      "0x13881",
      "Matic (Mumbai) testnet",
      "MATIC",
      "MATIC",
      18,
      ["https://rpc-mumbai.maticvigil.com/"],
      ["https://mumbai.polygonscan.com/"]
    ),
    SOLANA: chainContent(
      "0x38",
      "Binance Smart Chain",
      "BNB",
      "BNB",
      18,
      ["https://bsc-dataseed.binance.org/"],
      ["https://bscscan.com/"]
    ),
  };
  
  // export function addressForUser(user?: AppUserProfile) {
  //   if (!user) {
  //     return undefined;
  //   }
  //   return (user.accountGroups || [])[0].addresses[0] || {};
  // }
  
  // export function logError(msg: string, err: Error) {
  //   console.error(msg, err);
  // }
  