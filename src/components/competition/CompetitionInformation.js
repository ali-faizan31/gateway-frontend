import React, { useEffect, useState, useRef } from 'react';
import { Container, Grid, TextField, Stack, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams, useLocation } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import eitherConverter from 'ether-converter';
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import useSettings from '../../../hooks/useSettings'; 
import {
  getCompetitionById,
  getCompetitionByIdForPublicUser,
  getStartBlockHolders,
  getEndBlockHolders
} from '../../../_apis_/CompetitionCrud';
import { arraySortByKeyDescending } from '../../../utils/globals.utils';
import { filterList } from '../leaderboard/LeaderboardHelper';

const CompetitionInformation = () => {
  const { id } = useParams();
  const exportRef = useRef();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { enqueueSnackbar } = useSnackbar();
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
    getCompetitionByIdForPublicUser(id)
      .then((res) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          const { competition } = res.data.body;
          setLeaderboardData(leaderboard);
          setCompetitionData(competition);
          getStartBlock(leaderboard);
        }
      })
      .catch((e) => {
        if (e.response) {
          enqueueSnackbar(e.response.data.status.message, {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Something went wrong. Try again later!', {
            variant: 'error'
          });
        }
      });
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id)
      .then((res) => {
        if (res?.data?.body?.competition) {
          const { leaderboard } = res.data.body;
          const { competition } = res.data.body;
          setLeaderboardData(leaderboard);
          setCompetitionData(competition);
          getStartBlock(leaderboard);
        }
      })
      .catch((e) => {
        if (e.response) {
          enqueueSnackbar(e.response.data.status.message, {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Something went wrong. Try again later!', {
            variant: 'error'
          });
        }
      });
  };

  const getStartBlock = (leaderboard) => {
    getStartBlockHolders(leaderboard?.chainId, leaderboard?.tokenContractAddress)
      .then((res) => {
        if (res?.data?.data?.items && res.data.data.items.length > 0) {
          const { items } = res.data.data;
          setStartBlockList(items);
          getEndBlock(leaderboard, items);
        }
      })
      .catch((e) => {
        if (e?.response?.data?.error_message) {
          enqueueSnackbar(e.response.data.error_message, {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Something went wrong. Try again later!', {
            variant: 'error'
          });
        }
      });
  };

  const getEndBlock = (leaderboard, startBlock) => {
    getEndBlockHolders(leaderboard?.chainId, leaderboard?.tokenContractAddress)
      .then((res) => {
        if (res?.data?.data?.items && res.data.data.items.length > 0) {
          const { items } = res.data.data;
          setEndBlockList(items);
          mapCompetitionData(items, startBlock, leaderboard);
          setIsLoading(false);
        }
      })
      .catch((e) => {
        if (e?.response?.data?.error_message) {
          enqueueSnackbar(e.response.data.error_message, {
            variant: 'error'
          });
        } else {
          enqueueSnackbar('Something went wrong. Try again later!', {
            variant: 'error'
          });
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

  const mapCompetitionData = (endBlock, startBlock, leaderboard) => {
    const filteredList = filterList(
      mapHoldersBalance(endBlock, startBlock).filter((x) => Object.keys(x).length > 0 && x),
      leaderboard?.walletAddresses
    ); 
    const list = arraySortByKeyDescending(filteredList, 'growthRate');

    const levelUpSwapUrl = `${leaderboard.dexUrl}swap?inputCurrency=BNB&outputCurrency=${leaderboard.tokenContractAddress}&exactField=output&exactAmount=`;

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
          if (diff > 0) {
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

    newWallets = onlyInLeft(endBlocks, startBlocks, false).filter((obj) => obj && obj);
    matchedWallets = inBoth(startBlocks, endBlocks).filter((obj) => obj && obj); 
    return [...newWallets, ...droppedWallets, ...matchedWallets];
  };

  const levelUpFormatter = (params) => (
    <a href={params.row.levelUpUrl} target="_blank" rel="noreferrer" className="btn-level-up br-40">
      LEVEL UP
    </a>
  );

  const growthReductionFormatter = (params) => {
    const { status } = params.row;
    return (
      <>
        <div style={{ color: params.row.color }}>
          {params.row.formattedGrowthRate}
          {/* {params.row.status !=='same' && <small  >{params.row.status}</small>}  */}
        </div>
        {params.row.status !== 'Matched' && (
          <Label
            variant="filled"
            sx={{ marginLeft: '14px' }}
            color={(status === 'New' && 'warning') || (status === 'Dropped' && 'error')}
          >
            {status}
          </Label>
        )}
      </>
    );
  };

  const columns = [
    { field: 'rank', headerName: 'Rank', headerClassName: 'table-header', width: 150 },
    { field: 'formattedAddress', headerName: 'Wallet Address', headerClassName: 'table-header', width: 200 },
    { field: 'formattedBalance', headerName: 'Balance', headerClassName: 'table-header', width: 200 },
    {
      field: 'formattedGrowthRate',
      headerName: 'Growth / Reduction',
      headerClassName: 'table-header',
      width: 200,
      cellClassName: 'MuiDataGrid-cell-Growth',
      renderCell: growthReductionFormatter
    },
    { field: 'formattedLevelUpAmount', headerName: 'Level Up Amount', headerClassName: 'table-header', width: 200 },
    {
      field: 'levelUpUrl',
      headerName: 'Get Token',
      headerClassName: 'table-header',
      width: 200,
      renderCell: levelUpFormatter
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
    <CSVLink
        data={filteredTokenHolderList}
        headers={csvHeaders}
        filename={`${competitionData?.name}-${moment(new Date()).format('DD-MMM-YYYY')}.csv`}
        ref={exportRef}
        style={{ display: 'none' }}
      />

      <Page title="Leaderboard">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container sx={{ marginTop: '60px' }}>
            <Grid item xs={12} sm={4} lg={6} md={6} sx={{ textAlign: 'left' }}>
              <h1 style={{ color: theme.palette.primary.main }}>{competitionData.name}</h1>
            </Grid>
            <Grid item xs={12} sm={8} lg={6} md={6} sx={{ textAlign: 'rigth', justifyContent: 'flex-end' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} justifyContent="flex-end">
                <Grid item xs={12} sm={8} lg={5} md={5}>
                  <TextField
                    id="outlined-basic"
                    label="Search Wallet"
                    placeholder="0x000...0000"
                    variant="outlined"
                    value={query}
                    type="search"
                    onChange={onQueryChange}
                    style={{ width: '100%' }}
                  />
                </Grid>
                {!isPublicUser && (
                  <Button type="button" className="btn-create" disabled={isLoading} onClick={onExportClick}>
                    Export to CSVs
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '40px' }} />
          {isLoading && <ProgressBar />}
          <div style={{ height: '90vh', width: '100%' }}>
            <DataGrid
              rows={filteredTokenHolderList}
              columns={columns}
              getRowId={(row) => row.rank}
              pageSize={100}
              rowsPerPageOptions={[]}
              // checkboxSelection
              disableColumnMenu
              disableSelectionOnClick
            />
          </div>
        </Container>
      </Page>
    </>
  );
};

export default CompetitionInformation;
