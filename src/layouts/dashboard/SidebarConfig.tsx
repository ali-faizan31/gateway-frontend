import React from "react";
import {
  PATH_PUBLIC_USER,
  // PATH_ADMIN,
  PATH_DASHBOARD,
} from "../../routes/paths";
import { cFRMx_Competition_Details, cFRM_Competition_Details, FRM_FRMx_leaderboard_Details } from "../../utils/const.utils";

const getSideMenuIcon = (name: any) => (
  <img
    alt="side menu item"
    src={`/ferrum/${name}`}
    height="22px"
    width="22px"
    max-height="22px"
    max-width="22px"
  />
);

export const getCurrencyIcon = (src: any) => (
  <img
    alt="side menu item"
    src={`${src}`}
    height="22px"
    width="22px"
    max-height="22px"
    max-width="22px"
  />
);

export const ICONS = {
  leaderboard: getSideMenuIcon("Leaderboard.svg"),
  competition: getSideMenuIcon("Competition.svg"),
  home: getSideMenuIcon("Home.svg"),
  bridge: getSideMenuIcon("Bridge.svg"),
  getFrmAndFrmx: getSideMenuIcon("FRMx.svg"),
  crucible: getSideMenuIcon("Crucible.svg"),
};

export const GET_ICONS = (element: any) => {
  switch (element) {
    case "Leaderboard":
      return getSideMenuIcon(`${element}.svg`);
    case "Competition":
      return getSideMenuIcon(`${element}.svg`);
    case "Bridge":
      return getSideMenuIcon(`${element}.svg`);
    case "Crucible":
      return getSideMenuIcon(`${element}.svg`);
    case "Token":
      return getSideMenuIcon(`FRMx.svg`);
    default:
      return "";
  }
};

export const GET_PATHS = (element: any, id: any, count: any = null) => {
  switch (element) {
    case "Leaderboard":
      return count === 1
        ? `${PATH_PUBLIC_USER.leaderboard.root}/${id}`
        : count === 2
        ? `${PATH_PUBLIC_USER.multiLeaderboard.root}/${id}`
        : "";
    case "Competition":
      return `${PATH_PUBLIC_USER.competition.root}/${id}`;
    case "Bridge":
      return PATH_DASHBOARD.bridge;
    case "Crucible":
      return PATH_DASHBOARD.crucible.intro;
    default:
      return "/#";
  }
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

export const orgLeaderboardAndCompetitionSidebarConfig = [
  {
    title: "Leaderboard",
    path: PATH_DASHBOARD.root,
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
      {
        title: `${FRM_FRMx_leaderboard_Details.name}`,
        path: `${PATH_DASHBOARD.general.multiLeaderboardForDashboard}/${FRM_FRMx_leaderboard_Details.id}`,
      },
    ],
  },
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
      {
        title: `${cFRM_Competition_Details.name}`,
        path: `${PATH_DASHBOARD.general.competition}/${cFRM_Competition_Details.id}`,
      },
      {
        title: `${cFRMx_Competition_Details.name}`,
        path: `${PATH_DASHBOARD.general.competition}/${cFRMx_Competition_Details.id}`,
      }
    ],
  }, 
];

export const publicLeaderboardAndCompetitionSidebarConfig = [
  {
    title: "Leaderboard",
    path: PATH_PUBLIC_USER.root,
    icon: ICONS.leaderboard,
    children: [
      {
        title: `${FRM_FRMx_leaderboard_Details.name}`,
        path: `${PATH_PUBLIC_USER.multiLeaderboard.root}/${FRM_FRMx_leaderboard_Details.id}`,
      },
    ],
  },
  {
    title: "Competition",
    path: PATH_DASHBOARD.general.competition,
    icon: ICONS.competition,
    children: [
      {
        title: `${cFRM_Competition_Details.name}`,
        path: `${PATH_PUBLIC_USER.competition.root}/${cFRM_Competition_Details.id}`,
      },
      {
        title: `${cFRMx_Competition_Details.name}`,
        path: `${PATH_PUBLIC_USER.competition.root}/${cFRMx_Competition_Details.id}`,
      }
    ],
  }
];

export const tokensSidebarConfig = [
  {
    title: "Get FRM / FRMx",
    icon: ICONS.getFrmAndFrmx,
    children: [
      { title: "Buy FRM", path: PATH_DASHBOARD.token.buyFRM, target: "_blank" },
      {
        title: "Buy FRMx",
        path: PATH_DASHBOARD.token.buyFRMx,
        target: "_blank",
      },
    ],
  },
];

export const bridgeSidebarConfig = [
  {
    title: "Bridge",
    icon: ICONS.bridge,
    path: PATH_DASHBOARD.bridge,
    target: "_blank",
  },
];

export const homeSidebarConfig = [
  {
    title: "Home",
    icon: ICONS.home,
    path: `${PATH_PUBLIC_USER.competition.root}/${cFRMx_Competition_Details.id}`,
  },
];

export const profileConfig = [
  {
    title: "Profile",
    path: PATH_DASHBOARD.general.profile,
    icon: ICONS.leaderboard,
  },
];

export const crucibleConfig = [
  {
    title: "Crucible",
    path: PATH_DASHBOARD.crucible.index,
    icon: ICONS.crucible,
  },
];
