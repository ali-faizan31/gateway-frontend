import React, { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Card, Container, Grid, Stack, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Page from '../../../components/Page';
import { PATH_ADMIN } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import { addLeaderboard, getAllLeaderboards } from '../../../_apis_/LeaderboardCrud';
import { getAllLeaderboardsDispatch } from '../../../redux/slices/leaderboard';
import Toast from '../../../components/Toast';
import { chainIdList, dexUrlList } from './LeaderboardHelper';

export default function NewLeaderboard() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isLeaderboardPresent, setIsLeaderboardPresent] = useState(false);
  const [leaderboardInfo, setLeaderboardInfo] = useState({});

  // useEffect(() => {
  //   getLeaderboardListing();
  // }, []);

  const InformationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    tokenContractAddress: Yup.string().required('Contract Address is required'),
    chainId: Yup.string().required('Network is required'),
    dexUrl: Yup.string().required('Dex Url is required'),
    walletAddresses: Yup.string().required('Team Wallet Addresses are required')
  });

  const onCancel = () => {
    navigate(PATH_ADMIN.leaderboard.management);
  };

  const getWalletAddressesArray = (list) => list.split(',');

  const getLeaderboardListing = () => {
    getAllLeaderboards(0, 10)
      .then((res) => {
        if (res?.data?.body?.leaderboards?.length) {
          setLeaderboardInfo(res.data.body.leaderboards[0]);
          setIsLeaderboardPresent(true);
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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      tokenContractAddress: '',
      chainId: '',
      walletAddresses: '',
      dexUrl: '',
      isPublished: false
    },
    validationSchema: InformationSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      setSubmitting(true);
      values.walletAddresses = getWalletAddressesArray(values.walletAddresses); 
      addLeaderboard(values)
        .then((response) => {
          setSubmitting(false);
          dispatch(getAllLeaderboardsDispatch());
          enqueueSnackbar(response.data.status.message, {
            variant: 'success'
          });
          navigate(PATH_ADMIN.leaderboard.management);
        })
        .catch((e) => {
          resetForm();
          setSubmitting(false);
          if (e.response) { 
            enqueueSnackbar(e.response.data.status.message, {
              variant: 'error'
            });
          } else {
            // <Toast message='Something went wrong. Try again later!' type='error'/>
            enqueueSnackbar('Something went wrong. Try again later!', {
              variant: 'error'
            });
          }
        });
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  return (
    <>
      <Page>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Grid container sx={{ marginTop: '40px' }} />
          <h1> Create Leaderboard </h1>
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                  <Card sx={{ py: 10, px: 3 }}>
                    <Stack spacing={3} className="card-input">
                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          fullWidth
                          label="Leaderboard Name"
                          {...getFieldProps('name')}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                        <TextField
                          fullWidth
                          label="Token Contract Address"
                          {...getFieldProps('tokenContractAddress')}
                          error={Boolean(touched.tokenContractAddress && errors.tokenContractAddress)}
                          helperText={touched.tokenContractAddress && errors.tokenContractAddress}
                        />
                      </Stack>

                      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                        <TextField
                          select
                          fullWidth
                          label="Network"
                          placeholder="Network"
                          {...getFieldProps('chainId')}
                          SelectProps={{ native: true }}
                          error={Boolean(touched.chainId && errors.chainId)}
                          helperText={touched.chainId && errors.chainId}
                        >
                          <option value="" />
                          {chainIdList.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                        <TextField
                          select
                          fullWidth
                          label="Dex URL"
                          {...getFieldProps('dexUrl')}
                          SelectProps={{ native: true }}
                          error={Boolean(touched.dexUrl && errors.dexUrl)}
                          helperText={touched.dexUrl && errors.dexUrl}
                        >
                          <option value="" />
                          {dexUrlList.map((option) => (
                            <option key={option.url} value={option.label}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Stack>

                      <TextField
                        fullWidth
                        label="Team Wallet Addresses"
                        placeholder="walletAddress1,walletAddress2,walletAddress3"
                        {...getFieldProps('walletAddresses')}
                        error={Boolean(touched.walletAddresses && errors.walletAddresses)}
                        helperText={touched.walletAddresses && errors.walletAddresses}
                      />
                      <FormControlLabel
                        control={<Checkbox {...getFieldProps('isPublished')} />}
                        label="Auto Publish"
                        sx={{ mt: 3 }}
                      />
                      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <LoadingButton
                          type="submit"
                          variant="contained"
                          loading={isSubmitting}
                          // disabled={isLeaderboardPresent}
                        >
                          Create Leaderboard
                        </LoadingButton>
                        <Button type="button" color="inherit" variant="outlined" onClick={onCancel} sx={{ ml: 1.5 }}>
                          Cancel
                        </Button>
                      </Box>
                    </Stack>
                    {/* </Card> */}
                  </Card>
                </Grid>
              </Grid>
            </Form>
          </FormikProvider>
        </Container>
      </Page>

      {/* <Dialog open={isLeaderboardPresent} fullWidth maxWidth="xs">
        <DialogTitle>Leaderboard Information</DialogTitle>

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <div>
              <Typography variant="subtitle2">You have created '{leaderboardInfo.name}' leaderboard. 
              </Typography>
               You can only create 1 leaderboard 
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Leaderboard Status : {leaderboardInfo.status}
              </Typography>
            </div>
          </Stack>
        </Stack>
        <DialogActions> 
        <Button onClick={onCancel}>Go Back</Button>
      </DialogActions>
      </Dialog> */}
    </>
  );
}
