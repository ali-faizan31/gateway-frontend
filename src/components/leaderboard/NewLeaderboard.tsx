import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { FInputTextField, FGrid, FGridItem, FButton, FContainer } from "ferrum-design-system";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import * as validations from "../../utils/validations";
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
import { addLeaderboard, getAllLeaderboards } from '../../_apis/LeaderboardCrud';
import { getAllLeaderboardsDispatch } from '../../redux/slices/leaderboard';
import { chainIdList, dexUrlList } from './LeaderboardHelper';

export default function NewLeaderboard() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLeaderboardPresent, setIsLeaderboardPresent] = useState(false);
  const [leaderboardInfo, setLeaderboardInfo] = useState({});

  const newLeaderboardScehma = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    tokenContractAddress: Yup.string().required('Contract Address is required'),
    chainId: Yup.string().required('Network is required'),
    dexUrl: Yup.string().required('Dex Url is required'),
    walletAddresses: Yup.string().required('Team Wallet Addresses are required')
  });

  const onCancel = () => {
    history.push(PATH_DASHBOARD.general.leaderboardManagement);
  };

  const getWalletAddressesArray = (list: any) => list.split(',');

  const initialValues = {
    name: '',
    tokenContractAddress: '',
    chainId: '',
    walletAddresses: '',
    dexUrl: '',
    isPublished: false
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({ defaultValues: initialValues, resolver: yupResolver(newLeaderboardScehma) });


  const onSubmit = async (values: any) => {
    values.walletAddresses = getWalletAddressesArray(values.walletAddresses);
    await addLeaderboard(values)
      .then((response) => {
        dispatch(getAllLeaderboardsDispatch());
        toast.success(response.data.status.message);
        history.push(PATH_DASHBOARD.general.leaderboardManagement);
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response.data.status.message);
        } else {
          toast.error('Something went wrong. Try again later!');
        }
      });
  }


  return (
    <>
      <div>
        <Toaster />
      </div>
      <FContainer type="fluid">
        <FContainer>
          <h1> Create Leaderboard </h1>
          <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
            <FGrid >
              <FGridItem alignX="center">
                <FInputTextField
                  label="Leaderboard Name"
                  name="name"
                  placeholder="Leaderboard Name"
                  register={register}
                  error={
                    errors["name"]?.message ? errors["name"]?.message : ""
                  }
                />
              </FGridItem>
              <FGridItem >
                <FInputTextField
                  label="Token Contract Address"
                  name="tokenContractAddress"
                  placeholder="Token Contract Address"
                  register={register}
                  error={errors["tokenContractAddress"]?.message ? errors["tokenContractAddress"]?.message : ""}
                />
              </FGridItem>
            </FGrid>
            <FGrid className={"f-mt-1"} >
              <FGridItem alignX="center">
                <FInputTextField
                  label="Network"
                  name="chainId"
                  placeholder="Network"
                  register={register}
                  error={errors["chainId"]?.message ? errors["chainId"]?.message : ""}
                />
              </FGridItem>
              <FGridItem alignX="center">
                <FInputTextField
                  label="Dex URL"
                  name="dexUrl"
                  placeholder="Dex URL"
                  register={register}
                  error={
                    errors["dexUrl"]?.message ? errors["dexUrl"]?.message : ""
                  }
                />
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="center" className={"f-mt-1"}>
                <FInputTextField
                  label="Team Wallet Addresses"
                  name="walletAddresses"
                  placeholder="walletAddress1,walletAddress2,walletAddress3"
                  register={register}
                  error={
                    errors["walletAddresses"]?.message ? errors["walletAddresses"]?.message : ""
                  }
                />
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="end" className={"f-mt-1"}>
                <FButton type="submit" title={"Create leaderboard"} postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}></FButton>
                <FButton type="button" onClick={onCancel} className={"f-ml-1"} title={"Cancel"}></FButton>
              </FGridItem>
            </FGrid>
          </form>
        </FContainer>
      </FContainer>
    </>
  );
}
