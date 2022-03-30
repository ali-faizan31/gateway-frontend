import eitherConverter from "ether-converter";

export const arraySortByKeyDescending = (array, key) =>
  array.slice().sort((a, b) => b[key] - a[key]);

export const mergeTwoArrays = (dataset1, dataset2) => {
  // const arr1 = [
  //   { address: "12", balance: "frm same" },
  //   { address: "25", balance: "frm same" },
  //   { address: "14", balance: "frm" },
  // ];
  // const arr2 = [
  //   { address: "23", balance: "frmx" },
  //   { address: "12", balance: "frmx same" },
  //   { address: "25", balance: "frmx same" },
  //   { address: "26", balance: "frmx" },
  // ];
  const map1 = new Map();
  const map2 = new Map();
  dataset1.forEach((d1, i) => {
    map1.set(d1.address, i);
  });
  dataset2.forEach((d2, i) => {
    map2.set(d2.address, i);
  });
  for (const d2 of dataset2) {
    if (d2 && map1.has(d2.address)) {
      dataset1[map1.get(d2.address)] = {
        address: d2.address,
        frmBalance: d2.balance,
        frmxBalance: dataset1[map1.get(d2.address)].balance,
      };
    } else if (d2) {
      dataset1.push({ address: d2?.address, frmx: d2?.value });
    }
  }
  return dataset1;
};

export const localStorageHelper = {
  load(key) {
    const stored = localStorage.getItem(key);
    return stored == null ? undefined : JSON.parse(stored);
  },
  getToken(key) {
    const stored = localStorage.getItem(key);
    return stored == null ? undefined : stored;
  },
  storeObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  storeToken(key, value) {
    localStorage.setItem(key, value);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  },
  modify(key, fn) {
    this.store(key, fn(this.load(key)));
  },
  appendItemToArray: (item, storageID) => {
    this.modify(storageID, (storage = []) => [...storage, item]);
  },
  removeItemFromArray: (item, storageID) => {
    this.modify(storageID, (storage = []) => storage.filter((s) => s !== item));
  },
  saveItemToObject: (item, storageID) => {
    this.modify(storageID, (storage = {}) => ({ ...storage, item }));
  },
};

export const checkSession = () => {
  let session = sessionStorage?.getItem("persist:walletAutheticator");
  return JSON.parse(session).tokenV2 ? true : false;
};

export const getFormattedBalance = (balance) =>
  eitherConverter(balance, "wei").ether;

export const getFormattedWalletAddress = (address) =>
  `${address.substr(0, 6)}...${address.substr(address.length - 4)}`;

export const getLatestStepWithPendingStatus = (stepResponse) => {
  let previous = {};
  let current = {};
  for (let i = 0; i < stepResponse.length; i++) {
    if (i === 0) {
      previous = stepResponse[i];
      current = stepResponse[i];
      if (previous.status === "pending") {
        return previous;
      }
    } else {
      previous = stepResponse[i - 1];
      current = stepResponse[i];

      if (previous.status === "completed" && current.status === "pending") {
        return current;
      }
    }
  }
};
