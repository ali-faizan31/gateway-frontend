/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FTable, FContainer, FButton, FGrid, FInputText, FGridItem, FDialog, FItem } from "ferrum-design-system";
import Datatable from "react-bs-datatable";
import { useParams, useLocation } from "react-router-dom";
import eitherConverter from "ether-converter";
import { CSVLink } from "react-csv";
import moment from "moment";
import { getLeaderboardById, getLeaderboardByIdForPublicUser, getStakingBalancesByCABNBSC, getTokenHolderlistByContractAddressBSC } from "../../_apis/LeaderboardCrud";
import { arraySortByKeyDescending, getErrorMessage } from "../../utils/global.utils";
import { cFRMTokenContractAddress, cFRMxTokenContractAddress, tokenFRMxBSCMainnet, tokenFRMBSCMainnet, TOKEN_TAG } from "../../utils/const.utils";
import { filterList } from "../leaderboard/LeaderboardHelper";
import { useSelector } from "react-redux";
import { getAllRoleBasedUsers } from "../../_apis/UserCrud";

const LeaderboardInformation = () => {
  const { id } = useParams();
  const exportRef = useRef();
  const { pathname } = useLocation();
  let token = localStorage.getItem(TOKEN_TAG);
  const isPublicUser = pathname.includes("/pub");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryChange, setIsQueryChange] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [tokenHolderList, setTokenHolderList] = useState([]);
  const [filteredTokenHolderList, setFilteredTokenHolderList] = useState([]);
  const [LeaderboardTokenHolderList, setLeaderboardTokenHolderList] = useState([]);
  const [stakingTokenHolderList, setStakingTokenHolderList] = useState([]);
  const [stakingCount, setStakingCount] = useState(0);
  const { activeTranslation } = useSelector((state) => state.phrase);
  const [showExportModal, setShowExportModal] = useState(false);

  let finalstakingList = [];
  let finalWithdrawlList = [];

  useEffect(() => {
    setIsLoading(true);
    setFilteredTokenHolderList([]);
    if (isPublicUser) {
      getPublicLeaderboard();
      return;
    }
    getLeaderboard();
  }, [id]);

  useEffect(() => {
    if (isQueryChange) {
      if (tokenHolderList) {
        const tempData = tokenHolderList.map((x) => x.address.toLowerCase().includes(query.toLowerCase()) && x);
        setFilteredTokenHolderList(tempData.filter((x) => x && x));
        setIsQueryChange(false);
      }
    }
  }, [query]);

  const getPublicLeaderboard = () => {
    getLeaderboardByIdForPublicUser(id)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          const cabn1 = res?.data?.body?.leaderboard?.leaderboardCurrencyAddressesByNetwork[0];
          const tempObj = {
            name: leaderboard?.name,
            exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
            cabn: {
              tokenContractAddress: cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
              dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
              chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
            },
            stakingContractAddresses: leaderboard?.stakingContractAddresses,
          };
          getTokenHolderlist(tempObj);
          setLeaderboardData(tempObj);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        getErrorMessage(e, activeTranslation);
      });
  };

  const getLeaderboard = () => {
    getLeaderboardById(id, token)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          const cabn1 = res?.data?.body?.leaderboard?.leaderboardCurrencyAddressesByNetwork[0];
          const tempObj = {
            name: leaderboard?.name,
            exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
            cabn: {
              tokenContractAddress: cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
              dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
              chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
            },
            stakingContractAddresses: leaderboard?.stakingContractAddresses,
          };
          getTokenHolderlist(tempObj);
          setLeaderboardData(tempObj);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        getErrorMessage(e, activeTranslation);
      });
  };

  const getTokenHolderlist = (leaderboard) => {
    getTokenHolderlistByContractAddressBSC(leaderboard.cabn.tokenContractAddress)
      .then((res) => {
        const filteredList = filterList(res?.data?.result, leaderboard?.exclusionWalletAddressList);
        setLeaderboardTokenHolderList(filteredList);
        let count = 0;
        getDynamicStakingBalances(leaderboard, filteredList, count);
      })
      .catch((e) => {
        toast.error(`Error occured: ${e}`);
      });
  };

  const getDynamicStakingBalances = async (leaderboard, leaderboardHoldersList, count) => {
    if (count < leaderboard?.stakingContractAddresses.length) {
      getStakingBalances(leaderboard, leaderboard?.stakingContractAddresses[count], count, leaderboardHoldersList);
    } else {
      mapTokenHolderData(leaderboardHoldersList, leaderboard);
    }
  };

  const getStakingBalances = (leaderboard, stakingContractaddress, count, leaderboardHoldersList) => {
    getStakingBalancesByCABNBSC(leaderboard?.cabn?.tokenContractAddress, stakingContractaddress)
      .then((res) => {
        if (res && res.data && res.data.result) {
          if (res.data.result.length > 0) {
            const { result } = res.data;
            const data = getStakedMinusWithdrawlBalance(result, stakingContractaddress);
            finalstakingList = [...finalstakingList, ...data];
            count = count + 1;
            getDynamicStakingBalances(leaderboard, leaderboardHoldersList, count);
          } else {
            count = count + 1;
            getDynamicStakingBalances(leaderboard, leaderboardHoldersList, count);
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.message) {
          toast.error(`Error occured: ${e.response.data.message}`);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getStakedMinusWithdrawlBalance = (stakinglist, stakingAddress) => {
    let stakedArray = [];
    let withdrawlArray = [];

    stakinglist.forEach((transfer) => {
      if (transfer.to.toLowerCase() === stakingAddress.toLowerCase()) {
        //staked
        stakedArray.push(transfer);
      } else if (transfer.from.toLowerCase() === stakingAddress.toLowerCase()) {
        // withdrawls
        withdrawlArray.push(transfer);
      }
    });

    stakedArray = getUniqueAddressList(stakedArray, true);
    withdrawlArray = getUniqueAddressList(withdrawlArray, false);

    const totalStakedBalanceList = stakedArray.map((stakedItem) => {
      const withdrawltem = withdrawlArray.filter((withdrawlItem) => stakedItem.from === withdrawlItem.to)[0];
      let tempObj = {};
      if (withdrawltem && Object.keys(withdrawltem).length > 0) {
        const difference = stakedItem.value - withdrawltem.value;
        stakedItem.value = difference;
        return stakedItem;
      }
      return stakedItem;
    });

    return totalStakedBalanceList;
  };

  const getUniqueAddressList = (list, isStaked) => {
    const uniqueList = [];
    list.forEach((i) => {
      const id = isStaked ? i.from : i.to;
      i.points = Number(eitherConverter(i.value, "wei").ether);
      i.value = Number(eitherConverter(i.value, "wei").ether);

      if (!uniqueList[id]) {
        return (uniqueList[id] = i);
      }
      return (uniqueList[id].value += i.points);
    });

    const updatedList = [];
    Object.keys(uniqueList).forEach((key) => {
      updatedList.push(uniqueList[key]);
    });

    return updatedList;
  };

  const getInputCurrency = (tokenContractAddress) => {
    if (tokenContractAddress.toLowerCase() === cFRMTokenContractAddress.toLowerCase()) {
      return tokenFRMBSCMainnet;
    } else if (tokenContractAddress.toLowerCase() === cFRMxTokenContractAddress.toLowerCase()) {
      return tokenFRMxBSCMainnet;
    } else {
      return "BNB";
    }
  };

  const mapTokenHolderData = (leaderboardHoldersList, leaderboard) => {
    const finalList = mapHoldersBalances(leaderboardHoldersList, finalstakingList);
    const filteredList = filterList(finalList, leaderboard.exclusionWalletAddressList);
    const list = arraySortByKeyDescending(filteredList, "balance");
    let inputCurrencyToken = getInputCurrency(leaderboard?.cabn?.tokenContractAddress);
    const levelUpSwapUrl = `${leaderboard?.cabn?.dexUrl}swap?inputCurrency=${inputCurrencyToken}&outputCurrency=${leaderboard?.cabn?.tokenContractAddress}&exactField=output&exactAmount=`;
    for (let i = 0; i < list.length; i += 1) {
      list[i].rank = i + 1;
      list[i].formattedAddress = `${list[i].address.substr(0, 6)}...${list[i].address.substr(list[i].address.length - 4)}`;

      list[i].formattedBalance = TruncateWithoutRounding(list[i].balance, 2).toLocaleString("en-US");

      if (i === 0) {
        list[i].formattedLevelUpAmount = "You are the leader";
        list[i].levelUpUrl = levelUpSwapUrl;
      } else {
        list[i].formattedLevelUpAmount = TruncateWithoutRounding(calculateLevelUpAmount(list[i - 1].balance, list[i].balance), 2).toLocaleString("en-US");
        list[i].levelUpUrl = levelUpSwapUrl + list[i].formattedLevelUpAmount;
      }
    }

    setIsLoading(false);
    setTokenHolderList(list);
    setFilteredTokenHolderList(list);
  };

  const mapHoldersBalances = (leaderboardHoldersList, stakingHoldersList) => {
    const leaderboardWallets = [];
    let stakingWallets = [];
    let matchedWallets = [];

    const onlyInLeft = (stakingList, leaderboardList) =>
      stakingList.map((stakingValue) => {
        const sameEntry = leaderboardList.filter((leaderboardValue) => stakingValue.from === leaderboardValue.TokenHolderAddress)[0];
        let tempObj = {};
        if (!sameEntry || undefined) {
          tempObj = {
            address: stakingValue.from,
            balance: stakingValue.value,
            status: "staking",
          };
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    const inBoth = (leaderboardList, stakingList) =>
      leaderboardList.map((leaderboardValue) => {
        const sameEntry = stakingList.filter((stakingValue) => leaderboardValue.TokenHolderAddress === stakingValue.from)[0];
        let tempObj = {};
        if (sameEntry) {
          const combinedSum = sameEntry.value + Number(eitherConverter(leaderboardValue.TokenHolderQuantity, "wei").ether); // of both list
          tempObj = {
            address: sameEntry.from,
            balance: combinedSum,
            status: "Matched",
          }; // both
        } else {
          let temp = {};
          temp = {
            status: "leaderboard",
            balance: eitherConverter(leaderboardValue.TokenHolderQuantity, "wei").ether,
            address: leaderboardValue.TokenHolderAddress,
          };
          leaderboardWallets.push(temp); // leaderboard
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    stakingWallets = onlyInLeft(stakingHoldersList, leaderboardHoldersList).filter((obj) => obj && obj);
    matchedWallets = inBoth(leaderboardHoldersList, stakingHoldersList).filter((obj) => obj && obj);

    return [...stakingWallets, ...leaderboardWallets, ...matchedWallets];
  };

  const TruncateWithoutRounding = (value, decimals) => {
    const parts = value.toString().split(".");

    if (parts.length === 2) {
      return Number([parts[0], parts[1].slice(0, decimals)].join("."));
    }
    return Number(parts[0]);
  };

  const calculateLevelUpAmount = (nextHighestRankIndexBalance, currentIndexBalance) => {
    const result = nextHighestRankIndexBalance - currentIndexBalance + 1;
    return result;
  };

  const levelUpFormatter = (params) => (
    <div data-label="Get Token">
      <a href={params.levelUpUrl} target="_blank" rel="noreferrer" type="btn" className="f-btn f-btn-primary text-decoration-none">
        LEVEL UP
      </a>
    </div>
  );

  const csvHeaders = [
    { label: "Rank", key: "rank" },
    { label: "Wallet Address", key: "address" },
    { label: "Email", key: "email" },
    { label: "Balance", key: "formattedBalance" },
    { label: "Level Up Amount", key: "formattedLevelUpAmount" },
    { label: "Get Token", key: "levelUpUrl" },
  ];

  const onQueryChange = (e) => {
    setIsQueryChange(true);
    if (e.target.value) {
      setQuery(e.target.value);
    } else {
      setQuery("");
    }
  };

  const getUsersAndMapData = async () => {
    try {
      let res = await getAllRoleBasedUsers("communityMember", true, 0, 10, false, token);
      let userList = res.data.body.users;
      filteredTokenHolderList.forEach((holder) => {
        userList.forEach((user) => {
          if (user.addresses.find((x) => x.address === holder.address)) {
            holder.email = user.email;
          }
        });
      });
      setShowExportModal(false);
      setTimeout(() => {
        exportRef?.current?.link?.click();
      }, 3000);
    } catch (e) {
      getErrorMessage(e, activeTranslation);
    }
  };

  const onExportClick = () => {
    setShowExportModal(true);
    getUsersAndMapData();
  };

  const columns = [
    {
      prop: "rank",
      title: "Rank",
      cell: (params) => <div data-label="Rank">{params.rank}</div>,
    },
    {
      prop: "formattedAddress",
      title: "Wallet Address",
      cell: (params) => <div data-label="Wallet Address">{params.formattedAddress}</div>,
    },
    {
      prop: "formattedBalance",
      title: "Balance",
      cell: (params) => <div data-label="Balance">{params.formattedBalance}</div>,
    },
    {
      prop: "formattedLevelUpAmount",
      title: "Level Up Amount",
      cell: (params) => <div data-label="Level Up Amount">{params.formattedLevelUpAmount}</div>,
    },
    {
      prop: "levelUpUrl",
      title: "Get Token",
      cell: levelUpFormatter,
    },
  ];

  return (
    <>
      <Toaster />
      <CSVLink
        data={filteredTokenHolderList}
        headers={csvHeaders}
        filename={`${leaderboardData?.name}-${moment(new Date()).format("DD-MMM-YYYY")}.csv`}
        ref={exportRef}
        style={{ display: "none" }}
      />
      <FContainer type="fluid">
        <FContainer>
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[6, 12, 12]} alignX="start" alignY={"end"}>
              <h1>{leaderboardData?.name || "Leaderboard"}</h1>
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6, 12, 12]}>
              <FInputText
                label="Search Wallet"
                placeholder="0x000...0000"
                variant="outlined"
                value={query}
                type="search"
                className={"f-mt-1"}
                onChange={onQueryChange}
                style={{ width: "100%" }}
              />
              {!isPublicUser && <FButton type="button" className="btn-create f-ml-1" disabled={isLoading} onClick={onExportClick} title={" Export to CSV"}></FButton>}
            </FGridItem>
          </FGrid>
          {filteredTokenHolderList.length ? (
            <FTable>
              <Datatable
                tableHeaders={columns}
                tableBody={filteredTokenHolderList}
                rowsPerPage={10}
                tableClass="striped hover responsive"
                initialSort={{ prop: "rank", isAscending: true }}
              />
            </FTable>
          ) : isLoading ? (
            <FContainer type="fluid">
              <FContainer>Loading...</FContainer>
            </FContainer>
          ) : (
            <FContainer type="fluid">
              <FContainer>No Data found</FContainer>
            </FContainer>
          )}
        </FContainer>
      </FContainer>
      <FDialog show={showExportModal} size={"medium"} onHide={() => setShowExportModal(false)} title={"Export"} className="connect-wallet-dialog ">
        <FItem className={"f-mt-2 f-mb-2"}>Loading Export Data</FItem>
        Please wait ...
      </FDialog>
    </>
  );
};

export default LeaderboardInformation;
