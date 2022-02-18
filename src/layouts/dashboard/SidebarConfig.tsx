import React from "react";
import {
  PATH_PUBLIC_USER,
  PATH_ADMIN,
  PATH_DASHBOARD,
} from "../../routes/paths";

const getSideMenuIcon = (name: any) => (
  <img
    src={`/ferrum/${name}.png`}
    height="22px"
    width="22px"
    max-height="22px"
    max-width="22px"
  />
);

const ICONS = {
  leaderboard: getSideMenuIcon("leaderboard_active@2x"),
  competition: getSideMenuIcon("competition_active@2x"),
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
    icon: ICONS.leaderboard,
    children: [
      { title: "Buy FRM", path: "/#" },
      { title: "Buy FRMx", path: "/#" },
    ],
  },
];

export const bridgeSidebarConfig = [
  {
    title: "Bridge",
    icon: ICONS.leaderboard,
    path: "/#",
  },
];

export const homeSidebarConfig = [
  {
    title: "Home",
    icon: ICONS.leaderboard,
    path: PATH_DASHBOARD.home,
  },
];
export const profileConfig = [
  {
    title: "Profile",
    path: PATH_DASHBOARD.general.profile,
    icon: ICONS.leaderboard,
  },
];
