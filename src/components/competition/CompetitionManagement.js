import React, { useEffect, useState } from 'react';
import { sentenceCase, paramCase } from "change-case"; 
import toast, { Toaster } from "react-hot-toast";
import {
  FTable,
  FContainer,
  FButton,
  FGrid,
  FInputTextField,
  FGridItem,
  FDialog
} from "ferrum-design-system";
import { RiFileCopy2Fill, RiMailOpenLine, RiEdit2Fill } from "react-icons/ri";
import Datatable from "react-bs-datatable";
import { useHistory } from "react-router-dom"; 
import moment from 'moment';
import { PATH_ADMIN, PATH_DASHBOARD } from '../../routes/paths';
import { getAllCompetitions } from '../../_apis/CompetitionCrud';


const CompetitionManagement = () => { 
  const history = useHistory();
  const limit = 10;
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [competitionList, setCompetitionList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    getCompetitionListing();
  }, [query]);

  const statusFormatter = (params) => {
    const { status } = params; 
    return (
      <>   <div data-label="Status"  className='label-column'>  
        <FButton title={sentenceCase(status)}></FButton> 
        {/* <p className='custom-icon'><RiEdit2Fill /></p> */}
        <FButton
        prefix={<RiEdit2Fill />} 
        className="f-ml-1"
        onClick={() => setShowDialog(true)}
      ></FButton>
        </div> 
      </>
    );
  };

  const actionFormatter = (params) => {
    const wesehi = 10;
    return (
      <>
      <div data-label="Action"> 
        <FButton type="button" title={" Details"} disabled={true} onClick={() => onDetailClick(params)}></FButton>
        </div>
      </>
    );
  };

  const startDateFormatter = (params) => {
    let date = ''; 
    if (params?.startDate) {
      date = moment((params.startDate)).utc().format('YYYY-MM-DD | HH:mm');
    } 
    return  <div data-label="Start Date">{date}</div> 
  };

  const endDateFormatter = (params) => {
    let date = ''; 
    if (params?.endDate) {
       date = moment((params.endDate)).utc().format('YYYY-MM-DD | HH:mm');
    }  
    return  <div data-label="Date">{date} </div>
  };

  const copyPublicUrl = (row) => {
    const publicUrl = `${window.location.origin}/pub/competition/${row._id}`;
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
    const publicUrl = `${window.location.origin}/pub/competition/${row._id}`;
    window.open(publicUrl, "_blank");
  };

  const publicUrlActions = (params) => (
    <>
    <div data-label="Public URL"> 
      <FButton
        prefix={<RiFileCopy2Fill />} 
        className="f-mr-1"
        onClick={() => copyPublicUrl(params)}
      ></FButton>
      <FButton
        prefix={<RiMailOpenLine />}
        label="Open" 
        className={"f-mt--2"}
        onClick={() => openPublicUrl(params)}
      ></FButton>
      </div>
    </>
  );


  const columns = [
    { prop: 'name', title: 'Name', cell: (params)=><div data-label="Name">{params.name}</div>},
    {
      prop: 'startDate',
      title: 'Start Date', 
      cell: startDateFormatter
    },
    {
      prop: 'endDate',
      title: 'End Date', 
      cell: endDateFormatter
    },
    { prop: 'status', title: 'Status', cell: statusFormatter },
    { prop: 'action', title: 'Action', cell: actionFormatter },
    { prop: "publicUrl", title: "Public URL", cell: publicUrlActions},  
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
          toast.error(e.response.data.status.message);
        } else {
          toast.error('Something went wrong. Try again later!');
        }
      });
  };

  const onDetailClick = (row) => {  
    history.push(`${PATH_DASHBOARD.general.competition}/${row._id}`);
  };

  const openCreateCompetition = () => {
    history.push(PATH_DASHBOARD.general.createCompetition);
  };

  return (
    <>
     <div>
        <Toaster />
      </div>
      <FContainer type="fluid">
        <FContainer>
          <FGrid className={"f-mt-1 f-mb-1"}>
            <FGridItem size={[6,12,12]} alignX={"center"}>
              <h1>Competition Management</h1> 
            </FGridItem>
            <FGridItem alignX={"end"} alignY={"end"} dir={"row"} size={[6,12,12]} display={"flex"}> 
              <FInputTextField
                    id="outlined-basic"
                    label="Search"
                    placeholder="Competition name"
                    variant="outlined"
                    value={query}
                    type="search"
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ width: '100%' }}
                  /> 
                <FButton type="button" className="f-ml-1" onClick={openCreateCompetition} title="Create Competition"></FButton>
                </FGridItem> 
          </FGrid>
          <FTable>
            <Datatable
              tableBody={competitionList}
              tableHeaders={columns}
              rowsPerPage={10}
              tableClass="striped hover responsive"
            />
          </FTable>
        </FContainer>

        <FDialog show={showDialog} size={"small"} className={"custom-label"} onHide={()=>setShowDialog(false)}>
          jhgfg 
          hvgb
        </FDialog>
      </FContainer>
    </>
  );
};

export default CompetitionManagement;
