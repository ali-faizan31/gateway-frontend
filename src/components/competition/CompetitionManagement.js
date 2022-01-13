import React, { useEffect, useState } from 'react';
// material
import { Grid, Button, Stack, Container, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useTheme } from '@mui/material/styles';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page'; 
import { PATH_ADMIN, PATH_DASHBOARD } from '../../../routes/paths';
import { getAllCompetitions } from '../../../_apis_/CompetitionCrud';
import SvgIconStyle from '../../../components/SvgIconStyle';
import Label from '../../../components/Label';

const CompetitionManagement = () => {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const limit = 10;
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [competitionList, setCompetitionList] = useState([]);

  useEffect(() => {
    getCompetitionListing();
  }, [query]);

  const statusFormatter = (params) => {
    const { status } = params.row; 
    return (
      <>
        <Label
          variant="filled"
          color={
            (status === 'published' && 'success') ||
            (status === 'pending' && 'warning') ||
            (status === 'cancelled' && 'error') ||
            (status === 'started' && 'default') ||
            (status === 'completed' && 'secondary')
          }
        >
          {sentenceCase(status)}
        </Label>
      </>
    );
  };

  const actionFormatter = (params) => {
    const wesehi = 10;
    return (
      <>
        <Button type="button" className="btn-detail br-40" onClick={() => onDetailClick(params.row)}>
          Details
        </Button>
      </>
    );
  };

  const dateFormatter = (params) => {
    if (params.field === 'endDate') {
      if (params?.row?.endDate) {
        return moment(new Date(params.row.endDate)).format('DD-MMM-YYYY | HH:mm');
      }
    } else if (params.field === 'startDate') {
      if (params?.row?.startDate) {
        return moment(new Date(params.row.startDate)).format('DD-MMM-YYYY | HH:mm');
      }
    }
  };

  const columns = [
    { field: 'name', headerName: 'Name', headerClassName: 'table-header', width: 200 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      headerClassName: 'table-header',
      width: 250,
      renderCell: dateFormatter
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      headerClassName: 'table-header',
      width: 250,
      renderCell: dateFormatter
    },
    { field: 'status', headerName: 'Status', headerClassName: 'table-header', width: 200, renderCell: statusFormatter },
    { field: 'action', headerName: 'Action', headerClassName: 'table-header', width: 200, renderCell: actionFormatter } // valueGetter
  ];

  const getCompetitionListing = () => {
    getAllCompetitions(offset, limit)
      .then((res) => {
        if (query === '') {
          if (res?.data?.body?.competitions?.length) {
            const { competitions } = res.data.body;
            setCompetitionList(competitions); 
          }
        } else if(query){
          if (res?.data?.body?.competitions?.length) {
            const { competitions } = res.data.body;
            const tempData = competitions.map((x) => x.name.toLowerCase().includes(query.toLowerCase()) && x);
            setCompetitionList(tempData.filter((x) => x && x));
          }
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

  const onDetailClick = (row) => { 
    navigate(`${PATH_DASHBOARD.general.competition}/${row._id}`);
  };

  const openCreateCompetition = () => {
    navigate(PATH_ADMIN.competition.create);
  };

  return (
    <>
      <Page title="Leaderboard">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container sx={{ marginTop: '60px' }}>
            <Grid item xs={12} sm={4} lg={6} md={6} sx={{ textAlign: 'left' }}>
              <h1 style={{ color: theme.palette.primary.main }}>Competition Management</h1>
            </Grid>
            <Grid item xs={12} sm={8} lg={6} md={6} sx={{ textAlign: 'rigth', justifyContent: 'flex-end' }}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }} justifyContent="flex-end">
                <Grid item xs={12} sm={8} lg={5} md={5}>
                  <TextField
                    id="outlined-basic"
                    label="Search"
                    placeholder="Competition name"
                    variant="outlined"
                    value={query}
                    type="search"
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Button type="button" className="btn-create" onClick={openCreateCompetition}>
                  Create Competition
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '40px' }} />
          <div style={{ height: 300, width: '100%' }}>
            <DataGrid
              rows={competitionList}
              columns={columns}
              getRowId={(row) => row._id}
              // pageSize={5}
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

export default CompetitionManagement;
