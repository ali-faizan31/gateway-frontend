import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  FInputTextField,
  FGrid,
  FGridItem,
  FButton,
  FContainer,
  FSelect,
  FDatepicker,
} from "ferrum-design-system";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";
import * as validations from "../../utils/validations";
import { PATH_ADMIN, PATH_DASHBOARD } from "../../routes/paths";
import { DatePicker } from "antd";
import moment from "moment";
import { getAllLeaderboards } from "../../_apis/LeaderboardCrud";
import { addCompetition } from "../../_apis/CompetitionCrud";
import { getAllCompetitionsDispatch } from "../../redux/slices/competition";
// import "./Competition.scss";
import { chainIdList } from "../leaderboard/LeaderboardHelper";

export default function NewCompetition() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [eventStartValue, setEventStartValue] = useState(null);
  const [eventEndValue, setEventEndValue] = useState(null);
  const [eventEndOpen, setEventEndOpen] = useState(false);
  const [selectedLeaderboard, setSelectedLeaderboard] = useState("");
  const [leaderboardList, setLeaderboardList] = useState([
    { _id: 1, value: "leader", network: "56", label: "he | gfghj | kjhgfxcv" },
    { _id: 3, value: "leader", network: "56", label: "he kjhg } jhyh" },
  ]);

  useEffect(() => {
    getLeaderboardListing();
  }, []);

  const newCompetitionSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    leaderboard: Yup.string().required("Leaderboard is required"),
    startBlock: Yup.string().required("Start block is required"),
    endBlock: Yup.string().required("End block is required"),
    startDate: Yup.string().required("Start Date/Time is required"),
    endDate: Yup.string().required("End Date/Time is required"),
  });

  const initialValues = {
    name: "",
    leaderboard: "",
    startBlock: "",
    endBlock: "",
    endDate: "",
    startDate: ""
  };

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(newCompetitionSchema),
  });

  const onSubmit = async (values) => {
    console.log(values);
    values.startDate = moment(eventStartValue, "YYYY-MM-DD")
      .utc()
      .toISOString();
    values.endDate = moment(eventEndValue, "YYYY-MM-DD").utc().toISOString();
    // await addCompetition(values)
    //   .then((response) => {
    //     dispatch(getAllCompetitionsDispatch());
    //     toast.success(response.data.status.message);
    //     history.push(PATH_ADMIN.competition.management);
    //   })
    //   .catch((e) => {
    //     if (e.response) {
    //       toast.error(e.response.data.status.message);
    //     } else {
    //       toast.error("Something went wrong. Try again later!");
    //     }
    //   });
  };

  console.log('opt',selectedLeaderboard);

  const mapLeaderboardData = (leaderboards) => {
    if (leaderboards && leaderboards.length) {
      leaderboards.forEach((leaderboard) => {
        for (let i = 0; i < chainIdList.length; i += 1) {
          if (chainIdList[i].id === leaderboard.chainId) {
            leaderboard.network = chainIdList[i].label;
            leaderboard.label = `${leaderboard.name} | ${leaderboard.network} | ${leaderboard.tokenContractAddress}`; 
            leaderboard.value = leaderboard._id;
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
          toast.error(e.response.data.status.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const onDateChange = (date, setFieldValue) => {
    // const newDate = moment(date);
    // const newS = newDate.tz('UTC').format('dddd D MMMM, YYYY hh:mm a');
    setFieldValue("endDate", date);
  };

  const onCancel = () => {
    history.push(PATH_ADMIN.competition.management);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
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
                  onChange={(e) => {
                    console.log(e);
                    setSelectedLeaderboard(e.target._id);
                  }}
                  error={
                    errors["leaderboard"]?.message
                      ? errors["leaderboard"]?.message
                      : ""
                  }
                />
              </FGridItem>
            </FGrid> 
            <FGrid>
              <FGridItem alignX="center" size={[12]} className={"f-mt-1"}>
                <FInputTextField
                  label="Competition Name"
                  name="name"
                  placeholder="Competition Name"
                  register={register}
                  error={errors["name"]?.message ? errors["name"]?.message : ""}
                />
              </FGridItem> 
            </FGrid>
            <FGrid className={"f-mt-1"}>
              <FGridItem alignX="center" size={[6, 12, 12]}>
                <FInputTextField
                  label="Start Date/Time in UTC"
                  name="startDate"
                  placeholder="Start Date/Time in UTC"
                  register={register}
                  error={
                    errors["startDate"]?.message
                      ? errors["startDate"]?.message
                      : ""
                  }
                /> 
              </FGridItem>
              <FGridItem alignX="center" size={[6, 12, 12]}>
                <FInputTextField
                  label="End Date/Time in UTC"
                  name="endDate"
                  placeholder="End Date/Time in UTC"
                  register={register}
                  error={
                    errors["endDate"]?.message
                      ? errors["endDate"]?.message
                      : ""
                  }
                /> 
              </FGridItem>
            </FGrid>
            <FGrid className={"f-mt-1"}>
              <FGridItem alignX="center" size={[6, 12, 12]}>
                <FInputTextField
                  label="Start Block"
                  name="startBlock"
                  placeholder="Start Block"
                  register={register}
                  error={
                    errors["startBlock"]?.message
                      ? errors["startBlock"]?.message
                      : ""
                  }
                /> 
              </FGridItem>
              <FGridItem alignX="center" size={[6, 12, 12]}>
                <FInputTextField
                  label="End Block"
                  name="endBlock"
                  placeholder="End Block"
                  register={register}
                  error={
                    errors["endBlock"]?.message
                      ? errors["endBlock"]?.message
                      : ""
                  }
                /> 
              </FGridItem>
            </FGrid>
            <FGrid>
              <FGridItem alignX="end" dir={"row"} className={"f-mt-1"}>
                <FButton
                  type="submit"
                  title={"Create Competition"}
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
