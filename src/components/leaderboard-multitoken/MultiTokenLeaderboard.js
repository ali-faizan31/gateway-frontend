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
import { useLocation } from "react-router-dom";
import eitherConverter from "ether-converter";
import { CSVLink } from "react-csv";
import moment from "moment";
import {
  getCovalenthqResponse,
  getTokenHolderListByContractAddressAndChainID,
} from "../../_apis/LeaderboardCrud";
import { filterList } from "../leaderboard/LeaderboardHelper";
import {
  tokenFRMxBSCMainnet,
  tokenFRMBSCMainnet,
} from "../../utils/const.utils";
import { arraySortByKeyDescending } from "../../utils/global.utils";

const MultiTokenLeaderboardInformation = ({
  frmUsdcValue,
  frmxUsdcValue,
  leaderboardData,
}) => {
  const exportRef = useRef();
  const { pathname } = useLocation();
  const isPublicUser = pathname.includes("/pub");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryChange, setIsQueryChange] = useState(false);
  const [tokenHolderList, setTokenHolderList] = useState([]);
  const [filteredTokenHolderList, setFilteredTokenHolderList] = useState([]);

  useEffect(() => {
    if (
      leaderboardData &&
      leaderboardData.frmCabn &&
      leaderboardData.frmCabn.chainId !== undefined
    ) {
      setIsLoading(true);
      getCovalenthqLimit(leaderboardData);
    }
  }, [leaderboardData]);

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

  const getCovalenthqLimit = (leaderboard) => {
    getCovalenthqResponse(
      leaderboard?.frmCabn?.chainId,
      leaderboard?.frmCabn?.tokenContractAddress
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
          getFRMTokenHolderlist(leaderboard, limit);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(`${e?.response?.data?.error_message} Page Limit Check`);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getFRMTokenHolderlist = (leaderboard, limit) => {
    getTokenHolderListByContractAddressAndChainID(
      leaderboard?.frmCabn?.chainId,
      leaderboard?.frmCabn?.tokenContractAddress,
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
          getFRMxTokenHolderlist(leaderboard, limit, items);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(`${e.response.data.error_message} FRM list`);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const getFRMxTokenHolderlist = (leaderboard, limit, frmTokenHolderList) => {
    getTokenHolderListByContractAddressAndChainID(
      leaderboard?.frmxCabn?.chainId,
      leaderboard?.frmxCabn?.tokenContractAddress,
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
          mapTokenHolderData(items, frmTokenHolderList, leaderboard);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(`${e.response.data.error_message} FRMx list`);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const mapTokenHolderData = (
    frmxTokenHolderList,
    frmTokenHolderList,
    leaderboard
  ) => {
    let list = mergeTwoArrays(frmTokenHolderList, frmxTokenHolderList);
    list = arraySortByKeyDescending(list, "combinedValue");
    const frmLevelUpSwapUrl = `${leaderboard?.frmCabn?.dexUrl}swap?inputCurrency=BNB&outputCurrency=${leaderboard?.frmCabn?.tokenContractAddress}&exactField=output&exactAmount=`;
    const frmxLevelUpSwapUrl = `${leaderboard?.frmxCabn?.dexUrl}swap?inputCurrency=BNB&outputCurrency=${leaderboard?.frmxCabn?.tokenContractAddress}&exactField=output&exactAmount=`;

    for (let i = 0; i < list.length; i += 1) {
      if (list[i].address) {
        list[i].rank = i + 1;
        list[i].formattedAddress = `${list[i].address.substr(0, 6)}...${list[
          i
        ].address.substr(list[i].address.length - 4)}`;
        list[i].formattedCombinedValue = `$ ${TruncateWithoutRounding(
          list[i].combinedValue,
          2
        )}`;
        if (list[i].frmBalance) {
          list[i].formattedFRMBalance = TruncateWithoutRounding(
            list[i].frmBalance,
            2
          ).toLocaleString("en-US");
        }
        if (list[i].frmxBalance) {
          list[i].formattedFRMxBalance = TruncateWithoutRounding(
            list[i].frmxBalance,
            2
          ).toLocaleString("en-US");
        }
        if (i === 0) {
          list[i].formattedLevelUpAmount = "You are the leader";
          list[i].levelUpFRMUrl = frmLevelUpSwapUrl + "0";
          list[i].levelUpFRMxUrl = frmxLevelUpSwapUrl + "0";
        } else {
          list[i].combinedDiff = calculateLevelUpAmount(
            list[i - 1].combinedValue,
            list[i].combinedValue
          );
          if (list[i].frmBalance) {
            list[i].frmLevelUp = forceRounding(
              list[i].combinedDiff / frmUsdcValue,
              2
            );
            list[i].levelUpFRMUrl = frmLevelUpSwapUrl + list[i].frmLevelUp;
            list[i].formattedLevelUpAmount = `${list[i].frmLevelUp} FRM`;
          }
          if (list[i].frmxBalance) {
            list[i].frmxLevelUp = forceRounding(
              list[i].combinedDiff / frmxUsdcValue,
              2
            );
            list[i].levelUpFRMxUrl = frmxLevelUpSwapUrl + list[i].frmxLevelUp;
            list[i].formattedLevelUpAmount = `${list[i].frmxLevelUp} FRM`;
          }
          if (list[i].frmxBalance && list[i].frmBalance) {
            list[
              i
            ].formattedLevelUpAmount = `${list[i].frmLevelUp} FRM or ${list[i].frmxLevelUp} FRMx`;
          }
        }
      }
    }
    setIsLoading(false);
    setTokenHolderList(list);
    setFilteredTokenHolderList(list);
  };

  const mergeTwoArrays = (frmList, frmxList) => {
    const frmWallets = [];
    let frmxWallets = [];
    let matchedWallets = [];

    const onlyInLeft = (frmxList, frmList) =>
      frmxList.map((frmx) => {
        const sameEntry = frmList.filter(
          (frm) => frmx.address === frm.address
        )[0];
        let tempObj = {};
        if (!sameEntry || undefined) {
          const etherBalance = eitherConverter(frmx?.balance, "wei").ether;
          const combinedValue = etherBalance * frmxUsdcValue;
          tempObj = {
            address: frmx?.address,
            frmxBalance: etherBalance,
            frmBalance: "0",
            combinedValue,
            status: "frmx",
          };
        }
        return Object.keys(tempObj).length > 0 && tempObj; // frmx
      });

    const inBoth = (frmList, frmxList) =>
      frmList.map((frm) => {
        const sameEntry = frmxList.filter(
          (frmx) => frm.address === frmx.address
        )[0];
        let tempObj = {};
        if (sameEntry) {
          const frmEtherBalance = eitherConverter(frm?.balance, "wei").ether;
          const frmxEtherBalance = eitherConverter(
            sameEntry?.balance,
            "wei"
          ).ether;
          const combinedValue =
            frmEtherBalance * frmUsdcValue + frmxEtherBalance * frmxUsdcValue;
          tempObj = {
            address: frm?.address,
            frmBalance: frmEtherBalance,
            frmxBalance: frmxEtherBalance,
            combinedValue,
            status: "Matched",
          }; // both
        } else {
          let temp = {};
          const etherBalance = eitherConverter(frm?.balance, "wei").ether;
          const combinedValue = etherBalance * frmUsdcValue;
          temp = {
            address: frm?.address,
            frmBalance: etherBalance,
            frmxBalance: "0",
            combinedValue,
            status: "frm",
          };
          frmWallets.push(temp); // frm
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    frmxWallets = onlyInLeft(frmxList, frmList).filter((obj) => obj && obj);
    matchedWallets = inBoth(frmList, frmxList).filter((obj) => obj && obj);

    return [...frmxWallets, ...frmWallets, ...matchedWallets];
  };

  const TruncateWithoutRounding = (value, decimals) => {
    value = changeExponentToPoints(value);
    const parts = value.toString().split(".");

    if (parts.length === 2) {
      return Number([parts[0], parts[1].slice(0, decimals)].join("."));
    }
    return Number(parts[0]);
  };

  function changeExponentToPoints(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  }

  const forceRounding = (value, decimals) => {
    const parts = value.toString().split(".");
    if (parts[1]) {
      parts[1] = Number(parts[1].slice(0, decimals)) + 1;
    }
    if (parts.length === 2) {
      return Number([parts[0], parts[1]].join("."));
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

  const levelUpFRMFormatter = (params) => (
    <div data-label="Get FRM">
      <a
        href={params?.levelUpFRMUrl}
        target="_blank"
        rel="noreferrer"
        disabled={!params.levelUpFRMUrl}
        type="btn"
        className="f-btn f-btn-primary text-decoration-none"
      >
        LEVEL UP
      </a>
    </div>
  );

  const levelUpFRMxFormatter = (params) => (
    <div data-label="Get FRMx">
      <a
        href={params.levelUpFRMxUrl}
        target="_blank"
        rel="noreferrer"
        disabled={!params.levelUpFRMxUrl}
        type="btn"
        className="f-btn f-btn-primary text-decoration-none"
      >
        LEVEL UP
      </a>
    </div>
  );

  const columns = [
    {
      prop: "rank",
      title: "Rank by USD",
      cell: (params) => <div data-label="Rank">{params.rank}</div>,
    },
    {
      prop: "formattedAddress",
      title: "Wallet Address",
      cell: (params) => <div data-label="Wallet Address">{params.formattedAddress}</div>,
    },
    {
      prop: "formattedCombinedValue",
      title: "Combined USD Value",
      cell: (params) => <div data-label="Combined USD Value">{params.formattedCombinedValue}</div>,
    },
    {
      prop: "formattedFRMBalance",
      title: "FRM Balance",
      cell: (params) => <div data-label="FRM Balance">{params.formattedFRMBalance}</div>,
    },
    {
      prop: "formattedFRMxBalance",
      title: "FRMx Balance",
      cell: (params) => <div data-label="FRMx Balance">{params.formattedFRMxBalance}</div>,
    },
    {
      prop: "formattedLevelUpAmount",
      title: "Level Up Amount",
      cell: (params) => <div data-label="Level Up Amount">{params.formattedLevelUpAmount}</div>,
    },
    {
      prop: "levelUpFRMUrl",
      title: "Get FRM",
      cell: levelUpFRMFormatter,
    },
    {
      prop: "levelUpFRMxUrl",
      title: "Get FRMx",
      cell: levelUpFRMxFormatter,
    },
  ];

  const csvHeaders = [
    { label: "Rank", key: "rank" },
    { label: "Wallet Address", key: "address" },
    { label: "Combined USD Value", key: "formattedCombinedValue" },
    { label: "FRM Balance", key: "formattedFRMBalance" },
    { label: "FRMx Balance", key: "formattedFRMxBalance" },
    { label: "Level Up Amount", key: "formattedLevelUpAmount" }
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
            <FGridItem size={[6, 12, 12]} alignX="center">
              <h1>{leaderboardData?.name  || "Leaderboard"}</h1>
            </FGridItem>
            <FGridItem
              alignX="end"
              alignY={"end"}
              dir={"row"}
              size={[6, 12, 12]}
            >
              <FInputTextField
                label="Search Wallet"
                placeholder="0x000...0000"
                variant="outlined"
                value={query}
                className="f-mt-1"
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
                  title={" Export to CSV"}
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

export default MultiTokenLeaderboardInformation;
