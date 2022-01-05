import React, { useEffect, useState } from "react";
// material
import { sentenceCase, paramCase } from "change-case";
import { PATH_ADMIN, PATH_DASHBOARD } from "../../routes/paths";
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
import { RiFileCopy2Fill, RiMailOpenLine } from "react-icons/ri";
import { getAllLeaderboards } from "../../_apis/LeaderboardCrud";
import { chainIdList } from "./LeaderboardHelper";
import { useHistory } from "react-router-dom";

const LeaderboardManagement = () => {
  const limit = 10;
  const history = useHistory()
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [leaderboardList, setLeaderboardList] = useState([]);

  useEffect(() => {
    getLeaderboardListing();
  }, [query]);

  const getLeaderboardListing = () => {
    getAllLeaderboards(offset, limit)
      .then((res) => {
        if (query === "") {
          if (res?.data?.body?.leaderboards?.length) {
            const { leaderboards } = res.data.body;
            setLeaderboardList(leaderboards);
          }
        } else if (query) {
          if (res?.data?.body?.leaderboards?.length) {
            const { leaderboards } = res.data.body;
            const tempData = leaderboards.map(
              (x) => x.name.toLowerCase().includes(query.toLowerCase()) && x
            );
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
    history.push(`${PATH_DASHBOARD.general.leaderboard}/${row._id}`);
  };

  const openCreateLeaderboard = () => { 
    history.push(PATH_DASHBOARD.general.createLeaderboard);
  };

  const actionFormatter = (params) => (
      <>
        <FButton
          type="button" 
          onClick={() => onDetailClick(params)}
          title={"Details"}
        ></FButton>
      </>
  ); 

  const statusFormatter = (params) => {
    const { status } = params;
    return (
      <> 
            <FButton title={(status === "pending" && "Pending Review") ||
            (status === "clientAction" && "Needs Client Action") ||
            sentenceCase(status)}></FButton>
        
      </>
    );
  };

  const networkFormatter = (params) => {
    for (let i = 0; i < chainIdList.length; i += 1) {
      if (chainIdList[i].id === params.chainId) {
        return chainIdList[i].label;
      }
    }
  };

  const copyPublicUrl = (row) => {
    const publicUrl = `${window.location.origin}/pub/leaderboard/${row._id}`;
    const { clipboard } = navigator;

    if (clipboard !== undefined && clipboard !== "undefined") {
      navigator.clipboard.writeText(publicUrl).then(
        () => {
          toast.success("Copied!")
        },
        (err) => {
          toast.error(err)
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
      <FButton
        prefix={<RiFileCopy2Fill />}
        title="Copy" 
        onClick={() => copyPublicUrl(params)}
      ></FButton>
      <FButton
        prefix={<RiMailOpenLine />}
        label="Open"
        onClick={() => openPublicUrl(params)}
      ></FButton>
    </>
  );

  const columns = [
    {
      prop: "name",
      title: "Name", 
    },
    {
      prop: "chainId",
      title: "Network" ,
      cell: networkFormatter,
    },
    {
      prop: "tokenContractAddress",
      title: "Contract Address" 
    },
    {
      prop: "dexUrl",
      title: "Dex Url" 
    },
    {
      prop: "status",
      title: "Status" ,
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
      cell: publicUrlActions,
    },
  ];

  return (
    <>
      <div>
        <Toaster />
      </div>
      <FContainer type="fluid">
        <FContainer>
          <FGrid size={2} className={"f-mt-1 f-mb-1"}>
            <FGridItem>
              <h1>Leaderboard Management</h1> 
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"}>
              <FInputTextField
                label="Search"
                placeholder="Leaderboard name"
                variant="outlined"
                value={query}
                type="search"
                onChange={(e) => setQuery(e.target.value)} 
              />
               <FButton
                type="button"
                className={"f-ml-1"}
                onClick={openCreateLeaderboard}
                title="Create Leaderboard"
              ></FButton>
            </FGridItem> 
          </FGrid>
          <FTable>
            <Datatable
              tableBody={leaderboardList}
              tableHeaders={columns}
              rowsPerPage={10}
              tableClass="striped hover responsive"
            />
          </FTable>
        </FContainer>
      </FContainer>
    </>
  );
};

export default LeaderboardManagement;
