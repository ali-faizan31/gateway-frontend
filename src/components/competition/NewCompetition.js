import React, { useState, useEffect } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Container, Box, Card, Grid, Stack, TextField, Button } from '@mui/material';
import { DatePicker } from 'antd';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import Page from '../../../components/Page';
import useSettings from '../../../hooks/useSettings';
import { getAllLeaderboards } from '../../../_apis_/LeaderboardCrud';
import { addCompetition } from '../../../_apis_/CompetitionCrud';
import { getAllCompetitionsDispatch } from '../../../redux/slices/competition';
import { PATH_ADMIN } from '../../../routes/paths';
import './Competition.scss';
import { chainIdList } from '../Leaderboard/LeaderboardHelper';

export default function NewCompetition() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [eventStartValue, setEventStartValue] = useState(null);
  const [eventEndValue, setEventEndValue] = useState(null);
  const [eventEndOpen, setEventEndOpen] = useState(false);
  const [leaderboardList, setLeaderboardList] = useState([]);

  useEffect(() => {
    getLeaderboardListing();
  }, []);

  const InformationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    leaderboard: Yup.string().required('Leaderboard is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      leaderboard: ''
    },
    validationSchema: InformationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      values.startDate = moment(eventStartValue, 'YYYY-MM-DD').utc().toISOString();
      values.endDate = moment(eventEndValue, 'YYYY-MM-DD').utc().toISOString(); 
      addCompetition(values)
        .then((response) => {
          setSubmitting(false);
          dispatch(getAllCompetitionsDispatch());
          enqueueSnackbar(response.data.status.message, {
            variant: 'success'
          });
          navigate(PATH_ADMIN.competition.management);
        })
        .catch((e) => {
          setSubmitting(false);
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
    }
  });

  const mapLeaderboardData = (leaderboards) => { 
    if (leaderboards && leaderboards.length) {
      leaderboards.forEach((leaderboard) => {
        for(let i=0;i<chainIdList.length;i+=1){
          if(chainIdList[i].id===leaderboard.chainId){ 
            leaderboard.network =  chainIdList[i].label;
          }
        }
      });
    } 
    setLeaderboardList(leaderboards);
  };

  const getLeaderboardListing = () => {
    getAllLeaderboards(0, 10)
      .then((res) => {
        if (res?.data?.body?.leaderboards?.length) {
          mapLeaderboardData(res.data.body.leaderboards); 
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

  const onDateChange = (date, setFieldValue) => {
    // const newDate = moment(date);
    // const newS = newDate.tz('UTC').format('dddd D MMMM, YYYY hh:mm a');
    setFieldValue('endDate', date);
  };

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const disabledEventStartDate = (startValue) => {
    const endValue = eventEndValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEventEndDate = (endValue) => {
    const startValue = eventStartValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onEventStartChange = (date) => { 
    setEventStartValue(date);
  };

  const onEventEndChange = (date) => {
    setEventEndValue(date);
  };

  const handleEventStartOpenChange = (open) => {
    if (!open) {
      setEventEndOpen(true);
    } else {
      setTimeout(() =>
        setTimeout(() => {
          const inputs = document.getElementsByClassName('ant-calendar-input');
          if (inputs.length > 0 && inputs[0]) {
            inputs[0].blur();
          }
        })
      );
    }
  };

  const handleEventEndOpenChange = (open) => {
    setEventEndOpen(open);
  };

  const onCancel = () => {
    navigate(PATH_ADMIN.competition.management);
  };

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container sx={{ marginTop: '40px' }} />
        <h1>Create Competition </h1>
        <FormikProvider value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ py: 10, px: 3 }}>
                  <Stack spacing={3}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <TextField
                        select
                        fullWidth
                        label="Leaderboard"
                        {...getFieldProps('leaderboard')}
                        SelectProps={{ native: true }}
                        error={Boolean(touched.leaderboard && errors.leaderboard)}
                        helperText={touched.leaderboard && errors.leaderboard}
                      >
                        <option value="" />
                        {leaderboardList.map((option) => (
                          <option key={option._id} value={option._id}>
                            {option?.name} | {option?.network} | {option?.tokenContractAddress}
                          </option>
                        ))}
                      </TextField>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <TextField
                        fullWidth
                        label="Competition Name"
                        {...getFieldProps('name')}
                        error={Boolean(touched.name && errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                      <DatePicker
                        name="startDate"
                        showTime
                        required
                        format="DD-MMM-YYYY HH:mm"
                        value={eventStartValue}
                        placeholder="Start Date/Time in UTC"
                        onChange={onEventStartChange}
                        onOpenChange={handleEventStartOpenChange}
                        disabledDate={disabledEventStartDate}
                      />
                      <DatePicker
                        name="endDate"
                        showTime
                        format="DD-MMM-YYYY HH:mm"
                        value={eventEndValue}
                        placeholder="End Date/Time in UTC"
                        disabledDate={disabledEventEndDate}
                        onChange={onEventEndChange}
                        open={eventEndOpen}
                        onOpenChange={handleEventEndOpenChange}
                      />
                    </Stack>

                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <LoadingButton type="submit" variant="contained" disabled={values.leaderboard === ''}>
                        Create Competition
                      </LoadingButton>
                      <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ ml: 1.5 }}>
                        Cancel
                      </Button>
                    </Box>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </FormikProvider>
      </Container>
    </Page>
  );
}
