/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  FTable,
  FContainer,
  FButton,
  FGrid,
  FInputTextField,
  FGridItem,
} from "ferrum-design-system";
import Datatable from "react-bs-datatable";
import { useParams, useLocation } from "react-router-dom";
import eitherConverter from "ether-converter";
import { CSVLink } from "react-csv";
import moment from "moment";
import {
  getLeaderboardById,
  getLeaderboardByIdForPublicUser,
  getCovalenthqResponse,
  getTokenHolderListByContractAddressAndChainID,
  getStakingBalanceByCABN,
} from "../../_apis/LeaderboardCrud";
import { arraySortByKeyDescending } from "../../utils/global.utils";
import { stakingContractAddressListFOMO } from "../../utils/const.utils";
import { filterList } from "./LeaderboardHelper";

const LeaderboardInformation = () => {
  const { id } = useParams();
  const exportRef = useRef();
  const { pathname } = useLocation();
  const isPublicUser = pathname.includes("/pub");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryChange, setIsQueryChange] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [tokenHolderList, setTokenHolderList] = useState([]);
  const [filteredTokenHolderList, setFilteredTokenHolderList] = useState([]);
  const [LeaderboardTokenHolderList, setLeaderboardTokenHolderList] = useState(
    []
  );
  const [stakingTokenHolderList, setStakingTokenHolderList] = useState([]);
  const [stakingCount, setStakingCount] = useState(0);

  let finalstakingList = [];

  useEffect(() => {
    setIsLoading(true);
    if (isPublicUser) {
      getPublicLeaderboard();
      return;
    }
    getLeaderboard();
  }, []);

  useEffect(() => {
    if (isQueryChange) {
      if (tokenHolderList) {
        const tempData = tokenHolderList.map(
          (x) => x.address.toLowerCase().includes(query.toLowerCase()) && x
        );
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
          const cabn1 =
            res?.data?.body?.leaderboard
              ?.leaderboardCurrencyAddressesByNetwork[0];
          const tempObj = {
            name: leaderboard?.name,
            exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
            cabn: {
              tokenContractAddress:
                cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
              dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
              chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
            },
          };
          getCovalenthqLimit(tempObj);
          setLeaderboardData(tempObj);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getLeaderboard = () => {
    getLeaderboardById(id)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          const cabn1 =
            res?.data?.body?.leaderboard
              ?.leaderboardCurrencyAddressesByNetwork[0];
          const tempObj = {
            name: leaderboard?.name,
            exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
            cabn: {
              tokenContractAddress:
                cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
              dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
              chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
            },
          };
          getCovalenthqLimit(tempObj);
          setLeaderboardData(tempObj);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getCovalenthqLimit = (leaderboard) => {
    getCovalenthqResponse(
      leaderboard?.cabn?.chainId,
      leaderboard?.cabn?.tokenContractAddress
    )
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.data &&
          res.data.data.pagination &&
          res.data.data.pagination.total_count >= 0
        ) {
          const limit = res.data.data.pagination.total_count + 100;
          getTokenHolderlist(leaderboard, limit);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getTokenHolderlist = (leaderboard, limit) => {
    getTokenHolderListByContractAddressAndChainID(
      leaderboard?.cabn?.chainId,
      leaderboard?.cabn?.tokenContractAddress,
      limit
    )
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.data &&
          res.data.data.items &&
          res.data.data.items.length > 0
        ) {
          const filteredList = filterList(
            res?.data?.data?.items,
            leaderboard?.exclusionWalletAddressList
          );
          res.data.data.items = filteredList;
          const { items } = res.data.data;
          setLeaderboardTokenHolderList(items);
          let count = 0;
          getDynamicStakingBalances(leaderboard, items, count);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(e?.response?.data?.error_message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getDynamicStakingBalances = (
    leaderboard,
    leaderboardHoldersList,
    count
  ) => {
    if (count < stakingContractAddressListFOMO.length) {
      getStakingBalanceLimit(
        leaderboard,
        stakingContractAddressListFOMO[count],
        count,
        leaderboardHoldersList
      );
    } else {
      getUniqueStakingAddressListAndMapData(
        leaderboardHoldersList,
        leaderboard
      );
    }
  };

  const getUniqueStakingAddressListAndMapData = (
    LeaderboardTokenHolderList,
    leaderboardData
  ) => {
    const uniqueStakingList = [];
    finalstakingList.forEach((i) => {
      const id = i.from_address;
      i.points = Number(eitherConverter(i.transfers[0].delta, "wei").ether);
      i.transfers[0].delta = Number(
        eitherConverter(i.transfers[0].delta, "wei").ether
      );

      if (!uniqueStakingList[id]) {
        return (uniqueStakingList[id] = i);
      }
      return (uniqueStakingList[id].transfers[0].delta += i.points);
    });

    const stakingMergedList = [];
    Object.keys(uniqueStakingList).forEach((key) => {
      stakingMergedList.push(uniqueStakingList[key]);
    });
    mapTokenHolderData(
      LeaderboardTokenHolderList,
      stakingMergedList,
      leaderboardData
    );
  };

  const getStakingBalanceLimit = (
    leaderboard,
    stakingContractaddress,
    count,
    leaderboardHoldersList
  ) => {
    getStakingBalanceByCABN(
      leaderboard?.cabn?.chainId,
      leaderboard?.cabn?.tokenContractAddress,
      stakingContractaddress
    )
      .then((res) => {
        if (
          res &&
          res.data &&
          res.data.data &&
          res.data.data.pagination &&
          res.data.data.pagination.total_count >= 0
        ) {
          const limit = res.data.data.pagination.total_count + 100;
          getStakingBalanceByCurrencyAddressByNetwork(
            leaderboard,
            stakingContractaddress,
            count,
            leaderboardHoldersList,
            limit
          );
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(e?.response?.data?.error_message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getStakingBalanceByCurrencyAddressByNetwork = (
    leaderboard,
    stakingContractaddress,
    count,
    leaderboardHoldersList,
    limit
  ) => {
    getStakingBalanceByCABN(
      leaderboard?.cabn?.chainId,
      leaderboard?.cabn?.tokenContractAddress,
      stakingContractaddress,
      limit
    )
      .then((res) => {
        if (res && res.data && res.data.data && res.data.data.items) {
          if (res.data.data.items.length > 0) {
            const { items } = res.data.data;
            finalstakingList = [...finalstakingList, ...items];
            count = count + 1;
            getDynamicStakingBalances(
              leaderboard,
              leaderboardHoldersList,
              count
            );
          } else {
            count = count + 1;
            getDynamicStakingBalances(
              leaderboard,
              leaderboardHoldersList,
              count
            );
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(e?.response?.data?.error_message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const mapTokenHolderData = (
    leaderboardHoldersList,
    stakingHoldersList,
    leaderboard
  ) => {
    const mergedList = filterList(
      mapHoldersBalances(leaderboardHoldersList, stakingHoldersList),
      leaderboard.exclusionWalletAddressList
    );
    const list = arraySortByKeyDescending(mergedList, "balance");

    const levelUpSwapUrl = `${leaderboard?.cabn?.dexUrl}swap?inputCurrency=BNB&outputCurrency=${leaderboard?.cabn?.tokenContractAddress}&exactField=output&exactAmount=`;
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].address) {
        list[i].rank = i + 1;

        list[i].formattedAddress = `${list[i].address.substr(0, 6)}...${list[
          i
        ].address.substr(list[i].address.length - 4)}`;

        list[i].formattedBalance = TruncateWithoutRounding(
          list[i].balance,
          2
        ).toLocaleString("en-US");

        if (i === 0) {
          list[i].formattedLevelUpAmount = "You are the leader";
          list[i].levelUpUrl = levelUpSwapUrl;
        } else {
          list[i].formattedLevelUpAmount = TruncateWithoutRounding(
            calculateLevelUpAmount(list[i - 1].balance, list[i].balance),
            2
          ).toLocaleString("en-US");
          list[i].levelUpUrl = levelUpSwapUrl + list[i].formattedLevelUpAmount;
        }
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
        const sameEntry = leaderboardList.filter(
          (leaderboardValue) =>
            stakingValue.from_address === leaderboardValue.address
        )[0];
        let tempObj = {};
        const initialSum = 0;
        if (!sameEntry || undefined) {
          // const sum = stakingValue.transfers.reduce(
          //   (previousValue, currentValue) => previousValue + Number(eitherConverter(currentValue.delta, 'wei').ether),
          //   initialSum
          // );
          tempObj = {
            address: stakingValue.from_address,
            balance: stakingValue.transfers[0].delta,
            status: "staking",
          };
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    const inBoth = (leaderboardList, stakingList) =>
      leaderboardList.map((leaderboardValue) => {
        const sameEntry = stakingList.filter(
          (stakingValue) =>
            leaderboardValue.address === stakingValue.from_address
        )[0];
        let tempObj = {};
        const initialSum = 0;
        if (sameEntry) {
          // const sum = sameEntry.transfers.reduce(
          //   (previousValue, currentValue) => previousValue + Number(eitherConverter(currentValue.delta, 'wei').ether),
          //   initialSum
          // );
          const combinedSum =
            sameEntry.transfers[0].delta +
            Number(eitherConverter(leaderboardValue.balance, "wei").ether); // of both list
          tempObj = {
            address: sameEntry.from_address,
            balance: combinedSum,
            status: "Matched",
          }; // both
        } else {
          let temp = {};
          temp = {
            status: "leaderboard",
            balance: eitherConverter(leaderboardValue.balance, "wei").ether,
            address: leaderboardValue.address,
          };
          leaderboardWallets.push(temp); // leaderboard
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    stakingWallets = onlyInLeft(
      stakingHoldersList,
      leaderboardHoldersList
    ).filter((obj) => obj && obj);
    matchedWallets = inBoth(leaderboardHoldersList, stakingHoldersList).filter(
      (obj) => obj && obj
    );

    return [...stakingWallets, ...leaderboardWallets, ...matchedWallets];
  };

  const TruncateWithoutRounding = (value, decimals) => {
    const parts = value.toString().split(".");

    if (parts.length === 2) {
      return Number([parts[0], parts[1].slice(0, decimals)].join("."));
    }
    return Number(parts[0]);
  };

  const calculateLevelUpAmount = (
    nextHighestRankIndexBalance,
    currentIndexBalance
  ) => {
    const result = nextHighestRankIndexBalance - currentIndexBalance + 1;
    return result;
  };

  const levelUpFormatter = (params) => (
    <a
      href={params.levelUpUrl}
      target="_blank"
      rel="noreferrer"
      type="btn"
      className="f-btn f-btn-primary text-decoration-none"
    >
      LEVEL UP
    </a>
  );

  const csvHeaders = [
    { label: "Rank", key: "rank" },
    { label: "Wallet Address", key: "address" },
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

  const onExportClick = () => {
    setTimeout(() => {
      exportRef?.current?.link?.click();
    }, 3000);
  };

  const columns = [
    {
      prop: "rank",
      title: "Rank",
    },
    {
      prop: "formattedAddress",
      title: "Wallet Address",
    },
    {
      prop: "formattedBalance",
      title: "Balance",
    },
    {
      prop: "formattedLevelUpAmount",
      title: "Level Up Amount",
    },
    {
      prop: "levelUpUrl",
      title: "Get Token",
      cell: levelUpFormatter,
    },
  ];

  return (
    <>
      <div>
        <Toaster />
      </div>
      <CSVLink
        data={filteredTokenHolderList}
        headers={csvHeaders}
        filename={`${leaderboardData?.name}-${moment(new Date()).format(
          "DD-MMM-YYYY"
        )}.csv`}
        ref={exportRef}
        style={{ display: "none" }}
      />
      <FContainer type="fluid">
        <FContainer>
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[6,12,12]} alignX={"center"}>
              <h1>{leaderboardData?.name || "Leaderboard"}</h1>
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6,12,12]} >
              <FInputTextField
                label="Search Wallet"
                placeholder="0x000...0000"
                variant="outlined"
                value={query}
                type="search"
                onChange={onQueryChange}
                style={{ width: "100%" }}
              />
              {!isPublicUser && (
                <FButton
                  type="button"
                  className="btn-create"
                  className={"f-ml-1"}
                  disabled={isLoading}
                  onClick={onExportClick}
                  title={" Export hto CSV"}
                ></FButton>
              )}
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
    </>
  );
};

export default LeaderboardInformation;
