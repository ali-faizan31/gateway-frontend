import React, { useEffect, useState } from 'react'
import { FSider, FSiderItem, FSiderSubMenuItem } from "ferrum-design-system";
import toast, { Toaster } from 'react-hot-toast';
import { useSelector, RootStateOrAny } from 'react-redux';
import { publicLeaderboardConfig, sidebarConfig, publicMultiLeaderboardConfig } from './SidebarConfig';
import { useLocation, useParams } from 'react-router-dom';
import {RiCheckboxBlankCircleFill} from "react-icons/ri";
import { getLeaderboardByIdForPublicUser } from "../../_apis/LeaderboardCrud";
import { getCompetitionByIdForPublicUser } from "../../_apis/CompetitionCrud";


const DashboardSidebar = () => {
  const { id }: any = useParams();
  const { pathname } = useLocation();
  const [sideConfig, setSideConfig]: any = useState([]);
  const { competitionList } = useSelector((state: RootStateOrAny) => state.competition);
  const { leaderboardList } = useSelector((state: RootStateOrAny) => state.leaderboard);
  const isPublicLeaderboard = pathname.includes('/pub/leader');
  const isPublicMultiLeaderboard = pathname.includes('/pub/multi/leaderboard');
  const isPublicCompetition = pathname.includes('/pub/competition');

  useEffect(() => {
    if (id !== ":id") { 
      if (isPublicLeaderboard || isPublicMultiLeaderboard) {
        getPublicLeaderboard();
      }
      if (isPublicCompetition) {
        getPublicCompetition();
      }
    }
  }, [id])

  const getPublicLeaderboard = () => { 
    getLeaderboardByIdForPublicUser(id)
      .then((res: any) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          let mappedData = [];
          if (isPublicMultiLeaderboard) {
            mappedData = [
              { title: leaderboard.name, _id: leaderboard._id, path: `/pub/multi/leaderboard/${leaderboard._id}` }
            ];
          } else {
            mappedData = [
              { title: leaderboard.name, _id: leaderboard._id, path: `/pub/leaderboard/${leaderboard._id}` }
            ];
          }
          updatePublicLeaderboardConfig(mappedData);
        }
      })
      .catch((e: any) => {
        if (e.response) {
          toast.error(e.response.data.status.message);
        } else {
          toast.error('Something went wrong. Try again later!');
        }
      });
  };

  const updatePublicLeaderboardConfig = (list: any) => {
    if (isPublicMultiLeaderboard) {
      setSideConfig([])
      const np: any = [list[0]];
      publicMultiLeaderboardConfig[0].children = np;
      setSideConfig(publicMultiLeaderboardConfig)
    } else if (isPublicLeaderboard) {
      setSideConfig([])
      let np: any = publicLeaderboardConfig[0].children;
      np = [...np, list[0]];
      publicLeaderboardConfig[0].children = np;
      setSideConfig(publicLeaderboardConfig);
    }
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id)
      .then((res: any) => {
        if (res?.data?.body?.competition) {
          const { competition } = res.data.body;
          const { leaderboard } = res.data.body;
          const mappedData = [
            { title: competition.name, _id: competition._id, path: `/pub/competition/${competition._id}` }
          ];
          // updatePublicCompetitionConfig(mappedData);
        }
      })
      .catch((e: any) => {
        if (e.response) {
          toast.error(e.response.data.status.message);
        } else {
          toast.error('Something went wrong. Try again later!');
        }
      });
  };


  const renderContent = (items: any) => { 
    return items.map((item: any) => (
      <FSiderItem to={item.path} title={item.title} prefix={item.icon} key={item.path}>
        {item.children &&
          <FSiderSubMenuItem>
            {item.children.map((subItem: any) => (
              <FSiderItem to={subItem.path} title={subItem.title} prefix={ <img src="/ferrum/bullet.png" height={"4px"}/>} key={subItem.path}></FSiderItem>
            ))}
          </FSiderSubMenuItem>
        }
      </FSiderItem>
    ))
  }

  return (
    <FSider>
      {(isPublicLeaderboard && renderContent(sideConfig) ||
        (isPublicMultiLeaderboard && renderContent(sideConfig) ||
          // (isPublicCompetition && renderContent(publicCompetitionConfig) || (
          renderContent(sidebarConfig)))}
    </FSider>
  )
}

export default DashboardSidebar
