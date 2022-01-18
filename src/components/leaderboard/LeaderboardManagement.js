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
  const history = useHistory();
  let token = localStorage.getItem('token');
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [leaderboardList, setLeaderboardList] = useState([]);

  useEffect(() => {
    if(query || token){
      getLeaderboardListing(token);
    }
  }, [query, token]);

  const getLeaderboardListing = (token) => {
    getAllLeaderboards(offset, limit, token)
      .then((res) => {
        if (query === "") {
          if (res?.data?.body?.leaderboards?.length) {
            const { leaderboards } = res.data.body;
            console.log(leaderboards)
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
      <div data-label="Action"> 
        <FButton
          type="button" 
          onClick={() => onDetailClick(params)}
          title={"Details"}
        ></FButton>
        </div>
      </>
  ); 

  const statusFormatter = (params) => {
    const { status } = params;
    return (
      <> 
      <div data-label="Status"> 
            <FButton title={(status === "pending" && "Pending Review") ||
            (status === "clientAction" && "Needs Client Action") ||
            sentenceCase(status)}></FButton>
        </div>
      </>
    );
  };

  const networkFormatter = (params) => {
    // <div data-label="Get Token"></div>
    for (let i = 0; i < chainIdList.length; i += 1) {
      if (chainIdList[i].id === params.chainId) {
        return <div data-label="Network"> {chainIdList[i].label}</div>;
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
    <div data-label="Public URL"> 
      <FButton
        prefix={<RiFileCopy2Fill />}
        // title="Copy" 
        className="f-mr-1"
        onClick={() => copyPublicUrl(params)}
      ></FButton>
      <FButton
        prefix={<RiMailOpenLine />}
        label="Open"
        // title="Open"
        onClick={() => openPublicUrl(params)}
      ></FButton>
      </div>
    </>
  );

  const columns = [
    {
      prop: "name",
      title: "Name", 
      cell: (params)=><div data-label="Name">{params.name}</div>
    },
    {
      prop: "chainId",
      title: "Network" ,
      cell: networkFormatter,
    },
    {
      prop: "tokenContractAddress",
      title: "Contract Address",
      cell: (params)=><div data-label="Contract Address">{params.tokenContractAddress}</div>
    },
    {
      prop: "dexUrl",
      title: "Dex Url" ,
      cell: (params)=><div data-label="Dex Url">{params.dexUrl}</div>
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
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[6,12,12]} alignX={"center"}>
              <h1>Leaderboard Management</h1> 
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6,12,12]} display={"flex"}> 
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
