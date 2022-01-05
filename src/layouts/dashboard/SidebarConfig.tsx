import React from "react";
import { PATH_PUBLIC_USER, PATH_ADMIN, PATH_DASHBOARD } from "../../routes/paths";

const getSideMenuIcon = (name: any) => (
    <img src={`/ferrum/${name}.png`} height="22px" width="22px" max-height="22px" max-width="22px" />
);

const ICONS = {
    leaderboard: getSideMenuIcon('leaderboard_active@2x'),
    competition: getSideMenuIcon('competition_active@2x'),
};

export const publicLeaderboardConfig = [
    {
        title: 'Leaderboard',
        path: PATH_PUBLIC_USER.leaderboard.root,
        icon: ICONS.leaderboard,
        children: []
    }
]

export const publicMultiLeaderboardConfig = [
    {
        title: 'Leaderboard',
        path: PATH_PUBLIC_USER.multiLeaderboard.root,
        icon: ICONS.leaderboard,
        children: []
    }
]

export const sidebarConfig = [
    {
        title: 'Leaderboard',
        path: PATH_DASHBOARD.general.leaderboard,
        icon: ICONS.leaderboard,
        children: [
            { title: 'Leaderboard Management', path: PATH_DASHBOARD.general.leaderboardManagement },
            { title: 'Create Leaderboard', path: PATH_DASHBOARD.general.createLeaderboard },
        ]
    },
    {
        title: 'Competitions',
        path: PATH_DASHBOARD.general.competition,
        icon: ICONS.competition,
        children: [
            { title: 'Competition Management', path: PATH_ADMIN.competition.management },
            { title: 'Create Competition', path: PATH_ADMIN.competition.create }
        ]
    }
] 