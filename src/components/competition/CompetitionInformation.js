import React, { useEffect, useState, useRef } from 'react';
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
import { CSVLink } from 'react-csv';
import moment from 'moment';
import eitherConverter from 'ether-converter';

//  
import {
  getCompetitionById,
  getCompetitionByIdForPublicUser,
  getStartBlockHolders,
  getEndBlockHolders
} from '../../_apis/CompetitionCrud';
import { arraySortByKeyDescending } from '../../utils/global.utils';
import { filterList } from '../leaderboard/LeaderboardHelper';

const CompetitionInformation = () => {
  const { id } = useParams();
  const exportRef = useRef(); 
  let token = localStorage.getItem('token');
  const { pathname } = useLocation();
  const isPublicUser = pathname.includes('/pub');
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQueryChange, setIsQueryChange] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState({});
  const [competitionData, setCompetitionData] = useState({});
  const [startBlockList, setStartBlockList] = useState([]);
  const [endBlockList, setEndBlockList] = useState([]);
  const [tokenHolderList, setTokenHolderList] = useState([]);
  const [filteredTokenHolderList, setFilteredTokenHolderList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (isPublicUser) {
      getPublicCompetition();
      return;
    }
    getCompetition();
  }, []);

  useEffect(() => {
    if (isQueryChange) {
      if (tokenHolderList) {
        const tempData = tokenHolderList.map((x) => x.address.toLowerCase().includes(query.toLowerCase()) && x);
        setFilteredTokenHolderList(tempData.filter((x) => x && x));
        setIsQueryChange(false);
      }
    }
  }, [query]);

  const getCompetition = () => {
    getCompetitionById(id, token)
      .then((res) => { 
        if (res?.data?.body?.competition) { 
          const { leaderboard } = res.data.body.competition; 
          const competition = res.data.body.competition; 
          setCompetitionData(res.data.body.competition);
          setLeaderboardData(leaderboard);
          console.log(leaderboard, res.data.body.competition)
          let data = {
            // tokenContractAddress: leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.tokenContractAddress,
            // chainId: leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.network?.chainId,
            // leaderboardDexUrl: leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.networkDex?.dex?.url,
            // leaderboardexclusionWalletAddressList: leaderboard.exclusionWalletAddressList,
            // competitionName: competition?.name,
            // competitionStartBlock: competition.startBlock,
            // competitionEndBlock: competition.endBlock
          }
          getStartBlock(data); 
        } else {
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response) {
          toast.error(e?.response?.data?.status?.message);
        } else {
          toast.error('Something went wrong. Try again later!');
        }
      });
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id, token)
      .then((res) => {
        if (res?.data?.body?.competition) {
          const { leaderboard } = res.data.body;
          const { competition } = res.data.body;
          setLeaderboardData(leaderboard);
          setCompetitionData(competition);
          let data = {
            tokenContractAddress: leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.tokenContractAddress,
            chainId: leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.network?.chainId,
            leaderboardDexUrl: leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.networkDex?.dex?.url,
            leaderboardexclusionWalletAddressList: leaderboard.exclusionWalletAddressList,
            competitionName: competition?.name,
            competitionStartBlock: competition.startBlock,
            competitionEndBlock: competition.endBlock
          }
          console.log(leaderboard, competition, data);
          getStartBlock(data);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e.response) {
          if (e.response) {
            toast.error(e?.response?.data?.status?.message);
          } else {
            toast.error('Something went wrong. Try again later!');
          }
        }
      });
  };

  const getStartBlock = (data) => {
    getStartBlockHolders(data.chainId, data.tokenContractAddress, data.competitionStartBlock, token)
      .then((res) => {
        if (res?.data?.data?.items  ) {
          const { items } = res.data.data;
          setStartBlockList(items);
          getEndBlock(data, items);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(e.response.data.error_message);
        } else {
          toast.error('Something went wrong. Try again later!');
        } 
      });
  };

  const getEndBlock = (data, startBlock) => {
    getEndBlockHolders(data.chainId, data.tokenContractAddress, data.competitionEndBlock, token)
      .then((res) => {
        if (res?.data?.data?.items  ) {
          const { items } = res.data.data;
          setEndBlockList(items);
          mapCompetitionData(items, startBlock, data);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        if (e?.response?.data?.error_message) {
          toast.error(e.response.data.error_message);
        } else {
          toast.error('Something went wrong. Try again later!');
        } 
      });
  };

  const TruncateWithoutRounding = (value, decimals) => {
    const parts = value.toString().split('.');

    if (parts.length === 2) {
      return Number([parts[0], parts[1].slice(0, decimals)].join('.'));
    }
    return Number(parts[0]);
  };

  const calculateLevelUpAmount = (nextHighestRankIndexGrowthRate, currentIndexGrowthRate) => {
    const result = nextHighestRankIndexGrowthRate - currentIndexGrowthRate + 1;
    // eitherConverter(nextHighestRankIndexGrowthRate, 'wei').ether - eitherConverter(currentIndexGrowthRate, 'wei').ether + 1;
    return result;
  };

  const mapCompetitionData = (endBlock, startBlock, data) => {
    const filteredList = filterList(
      mapHoldersBalance(endBlock, startBlock).filter((x) => Object.keys(x).length > 0 && x),
      data?.leaderboardexclusionWalletAddressList
    ); 
    const list = arraySortByKeyDescending(filteredList, 'growthRate');

    const levelUpSwapUrl = `${data.leaderboardDexUrl}swap?inputCurrency=BNB&outputCurrency=${data.tokenContractAddress}&exactField=output&exactAmount=`;

    if (list && list.length > 0) {
      for (let i = 0; i < list.length; i += 1) {
        list[i].rank = i + 1;

        list[i].formattedAddress = `${list[i].address.substr(0, 6)}...${list[i].address.substr(
          list[i].address.length - 4
        )}`;

        list[i].formattedBalance = TruncateWithoutRounding(
          eitherConverter(list[i].balance, 'wei').ether,
          2
        ).toLocaleString('en-US');

        list[i].formattedGrowthRate = TruncateWithoutRounding(list[i].growthRate, 2).toLocaleString('en-US');

        if (i === 0) {
          list[i].formattedLevelUpAmount = 'You are the leader';
          list[i].levelUpUrl = levelUpSwapUrl;
        } else {
          list[i].formattedLevelUpAmount = TruncateWithoutRounding(
            calculateLevelUpAmount(list[i - 1].growthRate, list[i].growthRate),
            2
          ).toLocaleString('en-US');
          list[i].levelUpUrl = levelUpSwapUrl + list[i].formattedLevelUpAmount;
        }
      }

      setTokenHolderList(list);
      setFilteredTokenHolderList(list);
    }
  };

  const mapHoldersBalance = (endBlocks, startBlocks) => {
    const droppedWallets = [];
    let newWallets = [];
    let matchedWallets = [];

    const onlyInLeft = (start, end) =>
      start.map((startValue) => {
        const sameEntry = end.filter((endValue) => startValue.address === endValue.address)[0];
        let tempObj = {};
        if (!sameEntry || undefined) {
          const diff = eitherConverter(startValue?.balance, 'wei').ether;
          tempObj = { ...startValue, growthRate: diff, status: 'New', color: 'yellow' };
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    const inBoth = (start, end) =>
      start.map((startValue) => {
        const sameEntry = end.filter((endValue) => startValue.address === endValue.address)[0];
        let tempObj = {};
        if (sameEntry) {
          const diff =
            eitherConverter(sameEntry?.balance, 'wei').ether - eitherConverter(startValue?.balance, 'wei').ether;
          let color = 'white';
          if (diff >= 0) {
            color = 'green';
          } else if (diff < 0) {
            color = 'red';
          }
          tempObj = { ...sameEntry, growthRate: diff, status: 'Matched', color }; // both
        } else {
          startValue.color = 'red';
          startValue.status = 'Dropped';
          startValue.growthRate = 0 - eitherConverter(startValue?.balance, 'wei').ether;
          droppedWallets.push(startValue); // dropped
        }
        return Object.keys(tempObj).length > 0 && tempObj;
      });

    console.log('first');
    newWallets = onlyInLeft(endBlocks, startBlocks, false).filter((obj) => obj && obj);
    matchedWallets = inBoth(startBlocks, endBlocks).filter((obj) => obj && obj); 
    return [...newWallets, ...droppedWallets, ...matchedWallets];
  };

  const levelUpFormatter = (params) => (
    <div data-label="Get Token">
    <a href={params.levelUpUrl} target="_blank" rel="noreferrer" className="f-btn f-btn-primary text-decoration-none">
      LEVEL UP
    </a></div>
  );

  const growthReductionFormatter = (params) => {
    const { status } = params;
    return ( 
      <div data-label="Growth / Reduction" className="justify-content-space-between">
       {params.formattedGrowthRate} 
      <p className='custom-label' style={{background: params.color}}> {status} </p>
      </div>
        /* <div style={{ color: params.row.color }}>
          {params.row.formattedGrowthRate} 
        </div>
        {params.row.status !== 'Matched' && (
          <Label
            variant="filled"
            sx={{ marginLeft: '14px' }}
            color={(status === 'New' && 'warning') || (status === 'Dropped' && 'error')}
          >
            {status}
          </Label>
        )} */
    );
  };

  const columns = [
    { prop: 'rank', title: 'Rank', cell: (params)=><div data-label="Rank">{params.rank}</div> },
    { prop: 'formattedAddress', title: 'Wallet Address', cell: (params)=><div data-label="Wallet Address">{params.formattedAddress}</div> },
    { prop: 'formattedBalance', title: 'Balance', cell: (params)=><div data-label="Balance">{params.formattedBalance}</div>  },
    {
      prop: 'formattedGrowthRate',
      title: 'Growth / Reduction', 
      cell: growthReductionFormatter
    },
    { prop: 'formattedLevelUpAmount', title: 'Level Up Amount', cell: (params)=><div data-label="Level Up Amount">{params.formattedLevelUpAmount}</div>  },
    {
      prop: 'levelUpUrl',
      title: 'Get Token', 
      cell: levelUpFormatter
    }
  ];

  const csvHeaders = [
    { label: 'Rank', key: 'rank' },
    { label: 'Wallet Address', key: 'address' },
    { label: 'Balance', key: 'formattedBalance' },
    { label: 'Growth / Reduction', key: 'formattedGrowthRate' },
    { label: 'Status', key: 'status'},
    { label: 'Level Up Amount', key: 'formattedLevelUpAmount' },
    { label: 'Get Token', key: 'levelUpUrl' }
  ];

  const onQueryChange = (e) => {
    setIsQueryChange(true);
    if (e.target.value) {
      setQuery(e.target.value);
    } else {
      setQuery('');
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
        filename={`${competitionData?.name}-${moment(new Date()).format('DD-MMM-YYYY')}.csv`}
        ref={exportRef}
        style={{ display: 'none' }}
      />
 <FContainer type="fluid">
        <FContainer>
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[6,12,12]} alignX={"center"}> 
       <h1>{competitionData?.name || "Competition"}</h1>
       </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6,12,12]} >
               <FInputTextField 
                    label="Search Wallet"
                    placeholder="0x000...0000" 
                    value={query}
                    type="search"
                    onChange={onQueryChange}
                    style={{ width: '100%' }}
                  />
                 
                {!isPublicUser && (
                <FButton type="button" className="btn-create f-ml-1" disabled={isLoading} onClick={onExportClick} title={" Export to CSV"}></FButton>
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

export default CompetitionInformation;
