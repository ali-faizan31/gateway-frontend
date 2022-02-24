import React from "react";
import {
  PATH_PUBLIC_USER,
  PATH_ADMIN,
  PATH_DASHBOARD,
} from "../../routes/paths";

const getSideMenuIcon = (name: any) => (
  <img src={`/ferrum/${name}`} height="22px" width="22px" max-height="22px" max-width="22px" />
);

const ICONS = {
  leaderboard: getSideMenuIcon("Leaderboard.svg"),
  competition: getSideMenuIcon("Competition.svg"),
  home: getSideMenuIcon("Home.svg"),
  bridge: getSideMenuIcon("Bridge.svg"),
  getFrmAndFrmx: getSideMenuIcon("FRMx.svg"),
};

export const publicCompetitionConfig = [
  {
    title: "Competition",
    path: PATH_PUBLIC_USER.competition.root,
    icon: ICONS.competition,
    children: [],
  },
];

export const publicLeaderboardConfig = [
  {
    title: "Leaderboard",
    path: PATH_PUBLIC_USER.leaderboard.root,
    icon: ICONS.leaderboard,
    children: [],
  },
];

export const publicMultiLeaderboardConfig = [
  {
    title: "Leaderboard",
    path: PATH_PUBLIC_USER.multiLeaderboard.root,
    icon: ICONS.leaderboard,
    children: [],
  },
];

export const sidebarConfig = [
  {
    title: "Competition",
    path: PATH_DASHBOARD.general.competition,
    icon: ICONS.competition,
    children: [
      {
        title: "Create Competition",
        path: PATH_DASHBOARD.general.createCompetition,
      },
      {
        title: "Competition Management",
        path: PATH_DASHBOARD.general.competitionManagement,
      },
    ],
  },
  {
    title: "Leaderboard",
    path: PATH_DASHBOARD.general.leaderboard,
    icon: ICONS.leaderboard,
    children: [
      {
        title: "Create Leaderboard",
        path: PATH_DASHBOARD.general.createLeaderboard,
      },
      {
        title: "Leaderboard Management",
        path: PATH_DASHBOARD.general.leaderboardManagement,
      },
    ],
  },
];

export const communityLeaderboardSidebarConfig = [
  {
    title: "Leaderboard",
    path: PATH_DASHBOARD.general.leaderboard,
    icon: ICONS.leaderboard,
    children: [
      {
        title: "FRM & FRMx BSC Leaderboard",
        path: PATH_DASHBOARD.general.leaderboard,
      },
    ],
  },
];

export const tokensSidebarConfig = [
  {
    title: "Get FRM / FRMx",
    icon: ICONS.getFrmAndFrmx,
    children: [
      { title: "Buy FRM", path: PATH_DASHBOARD.token.buyFRM, target: "_blank" },
      { title: "Buy FRMx", path: PATH_DASHBOARD.token.buyFRMx, target: "_blank" },
    ],
  },
];

export const bridgeSidebarConfig = [
  {
    title: "Bridge",
    icon: ICONS.bridge,
    path: PATH_DASHBOARD.bridge,
    target: "_blank"
  },
];

export const homeSidebarConfig = [
  {
    title: "Home",
    icon: ICONS.home,
    path: PATH_DASHBOARD.general.leaderboard,
  },
];
export const profileConfig = [
  {
    title: "Profile",
    path: PATH_DASHBOARD.general.profile,
    icon: ICONS.leaderboard 
  },
];
