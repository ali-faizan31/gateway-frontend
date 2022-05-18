/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FTable, FContainer, FButton, FGrid, FInputText, FGridItem } from "ferrum-design-system";
import Datatable from "react-bs-datatable";
import { useParams, useLocation } from "react-router-dom";
import eitherConverter from "ether-converter";
import { CSVLink } from "react-csv";
import moment from "moment";
import { useSelector } from "react-redux";
import { getLeaderboardById, getLeaderboardByIdForPublicUser, getTokenHolderlistByCABNId } from "../../_apis/LeaderboardCrud";
import { arraySortByKeyDescending, getErrorMessage, getFormattedWalletAddress } from "../../utils/global.utils";
import { PUBLIC_TAG, TOKEN_TAG } from "../../utils/const.utils";
import { filterList } from "./LeaderboardHelper";
import { useSelector } from "react-redux";

const LeaderboardInformation = () => {
  const { id } = useParams();
  const exportRef = useRef();
  const { pathname } = useLocation();
  let token = localStorage.getItem(TOKEN_TAG);
  const isPublicUser = pathname.includes(PUBLIC_TAG);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryChange, setIsQueryChange] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [tokenHolderList, setTokenHolderList] = useState([]);
  const [filteredTokenHolderList, setFilteredTokenHolderList] = useState([]);
  const { activeTranslation } = useSelector((state) => state.phrase);

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
        const tempData = tokenHolderList.map((x) => x.tokenHolderAddress.toLowerCase().includes(query.toLowerCase()) && x);
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
          if (cabn1 && cabn1.currencyAddressesByNetwork && cabn1.currencyAddressesByNetwork.tokenContractAddress && cabn1.currencyAddressesByNetwork.networkDex.dex.url) {
            const tempObj = {
              name: leaderboard?.name,
              exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
              cabn: {
                tokenContractAddress: cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
                dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
                chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
                id: cabn1?.currencyAddressesByNetwork?._id,
              },
            };
            getTokenHolderlist(tempObj);
            setLeaderboardData(tempObj);
          } else {
            setIsLoading(false);
            toast.error(`Error occured: Leaderboard Information is not correct`);
          }
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
          if (cabn1 && cabn1.currencyAddressesByNetwork && cabn1.currencyAddressesByNetwork.tokenContractAddress && cabn1.currencyAddressesByNetwork.networkDex.dex.url) {
            const tempObj = {
              name: leaderboard?.name,
              exclusionWalletAddressList: leaderboard?.exclusionWalletAddressList,
              cabn: {
                tokenContractAddress: cabn1?.currencyAddressesByNetwork?.tokenContractAddress,
                dexUrl: cabn1?.currencyAddressesByNetwork?.networkDex?.dex?.url,
                chainId: cabn1?.currencyAddressesByNetwork?.network?.chainId,
                id: cabn1?.currencyAddressesByNetwork?._id,
              },
            };
            getTokenHolderlist(tempObj);
            setLeaderboardData(tempObj);
          } else {
            setIsLoading(false);
            toast.error(`Error occured: Leaderboard Information is not correct`);
          }
        }
      })
      .catch((e) => {
        setIsLoading(false);
        getErrorMessage(e, activeTranslation);
      });
  };

  const getTokenHolderlist = (leaderboard) => {
    getTokenHolderlistByCABNId(leaderboard.cabn.id)
      .then((res) => {
        const filteredList = filterList(res.data.body.result, leaderboard?.exclusionWalletAddressList);
        mapTokenHolderData(filteredList, leaderboard);
      })
      .catch((e) => {
        getErrorMessage(e, activeTranslation);
      });
  };

  const mapTokenHolderData = (leaderboardHoldersList, leaderboard) => {
    let mergedList = getFormattedBalanceHoldersList(leaderboardHoldersList);

    const list = arraySortByKeyDescending(mergedList, "balance");

    const levelUpSwapUrl = `${leaderboard?.cabn?.dexUrl}swap?inputCurrency=BNB&outputCurrency=${leaderboard?.cabn?.tokenContractAddress}&exactField=output&exactAmount=`;
    for (let i = 0; i < list.length; i += 1) {
      if (list[i].tokenHolderAddress) {
        list[i].rank = i + 1;
        list[i].formattedAddress = getFormattedWalletAddress(list[i].tokenHolderAddress);

        list[i].formattedBalance = TruncateWithoutRounding(list[i].balance, 2).toLocaleString("en-US");

        if (i === 0) {
          list[i].formattedLevelUpAmount = "You are the leader";
          list[i].levelUpUrl = levelUpSwapUrl;
        } else {
          list[i].formattedLevelUpAmount = TruncateWithoutRounding(calculateLevelUpAmount(list[i - 1].balance, list[i].balance), 2).toLocaleString("en-US");
          list[i].levelUpUrl = levelUpSwapUrl + list[i].formattedLevelUpAmount;
        }
      }
    }

    setIsLoading(false);
    setTokenHolderList(list);
    setFilteredTokenHolderList(list);
  };

  const getFormattedBalanceHoldersList = (list) => {
    list.forEach((holder) => {
      holder.balance = Number(eitherConverter(holder.tokenHolderQuantity, "wei").ether);
    });
    return list;
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
    { label: "Wallet Address", key: "tokenHolderAddress" },
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
              <FInputText label="Search Wallet" placeholder="0x000...0000" variant="outlined" value={query} type="search" onChange={onQueryChange} style={{ width: "100%" }} />
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
    </>
  );
};

export default LeaderboardInformation;
