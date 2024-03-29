import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import { format, parseISO } from "date-fns";
import { useForm } from "react-hook-form";
import { FInputText, FGrid, FGridItem, FButton, FContainer, FSelect, FDatepicker, FInputCheckbox } from "ferrum-design-system";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import { PATH_DASHBOARD } from "../../routes/paths";
import { getAllLeaderboards } from "../../_apis/LeaderboardCrud";
import { addCompetition } from "../../_apis/CompetitionCrud";
import { chainIdList } from "../leaderboard/LeaderboardHelper";
import { TOKEN_TAG } from "../../utils/const.utils";
import { getErrorMessage } from "../../utils/global.utils";

export default function NewCompetition() {
  const history = useHistory();
  let token = localStorage.getItem(TOKEN_TAG);
  const [leaderboardList, setLeaderboardList] = useState([]);
  const { activeTranslation } = useSelector((state) => state.phrase);

  useEffect(() => {
    getLeaderboardListing();
    // eslint-disable-next-line
  }, []);

  const newCompetitionSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    leaderboard: Yup.object().required("Leaderboard is required"),
    startBlock: Yup.string(),
    endBlock: Yup.string(),
    startDate: Yup.string().required("Start Date/Time is required"),
    endDate: Yup.string().required("End Date/Time is required"),
  });

  const initialValues = {
    name: "",
    leaderboard: { label: "Select" },
    startBlock: "",
    endBlock: "",
    endDate: "",
    startDate: "",
    status: false,
  };

  const {
    // reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    // watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(newCompetitionSchema),
  });

  const onSubmit = async (values) => {
    try {
      values.leaderboard = values.leaderboard._id;
      values.startDate = new Date(`${values.startDate} UTC`).toISOString();
      values.endDate = new Date(`${values.endDate} UTC`).toISOString();
      values.status === true ? (values.status = "published") : (values.status = "pending");
    } catch (e) {
      toast.error(`Error: ${e}`);
    }

    console.log(values);

    if (!values.leaderboard) {
      toast.error("leaderboard is required");
      return;
    }
    console.log(values);
    await addCompetition(values, token)
      .then((response) => {
        // dispatch(getAllCompetitionsDispatch());
        toast.success(response.data.status.message);
        history.push(PATH_DASHBOARD.general.competitionManagement);
      })
      .catch((e) => {
        getErrorMessage(e, activeTranslation);
      });
  };

  const mapLeaderboardData = (leaderboards) => {
    let tempLeaderboardArray = [];
    if (leaderboards && leaderboards.length) {
      leaderboards.forEach((leaderboard) => {
        let chainId = leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.network?.chainId;
        for (let i = 0; i < chainIdList.length; i += 1) {
          if (chainId && chainIdList[i].id === chainId) {
            leaderboard.network = chainIdList[i].label;
            leaderboard.label = `${leaderboard?.name} | ${leaderboard?.network} | ${leaderboard?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.tokenContractAddress}`;
            leaderboard.value = leaderboard._id;
            tempLeaderboardArray.push(leaderboard);
          }
        }
      });
    }
    setLeaderboardList(tempLeaderboardArray);
  };

  const getLeaderboardListing = () => {
    getAllLeaderboards(0, 10, token)
      .then((res) => {
        if (res?.data?.body?.leaderboards?.length) {
          mapLeaderboardData(res.data.body.leaderboards);
        } else {
          setLeaderboardList([]);
        }
      })
      .catch((e) => {
        getErrorMessage(e, activeTranslation);
      });
  };

  const onCancel = () => {
    history.push(PATH_DASHBOARD.general.competitionManagement);
  };

  return (
    <>
      <Toaster />
      <FContainer type="fluid">
        <FContainer>
          <h1>Create Competition </h1>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FGrid>
              <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
                <FSelect
                  label="Leaderboard"
                  name="leaderboard"
                  placeholder="Leaderboard"
                  control={control}
                  options={leaderboardList}
                  register={register}
                  // onChange={(e) => {
                  //   console.log(e);
                  //   setSelectedLeaderboard(e.target._id);
                  // }}
                  error={errors["leaderboard"]?.message ? errors["leaderboard"]?.message : ""}
                />
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
                <FInputText
                  label="Competition Name"
                  name="name"
                  placeholder="Competition Name"
                  register={register}
                  error={errors["name"]?.message ? errors["name"]?.message : ""}
                />
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="center" size={[6, 12, 12]}>
                {/* <FInputText
                  label="Start Date/Time in UTC"
                  name="startDate"
                  className={"f-mt-1"}
                  placeholder="Start Date/Time in UTC"
                  register={register}
                  error={
                    errors["startDate"]?.message
                      ? errors["startDate"]?.message
                      : ""
                  }
                />  */}
                <FDatepicker
                  className={"f-mt-1"}
                  label={"Start Date/Time in UTC"}
                  name={"startDate"}
                  placeholder={"MM/DD/YYYY hh:mm"}
                  showTimeSelect={true}
                  register={register}
                  control={control}
                  error={errors["startDate"]?.message ? errors["startDate"]?.message : ""}
                />
              </FGridItem>
              <FGridItem alignX="center" size={[6, 12, 12]}>
                <FDatepicker
                  className={"f-mt-1"}
                  label={"End Date/Time in UTC"}
                  name={"endDate"}
                  showTimeSelect={true}
                  placeholder={"MM/DD/YYYY hh:mm"}
                  register={register}
                  control={control}
                  error={errors["endDate"]?.message ? errors["endDate"]?.message : ""}
                />
                {/* <FInputText
                  label="End Date/Time in UTC"
                  name="endDate"
                  className={"f-mt-1"}
                  placeholder="End Date/Time in UTC"
                  register={register}
                  error={
                    errors["endDate"]?.message
                      ? errors["endDate"]?.message
                      : ""
                  }
                />  */}
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="center" className={"f-mt-1"} size={[6, 12, 12]}>
                <FInputText
                  label="Start Block"
                  name="startBlock"
                  placeholder="Start Block"
                  register={register}
                  error={errors["startBlock"]?.message ? errors["startBlock"]?.message : ""}
                />
              </FGridItem>
              <FGridItem alignX="center" className={"f-mt-1"} size={[6, 12, 12]}>
                <FInputText label="End Block" name="endBlock" placeholder="End Block" register={register} error={errors["endBlock"]?.message ? errors["endBlock"]?.message : ""} />
              </FGridItem>
            </FGrid>
            <FInputCheckbox
              display={"inline"}
              label="Publish Competition"
              className={"f-mt-2 f-mb-2"}
              name={"status"}
              register={register}
              error={errors["status"]?.message ? errors["status"]?.message : ""}
            />
            <FGrid>
              <FGridItem alignX="end" dir={"row"} className={"f-mt-1"}>
                <FButton type="submit" title={"Create Competition"} postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}></FButton>
                <FButton type="button" onClick={onCancel} className={"f-ml-1"} title={"Cancel"}></FButton>
              </FGridItem>
            </FGrid>
          </form>
        </FContainer>
      </FContainer>
    </>
  );
}
