export const chainIdList = [
  { id: "1", label: "Ethereum" },
  { id: "4", label: "Rinkeby" },
  { id: "56", label: "BSC" },
  { id: "97", label: "BSC Testnet" },
  { id: "137", label: "Polygon (Matic)" },
  { id: "80001", label: "Polygon Testnet (Mumbai) " },
  { id: "128", label: "HECO" },
  { id: "256", label: "HECO Testnet" },
];

export const dexUrlList = [
  { url: "https://app.uniswap.org/#/", label: "https://app.uniswap.org/#/" },
  { url: "https://pancakeswap.finance/", label: "https://pancakeswap.finance/" },
  { url: "https://app.apeswap.finance/", label: "https://app.apeswap.finance/" },
  { url: "https://exchange.dfyn.network/#/", label: "https://exchange.dfyn.network/#/" },
  { url: "https://quickswap.exchange/#/", label: "https://quickswap.exchange/#/" },
];

export const filterList = (items, addressList) => {
  if (items && items.length > 0 && addressList && addressList.length > 0) {
    const filteredList = items.filter(
      (element2) => addressList.map((element1) => element1).indexOf(element2.tokenHolderAddress || element2.TokenHolderAddress || element2.address) === -1
    );
    return filteredList;
  }
};
