import React, { useEffect, useState, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FTable, FContainer, FButton, FGrid, FInputText, FGridItem, FDialog, FItem, FTypo, FTooltip } from "ferrum-design-system";
import Datatable from "react-bs-datatable";
import { useParams, useLocation } from "react-router-dom";
import { CSVLink } from "react-csv";
import moment from "moment";
import eitherConverter from "ether-converter";
import { getCompetitionById, getCompetitionByIdForPublicUser, getCompetitionsParticipantsRanks } from "../../_apis/CompetitionCrud";
import { useSelector } from "react-redux";
import { getErrorMessage } from "../../utils/global.utils";

import {
  cFRMTokenContractAddress,
  cFRMxTokenContractAddress,
  tokenFRMxBSCMainnet,
  tokenFRMBSCMainnet,
  TOKEN_TAG,
  Start_Competition_Buy_Button_Link,
  PUBLIC_TAG,
} from "../../utils/const.utils";
import { getAllRoleBasedUsers } from "../../_apis/UserCrud";

const CompetitionInformation = () => {
  const { id } = useParams();
  const exportRef = useRef();
  let token = localStorage.getItem(TOKEN_TAG);
  const { pathname } = useLocation();
  const isPublicUser = pathname.includes(PUBLIC_TAG);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryChange, setIsQueryChange] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [competitionData, setCompetitionData] = useState({});
  const [competitionParticipants, setCompetitionParticipants] = useState([]);
  const [competitionParticipantsFiltered, setCompetitionParticipantsFiltered] = useState([]);
  const [showWallets, setShowWallets] = useState(false);
  const { activeTranslation } = useSelector((state) => state.phrase);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    if (isPublicUser) {
      getPublicCompetition();
      return;
    }
    getCompetition();
  }, [id]);

  useEffect(() => {
    if (leaderboardData && Object.keys(leaderboardData).length) {
      getCompetitionParticipants();
    }
  }, [leaderboardData]);

  useEffect(() => {
    if (isQueryChange) {
      if (competitionParticipants.length) {
        const tempData = competitionParticipants.filter((x) => x.tokenHolderAddress.toLowerCase().includes(query.toLowerCase()));
        setCompetitionParticipantsFiltered(tempData);
        setIsQueryChange(false);
      }
    }
  }, [query]);

  const getInputCurrency = (tokenContractAddress) => {
    if (tokenContractAddress.toLowerCase() === cFRMTokenContractAddress.toLowerCase()) {
      return tokenFRMBSCMainnet;
    } else if (tokenContractAddress.toLowerCase() === cFRMxTokenContractAddress.toLowerCase()) {
      return tokenFRMxBSCMainnet;
    } else {
      return "BNB";
    }
  };

  const getCompetitionParticipants = () => {
    const leaderboardDexUrl = leaderboardData?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.networkDex?.dex?.url;
    const tokenContractAddress = leaderboardData?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.tokenContractAddress;
    getCompetitionsParticipantsRanks(id, false, 0, 10)
      .then((res) => {
        if (res?.data?.body?.participants) {
          const formattedRes = res?.data?.body?.participants?.map((p) => {
            if (p.rank) {
              let color = "";
              if (p?.tokenHolderQuantity === "") {
                color = "yellow";
              }
              if (Number(p?.humanReadableGrowth) >= 0 && p?.tokenHolderQuantity !== "") {
                color = "green";
              } else if (Number(p?.humanReadableGrowth) < 0 && p?.tokenHolderQuantity !== "") {
                color = "red";
              }
              return {
                ...p,
                humanReadableGrowth: {
                  data: p?.humanReadableGrowth,
                  color,
                },
                address: p.tokenHolderAddress,
                tokenHolderQuantity: p?.tokenHolderQuantity ? TruncateWithoutRounding(eitherConverter(p?.tokenHolderQuantity, "wei").ether, 2)?.toLocaleString("en-US") : 0,
                levelUpUrl: `${leaderboardDexUrl}swap?inputCurrency=${getInputCurrency(
                  tokenContractAddress
                )}&outputCurrency=${tokenContractAddress}&exactField=output&exactAmount=${TruncateWithoutRounding(p?.levelUpAmount, 2)}`,
                formattedLevelUpAmount: p?.levelUpAmount ? TruncateWithoutRounding(p?.levelUpAmount, 2) : 0,
              };
            }
          });
          setCompetitionParticipants(formattedRes.filter((x) => x && x));
          setCompetitionParticipantsFiltered(formattedRes.filter((x) => x && x));
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        getErrorMessage(e, activeTranslation);
      });
  };

  const getCompetition = () => {
    getCompetitionById(id, token)
      .then((res) => {
        if (res) {
          setCompetitionData(res?.data?.body?.competition);
          setLeaderboardData(res?.data?.body?.competition?.leaderboard);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        getErrorMessage(e, activeTranslation);
      });
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id)
      .then((res) => {
        if (res) {
          setCompetitionData(res?.data?.body?.competition);
          setLeaderboardData(res?.data?.body?.leaderboard);
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        getErrorMessage(e, activeTranslation);
      });
  };

  const TruncateWithoutRounding = (value, decimals) => {
    if (value) {
      const parts = value.toString().split(".");

      if (parts.length === 2) {
        return Number([parts[0], parts[1].slice(0, decimals)].join("."));
      }
      return Number(parts[0]);
    } else {
      return "";
    }
  };

  const levelUpFormatter = (params) => {
    return (
      <div data-label="Get Token">
        <a href={params.levelUpUrl} target="_blank" rel="noreferrer" className="f-btn f-btn-primary text-decoration-none">
          LEVEL UP
        </a>
      </div>
    );
  };

  const levelUpAmount = (params) => {
    return (
      <div data-label="Level Up Amount">
        {params?.levelUpAmount ? TruncateWithoutRounding(params?.levelUpAmount, 2).toLocaleString("en-US") : 0}{" "}
        {leaderboardData?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.currency?.symbol}
      </div>
    );
  };

  const getTitle = () => (
    <>
      Growth / Reduction
      <FTooltip
        className={"f-ml-1"}
        effect={"solid"}
        place={"top"}
        id="TooltipTop"
        textColor={"black"}
        backgroundColor={"#dab46e"}
        text={<img src={"/ferrum/question.svg"} alt="" />}
      >
        <p className="custom-width-360 custom-font-weight-400 word-break">
          We are calculating this value by adding up the amount added by you <b>"Level Up"</b> transactions and subtracting any transfer outs from your wallet and then your ranks
          are calculated based on your <b>"Growth/Reduction"</b>
        </p>
      </FTooltip>
    </>
    // <div className="d-flex">
    //   Growth / Reduction
    //   <div className="f-ml-1 f-mt--1 tooltip">
    //     <img src={"/ferrum/question.svg"} alt="" />
    //     <span class="tooltiptext custom-font-size-10">
    //       We are calculating this value by adding up the amount added by you <b>"Level Up"</b> transactions and subtracting any transfer outs from your wallet and then your ranks
    //       are calculated based on your <b>"Growth/Reduction"</b>
    //     </span>
    //   </div>
    // </div>
  );

  const columns = [
    {
      prop: "rank",
      title: "Rank",
      cell: (params) => <div data-label="Rank">{params?.rank}</div>,
    },
    {
      prop: "tokenHolderAddress",
      title: "Wallet Address",
      cell: (params) => (
        <div data-label="Wallet Address">
          {showWallets ? params?.tokenHolderAddress : `${params?.tokenHolderAddress?.substr(0, 6)}...${params?.tokenHolderAddress?.substr(params?.tokenHolderAddress?.length - 4)}`}
        </div>
      ),
    },
    {
      prop: "tokenHolderQuantity",
      title: "Balance",
      cell: (params) => <div data-label="Balance">{params?.tokenHolderQuantity}</div>,
    },
    {
      prop: "humanReadableGrowth",
      title: getTitle(),
      cell: (params) => (
        <div data-label="Growth / Reduction" className="growth-column-hover" style={{ color: params?.humanReadableGrowth?.color }}>
          <span data-tip="tetsttt">{params?.humanReadableGrowth?.data ? TruncateWithoutRounding(params?.humanReadableGrowth?.data, 2).toLocaleString("en-US") : 0}</span>
        </div>
      ),
    },
    {
      prop: "levelUpAmount",
      title: "Level Up Amount",
      cell: levelUpAmount,
    },
    {
      prop: "levelUpUrl",
      title: "Get Token",
      cell: levelUpFormatter,
    },
  ];

  const showAllWallets = () => {
    setShowWallets(!showWallets);
    const tempData = [...competitionParticipants];
    const tempDataFiltered = [...competitionParticipantsFiltered];
    setCompetitionParticipants([]);
    setCompetitionParticipantsFiltered([]);
    setCompetitionParticipants(tempData);
    setCompetitionParticipantsFiltered(tempDataFiltered);
  };

  const csvHeaders = [
    { label: "Rank", key: "rank" },
    { label: "Wallet Address", key: "tokenHolderAddress" },
    { label: "Email", key: "email" },
    { label: "Balance", key: "tokenHolderQuantity" },
    { label: "Growth / Reduction", key: "humanReadableGrowth.data" },
    { label: "Level Up Amount", key: "formattedLevelUpAmount" },
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
      competitionParticipantsFiltered.forEach((holder) => {
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

  return (
    <>
      <Toaster />
      <CSVLink
        data={competitionParticipantsFiltered}
        headers={csvHeaders}
        filename={`${competitionData?.name}-${moment(new Date()).format("DD-MMM-YYYY")}.csv`}
        ref={exportRef}
        style={{ display: "none" }}
      />
      <FContainer type="fluid">
        <FContainer>
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[4, 4, 4]} alignX="start" alignY={"end"}>
              <h1>{competitionData?.name || "Competition"}</h1>
            </FGridItem>
            <FGridItem size={[2, 2, 2]} alignX="start" alignY="end">
              {!isPublicUser && (
                <FButton
                  type="button"
                  className="btn-create f-ml-1"
                  disabled={isLoading || !competitionParticipants?.length}
                  onClick={showAllWallets}
                  title={`${showWallets ? "Hide" : "Show"} Wallets`}
                />
              )}
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[4, 4, 4]}>
              <FInputText label="Search Wallet" placeholder="0x000...0000" value={query} type="search" onChange={onQueryChange} style={{ width: "100%" }} />

              {!isPublicUser && (
                <FButton type="button" className="btn-create f-ml-1" disabled={isLoading || !competitionParticipants?.length} onClick={onExportClick} title={" Export to CSV"} />
              )}
            </FGridItem>
          </FGrid>
          {competitionParticipants.length ? (
            <FTable>
              <Datatable
                tableHeaders={columns}
                tableBody={competitionParticipantsFiltered}
                rowsPerPage={10}
                tableClass="striped hover responsive"
                initialSort={{
                  prop: "rank",
                  isAscending: true,
                }}
              />
            </FTable>
          ) : isLoading ? (
            <FContainer type="fluid">
              <FContainer>Loading...</FContainer>
            </FContainer>
          ) : (
            <FContainer type="fluid">
              {/* <FContainer>No Data found</FContainer> */}
              <FItem className={"f-mt-3 f-mb-1"} align="center">
                <FTypo size={20} className="f-mb-1">
                  Be the first person to start this competition by clicking on Buy Now Button
                </FTypo>
                <a href={Start_Competition_Buy_Button_Link} target="_blank" rel="noreferrer" className="f-btn f-btn-primary text-decoration-none">
                  Buy Now
                </a>
              </FItem>
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

export default CompetitionInformation;
