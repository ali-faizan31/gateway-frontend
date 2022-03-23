import React, { useEffect, useState } from "react";
// material
import { sentenceCase, paramCase } from "change-case";
import { PATH_ADMIN, PATH_DASHBOARD } from "../../routes/paths";
import toast, { Toaster } from "react-hot-toast";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ClipLoader from "react-spinners/ClipLoader";
import { FTable, FContainer, FButton, FGrid, FInputText, FGridItem, FDialog, FItem, FInputRadio, FTruncateText, FTypo } from "ferrum-design-system";
import Datatable from "react-bs-datatable";
import { RiFileCopy2Fill, RiMailOpenLine, RiEdit2Fill } from "react-icons/ri";
import { getAllLeaderboards, updateLeaderboardStatusById } from "../../_apis/LeaderboardCrud";
import { chainIdList } from "./LeaderboardHelper";
import { useHistory } from "react-router-dom";
import { TOKEN_TAG } from "../../utils/const.utils";

const LeaderboardManagement = () => {
  const limit = 10;
  const history = useHistory();
  let token = localStorage.getItem(TOKEN_TAG);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [leaderboardList, setLeaderboardList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [statusValue, setStatusValue] = useState("");
  const [selectedLeaderboardData, setSelectedLeaderboardData] = useState({});

  useEffect(() => {
    if (query || token) {
      getLeaderboardListing();
    }
  }, [query, token]);

  const getLeaderboardListing = () => {
    getAllLeaderboards(offset, limit, token)
      .then((res) => {
        if (query === "") {
          if (res?.data?.body?.leaderboards?.length) {
            const { leaderboards } = res.data.body;
            console.log(leaderboards);
            setLeaderboardList(leaderboards);
          }
        } else if (query) {
          if (res?.data?.body?.leaderboards?.length) {
            const { leaderboards } = res.data.body;
            const tempData = leaderboards.map((x) => x.name.toLowerCase().includes(query.toLowerCase()) && x);
            setLeaderboardList(tempData.filter((x) => x && x));
          }
        }
      })
      .catch((e) => {
        if (e.response) {
          toast.error(e.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const onDetailClick = (row) => {
    history.push(`${PATH_DASHBOARD.general.leaderboardForDashboard}/${row._id}`);
  };

  const openCreateLeaderboard = () => {
    history.push(PATH_DASHBOARD.general.createLeaderboard);
  };

  const actionFormatter = (params) => (
    <>
      <div data-label="Action">
        <FButton type="button" onClick={() => onDetailClick(params)} title={"Details"}></FButton>
      </div>
    </>
  );

  const statusFormatter = (params) => {
    const { status } = params;
    return (
      <>
        <div data-label="Status" className="justify-content-space-between">
          <FButton
            title={
              (status === "pending" && "Pending Review") || (status === "clientAction" && "Needs Client Action") || sentenceCase(status)
            }></FButton>
          <FButton prefix={<RiEdit2Fill />} className="f-ml-1" onClick={() => onEditStatusClick(params)}></FButton>
        </div>
      </>
    );
  };

  const onEditStatusClick = (params) => {
    setSelectedLeaderboardData(params);
    setShowDialog(true);
  };

  const onCancel = () => {
    reset();
    setShowDialog(false);
  };

  const initialValues = {
    status: "",
  };

  const statusSchema = Yup.object().shape({
    status: Yup.string().required("Status is required"),
  });

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(statusSchema),
  });

  const onSubmit = (values) => {
    if (typeof values.status === "string") {
      values.status = statusValue;
      updateLeaderboardStatusById(selectedLeaderboardData._id, values, token)
        .then((res) => {
          setShowDialog(false);
          reset();
          getLeaderboardListing();
        })
        .catch((e) => {
          console.log(e);
          setShowDialog(false);
          if (e.response) {
            toast.error(e?.response?.data?.status?.message);
          } else {
            toast.error(`Something went wrong. Try again later! ${e}`);
          }
        });
    }
  };

  const networkFormatter = (params) => {
    let network;
    let chainId = params?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.network?.chainId;
    console.log(params);
    for (let i = 0; i < chainIdList.length; i += 1) {
      if (chainIdList[i].id === chainId) {
        network = chainIdList[i].label;
      }
    }
    return <div data-label="Network"> {network}</div>;
  };

  const copyPublicUrl = (row) => {
    const publicUrl = `${window.location.origin}/pub/leaderboard/${row._id}`;
    const { clipboard } = navigator;

    if (clipboard !== undefined && clipboard !== "undefined") {
      navigator.clipboard.writeText(publicUrl).then(
        () => {
          toast.success("Copied!");
        },
        (err) => {
          toast.error(err);
        }
      );
    }
  };

  const openPublicUrl = (row) => {
    const publicUrl = `${window.location.origin}/pub/leaderboard/${row._id}`;
    window.open(publicUrl, "_blank");
  };

  const publicUrlActions = (params) => (
    <>
      <div data-label="Public URL">
        <FItem display={"flex"}>
          <FButton
            prefix={<RiFileCopy2Fill />}
            // title="Copy"
            className="f-mr-1"
            onClick={() => copyPublicUrl(params)}></FButton>
          <FButton prefix={<RiMailOpenLine />} label="Open" className={"f-mt--2"} onClick={() => openPublicUrl(params)}></FButton>
        </FItem>
      </div>
    </>
  );

  const columns = [
    {
      prop: "name",
      title: "Name",
      cell: (params) => <div data-label="Name">{params.name}</div>,
    },
    {
      prop: "chainId",
      title: "Network",
      cell: networkFormatter,
    },
    {
      prop: "tokenContractAddress",
      title: "Contract Address",
      cell: (params) => (
        <FTypo data-label="Contract Address" truncate={{ truncateLength: 10, truncatePosition: "center" }}>
          {params?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.tokenContractAddress}
        </FTypo>
      ),
    },
    {
      prop: "dexUrl",
      title: "Dex Url",
      cell: (params) => (
        <div data-label="Dex Url">{params?.leaderboardCurrencyAddressesByNetwork[0]?.currencyAddressesByNetwork?.networkDex?.dex?.url}</div>
      ),
    },
    {
      prop: "status",
      title: "Status",
      cell: statusFormatter,
    },
    {
      prop: "action",
      title: "Action",
      cell: actionFormatter,
    },
    {
      prop: "publicUrl",
      title: "Public URL",
      // cellProps: {
      //   style: {  width:"200px" }
      // },
      cell: publicUrlActions,
    },
  ];

  return (
    <>
      <Toaster />
      <FContainer type="fluid">
        <FContainer>
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[6, 12, 12]} dir={"row"} alignX="start" alignY={"end"}>
              <h1>Leaderboard Management</h1>
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6, 12, 12]} display={"flex"}>
              <FInputText
                label="Search"
                placeholder="Leaderboard name"
                variant="outlined"
                value={query}
                type="search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <FButton type="button" className={"f-ml-1"} onClick={openCreateLeaderboard} title="Create Leaderboard"></FButton>
            </FGridItem>
          </FGrid>
          <FTable>
            <Datatable tableBody={leaderboardList} tableHeaders={columns} rowsPerPage={10} tableClass="striped hover responsive" />
          </FTable>
        </FContainer>

        <FDialog show={showDialog} size={"medium"} onHide={onCancel} title={"Update Leaderboard Status"} className="connect-wallet-dialog ">
          <FItem className={"f-mt-2"}>Select Status of Leaderboard</FItem>
          <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FInputRadio
              display={"inline"}
              label="Pending Review"
              id={"pending"}
              name={"status"}
              className={"f-mt-2 f-mb-2"}
              register={register}
              onChange={(e) => setStatusValue(e.target.id)}
              error={errors["status"]?.message ? errors["status"]?.message : ""}
            />
            <FInputRadio
              display={"inline"}
              label="Approve"
              id={"approved"}
              name={"status"}
              className={"f-mt-2 f-mb-2"}
              register={register}
              onChange={(e) => setStatusValue(e.target.id)}
              error={errors["status"]?.message ? errors["status"]?.message : ""}
            />
            <FInputRadio
              display={"inline"}
              label="Needs Client Action"
              id={"clientAction"}
              name={"status"}
              className={"f-mt-2 f-mb-2"}
              register={register}
              onChange={(e) => setStatusValue(e.target.id)}
              error={errors["status"]?.message ? errors["status"]?.message : ""}
            />
            <FInputRadio
              display={"inline"}
              label="Hold"
              id={"hold"}
              name={"status"}
              className={"f-mt-2 f-mb-2"}
              register={register}
              onChange={(e) => setStatusValue(e.target.id)}
              error={errors["status"]?.message ? errors["status"]?.message : ""}
            />
            <FInputRadio
              display={"inline"}
              label="Cancel"
              id={"cancelled"}
              name={"status"}
              className={"f-mt-2 f-mb-2"}
              register={register}
              onChange={(e) => setStatusValue(e.target.id)}
              error={errors["status"]?.message ? errors["status"]?.message : ""}
            />
            <FGrid>
              <FGridItem alignX="end" dir={"row"} className={"f-mt-1"}>
                <FButton
                  type="submit"
                  title={"Update Status"}
                  onClick={onSubmit}
                  postfix={isSubmitting && <ClipLoader color="#fff" size={20} />}></FButton>
                <FButton type="button" className={"f-ml-1"} title={"Cancel"} onClick={onCancel}></FButton>
              </FGridItem>
            </FGrid>
          </form>
        </FDialog>
      </FContainer>
    </>
  );
};

export default LeaderboardManagement;
