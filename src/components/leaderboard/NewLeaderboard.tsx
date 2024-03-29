import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  FInputText,
  FGrid,
  FGridItem,
  FButton,
  FContainer,
  FInputCheckbox,
} from "ferrum-design-system";
import { useHistory } from "react-router-dom";
// import { useDispatch } from 'react-redux';
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
// import * as validations from "../../utils/validations";
import { PATH_DASHBOARD } from "../../routes/paths";
import { addLeaderboard } from "../../_apis/LeaderboardCrud";
// import { getAllLeaderboardsDispatch } from '../../redux/slices/leaderboard';
// import { chainIdList, dexUrlList } from './LeaderboardHelper';
import { TOKEN_TAG } from "../../utils/const.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/rootReducer";
import { getErrorMessage } from "../../utils/global.utils";

export default function NewLeaderboard() {
  const history = useHistory();
  let token = localStorage.getItem(TOKEN_TAG);
  const { activeTranslation } = useSelector((state: RootState) => state.phrase);


  const newLeaderboardScehma = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    currencyAddressesByNetwork: Yup.string().required("Currency is required"),
  });

  const onCancel = () => {
    history.push(PATH_DASHBOARD.general.leaderboardManagement);
  };

  const getArrayFromString = (list: any) => {
    console.log(list);
    return list.length ? list.split(",") : list;
  };

  const initialValues = {
    name: "",
    exclusionWalletAddressList: "",
    currencyAddressesByNetwork: "",
    isPublished: false,
  };

  const {
    // reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(newLeaderboardScehma),
  });

  const onSubmit = async (values: any) => {
    values.exclusionWalletAddressList = getArrayFromString(
      values.exclusionWalletAddressList
    );
    values.currencyAddressesByNetwork = getArrayFromString(
      values.currencyAddressesByNetwork
    );
    await addLeaderboard(values, token)
      .then((response) => {
        // dispatch(getAllLeaderboardsDispatch());
        toast.success(response.data.status.message);
        history.push(PATH_DASHBOARD.general.leaderboardManagement);
      })
      .catch((e: any) => {
        getErrorMessage(e, activeTranslation)
      });
  };

  return (
    <>
      <Toaster />

      <FContainer type="fluid">
        <FContainer>
          <h1> Create Leaderboard </h1>
          <form autoComplete="true" onSubmit={handleSubmit(onSubmit)}>
            <FGrid>
              <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
                <FInputText
                  label="Leaderboard Name"
                  name="name"
                  placeholder="Leaderboard Name"
                  register={register}
                  error={errors["name"]?.message ? errors["name"]?.message : ""}
                />
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
                <FInputText
                  label="Team Wallet Addresses"
                  name="exclusionWalletAddressList"
                  placeholder="walletAddress1,walletAddress2,walletAddress3"
                  register={register}
                  error={
                    errors["exclusionWalletAddressList"]?.message
                      ? errors["exclusionWalletAddressList"]?.message
                      : ""
                  }
                />
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
                <FInputText
                  label="Currency"
                  name="currencyAddressesByNetwork"
                  placeholder="currencyAddress1,currencyAddress2"
                  register={register}
                  error={
                    errors["currencyAddressesByNetwork"]?.message
                      ? errors["currencyAddressesByNetwork"]?.message
                      : ""
                  }
                />
              </FGridItem>
            </FGrid>
            <FInputCheckbox
              display={"inline"}
              label="Publish Leaderboard"
              className={"f-mt-2 f-mb-2"}
              name={"isPublished"}
              register={register}
              error={
                errors["isPublished"]?.message
                  ? errors["isPublished"]?.message
                  : ""
              }
            />
            <FGrid>
              <FGridItem alignX="end" dir={"row"} className={"f-mt-1"}>
                <FButton
                  type="submit"
                  title={"Create leaderboard"}
                  postfix={
                    isSubmitting && <ClipLoader color="#fff" size={20} />
                  }
                ></FButton>
                <FButton
                  type="button"
                  onClick={onCancel}
                  className={"f-ml-1"}
                  title={"Cancel"}
                ></FButton>
              </FGridItem>
            </FGrid>
          </form>
        </FContainer>
      </FContainer>
    </>
  );
}
