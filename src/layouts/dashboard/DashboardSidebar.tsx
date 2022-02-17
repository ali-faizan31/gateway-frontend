import React, { useEffect, useState } from "react";
import { FSider, FSiderItem, FSiderSubMenuItem } from "ferrum-design-system";
import toast, { Toaster } from "react-hot-toast";
import { useSelector, RootStateOrAny } from "react-redux";
import {
  publicLeaderboardConfig,
  sidebarConfig,
  publicMultiLeaderboardConfig,
  publicCompetitionConfig,
  profileConfig,
} from "./SidebarConfig";
import { useLocation, useParams } from "react-router-dom";
import {
  PATH_PUBLIC_USER,
  PATH_ADMIN,
  PATH_DASHBOARD,
} from "../../routes/paths";
import {
  getLeaderboardByIdForPublicUser,
  getAllLeaderboards,
} from "../../_apis/LeaderboardCrud";
import {
  getCompetitionByIdForPublicUser,
  getAllCompetitions,
} from "../../_apis/CompetitionCrud";

const DashboardSidebar = () => {
  const { id }: any = useParams();
  const { pathname } = useLocation();
  let token = localStorage.getItem("token");
  const [sideConfig, setSideConfig]: any = useState([]);
  const { competitionList } = useSelector(
    (state: RootStateOrAny) => state.competition
  );
  const { leaderboardList } = useSelector(
    (state: RootStateOrAny) => state.leaderboard
  );
  const isPublic = pathname.includes("/pub");
  const isPublicLeaderboard = pathname.includes("/pub/leader");
  const isStakingLeaderboard = pathname.includes("/staking");
  const isPublicMultiLeaderboard = pathname.includes("/pub/multi/leaderboard");
  const isPublicCompetition = pathname.includes("/pub/competition");

  useEffect(() => {
    if (id !== ":id") {
      if (isPublic) {
        if (
          isStakingLeaderboard ||
          isPublicLeaderboard ||
          isPublicMultiLeaderboard
        ) {
          getPublicLeaderboard();
        }
        if (isPublicCompetition) {
          getPublicCompetition();
        }
      }
      // else {
      //   getSidebarItems();
      // }
    }
  }, [id]);

  const getPublicLeaderboard = () => {
    getLeaderboardByIdForPublicUser(id)
      .then((res: any) => {
        if (res?.data?.body?.leaderboard) {
          const { leaderboard } = res.data.body;
          let mappedData = [];
          if (isPublicMultiLeaderboard) {
            mappedData = [
              {
                title: leaderboard.name,
                _id: leaderboard._id,
                path: `/pub/multi/leaderboard/${leaderboard._id}`,
              },
            ];
          } else if (isStakingLeaderboard) {
            mappedData = [
              {
                title: leaderboard.name,
                _id: leaderboard._id,
                path: `/pub/staking/leaderboard/${leaderboard._id}`,
              },
            ];
          } else {
            mappedData = [
              {
                title: leaderboard.name,
                _id: leaderboard._id,
                path: `/pub/leaderboard/${leaderboard._id}`,
              },
            ];
          }
          updatePublicLeaderboardConfig(mappedData);
        }
      })
      .catch((e: any) => {
        if (e.response) {
          toast.error(e?.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const updatePublicLeaderboardConfig = (list: any) => {
    setSideConfig([
      { title: "Leaderboard", path: PATH_DASHBOARD.general.competition },
    ]);
    if (isPublicMultiLeaderboard) {
      setSideConfig([]);
      const np: any = [list[0]];
      publicMultiLeaderboardConfig[0].children = np;
      setSideConfig(publicMultiLeaderboardConfig);
    } else if (isPublicLeaderboard || isStakingLeaderboard) {
      setSideConfig([]);
      let np: any = publicLeaderboardConfig[0].children;
      np = [...np, list[0]];
      publicLeaderboardConfig[0].children = np;
      setSideConfig(publicLeaderboardConfig);
    }
  };

  const getPublicCompetition = () => {
    getCompetitionByIdForPublicUser(id, token)
      .then((res: any) => {
        if (res?.data?.body?.competition) {
          const { competition } = res.data.body;
          const mappedData = [
            {
              title: competition.name,
              _id: competition._id,
              path: `/pub/competition/${competition._id}`,
            },
          ];
          updatePublicCompetitionConfig(mappedData);
        }
      })
      .catch((e: any) => {
        if (e.response) {
          toast.error(e?.response?.data?.status?.message);
        } else {
          toast.error("Something went wrong. Try again later!");
        }
      });
  };

  const updatePublicCompetitionConfig = (list: any) => {
    setSideConfig([
      { title: "Competition", path: PATH_DASHBOARD.general.competition },
    ]);
    if (isPublicCompetition) {
      setSideConfig([]);
      let np: any = publicCompetitionConfig[0].children;
      np = [...np, list[0]];
      publicCompetitionConfig[0].children = np;
      setSideConfig(publicCompetitionConfig);
    }
  };

  const getSidebarItems = async () => {
    let leaderboardResponse = await getAllLeaderboards(0, 0, token);
    console.log(leaderboardResponse?.data?.body?.leaderboards);
    await mapList(leaderboardResponse?.data?.body?.leaderboards, "leaderboard");
    let competitionResponse = await getAllCompetitions(0, 0);
    await mapList(leaderboardResponse?.data?.body?.competitions, "competition");
    console.log(leaderboardResponse, competitionResponse);
  };

  const mapList = async (list: any, component: any) => {
    const mappedData: any = [];
    console.log(list);
    if (list.length) {
      list.forEach((item: any) => {
        const temp = {
          title: item.name,
          _id: item._id,
          path:
            component === "leaderboard"
              ? `/dashboard/leaderboard/${item._id}`
              : `/dashboard/competition/${item._id}`,
        };
        mappedData.push(temp);
      });
    }
    console.log(mappedData);
    // setLeaderboardList(mappedData);
    await setSideConfig(mappedData);
  };

  const renderContent = (items: any) => {
    return items.map((item: any) => (
      <FSiderItem
        to={item.path}
        title={item.title}
        prefix={item.icon}
        key={item.path}
      >
        {item.children && (
          <FSiderSubMenuItem>
            {item.children.map((subItem: any) => (
              <FSiderItem
                to={subItem.path}
                title={subItem.title}
                prefix={<img src="/ferrum/bullet.png" height={"4px"} />}
                key={subItem.path}
              ></FSiderItem>
            ))}
          </FSiderSubMenuItem>
        )}
      </FSiderItem>
    ));
  };

  return (
    <FSider>
      {((isPublicLeaderboard ||
        isStakingLeaderboard ||
        isPublicMultiLeaderboard ||
        isPublicCompetition) &&
        renderContent(sideConfig)) ||
        renderContent(sidebarConfig)}

      {renderContent(profileConfig)}
    </FSider>
  );
};

export default DashboardSidebar;
