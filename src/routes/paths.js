// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_ADMIN = "/admin";
const ROOTS_PUBLIC_USER = "/pub";

// ----------------------------------------------------------------------
export const PATH_AUTH = {
  root: ROOTS_AUTH,
  communityLogin: path(ROOTS_AUTH, "/login"),
  communityRegister: path(ROOTS_AUTH, "/register"),
  orgLogin: path(ROOTS_AUTH, "/org/login"),
  orgRegister: path(ROOTS_AUTH, "/org/register"),
  // orgVerify: path(ROOTS_AUTH, '/org/verify'),
  // orgResendCode: path(ROOTS_AUTH, '/org/resend-code'),
  // communityVerify: path(ROOTS_AUTH, '/verify'),
  // communityResendCode: path(ROOTS_AUTH, '/resend-code'),
  emailVerify: path(ROOTS_AUTH, "/verify"),
  emailResendCode: path(ROOTS_AUTH, "/resend-code"),
  forgotPassword: path(ROOTS_AUTH, "/forgot-password"),
  resetPassword: path(ROOTS_AUTH, "/reset-password/:token"),
  walletAuthentication: path(ROOTS_AUTH, "/wallet-authentication"),
};

export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  leaderboard: {
    create: path(ROOTS_ADMIN, "/leaderboard/create"),
    management: path(ROOTS_ADMIN, "/leaderboard/management"),
  },
  competition: {
    create: path(ROOTS_ADMIN, "/competition/create"),
    management: path(ROOTS_ADMIN, "/competition/management"),
  },
};

export const PATH_PUBLIC_USER = {
  root: ROOTS_PUBLIC_USER,
  leaderboard: {
    root: path(ROOTS_PUBLIC_USER, "/leaderboard"),
    detailLeaderBoardById: path(ROOTS_PUBLIC_USER, "/leaderboard:id"),
  },
  multiLeaderboard: {
    root: path(ROOTS_PUBLIC_USER, "/multi/leaderboard"),
    detailLeaderBoardById: path(ROOTS_PUBLIC_USER, "/multi/leaderboard/:id"),
    detailLeaderBoardByProvidedId: path(
      ROOTS_PUBLIC_USER,
      "/multi/leaderboard/61b6d48337f5125acbbfddeb"
    ),
  },
  competition: {
    root: path(ROOTS_PUBLIC_USER, "/competition"),
    detailCompetitionById: path(ROOTS_PUBLIC_USER, "/competition:id"),
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    leaderboard: "/pub/multi/leaderboard/61b6d48337f5125acbbfddeb",
    leaderboardForDashboard: "/dashboard/multi/leaderboard",
    createLeaderboard: path(ROOTS_DASHBOARD, "/leaderboard/create"),
    leaderboardManagement: path(ROOTS_DASHBOARD, "/leaderboard/management"),
    detailLeaderBoardById: path(ROOTS_DASHBOARD, "/leaderboard:id"),
    competition: path(ROOTS_DASHBOARD, "/competition"),
    createCompetition: path(ROOTS_DASHBOARD, "/competition/create"),
    competitionManagement: path(ROOTS_DASHBOARD, "/competition/management"),
    detailCompetitionById: path(ROOTS_DASHBOARD, "/competition:id"),
    multiLeaderBoardByProvidedId: path(
      ROOTS_DASHBOARD,
      "/multi/leaderboard/61b6d48337f5125acbbfddeb"
    ),
    profile: path(ROOTS_DASHBOARD, "/profile"),
  },
  token: {
    buyFRM:
      "https://app.apeswap.finance/swap?inputCurrency=BNB&outputCurrency=0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc&exactField=output&exactAmount=0",
    buyFRMx:
      "https://app.apeswap.finance/swap?inputCurrency=BNB&outputCurrency=0x8523518001ad5d24b2a04e8729743c0643a316c0&exactField=output&exactAmount=0",
  },
  bridge: "https://bridge.ferrum.network/",
  home: "/home",
  crucible: {
    index: path(ROOTS_DASHBOARD, "/crucible"),
    getStarted: path(ROOTS_DASHBOARD, "/crucible/get-started"),
    steps: path(ROOTS_DASHBOARD, "/crucible/steps"),
    congrats: path(ROOTS_DASHBOARD, "/crucible/congrats"),
    intro: path(ROOTS_DASHBOARD, "/crucible/intro"),
    mintAndStake: path(ROOTS_DASHBOARD, "/crucible/mint"),
    manage: path(ROOTS_DASHBOARD, "/crucible/manage"),
    deployer: path(ROOTS_DASHBOARD, "/crucible/deployer"),
    public: path(ROOTS_DASHBOARD, "/crucible/public"),
    cFRM: {
      introduction: path(ROOTS_DASHBOARD, "/crucible/cFRM/introduction"),
      manage: path(ROOTS_DASHBOARD, "/crucible/cFRM/manage"),
      mint: {
        checks: path(ROOTS_DASHBOARD, "/crucible/cFRM/mint/steps"),
        mint: path(ROOTS_DASHBOARD, "/crucible/cFRM/mint/deposit"),
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM/mint/success"),
        steps: path(ROOTS_DASHBOARD, "/crucible/cFRM/mint/add-liquidity"),
      },
      stake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM/stake/success"),
        stake: path(ROOTS_DASHBOARD, "/crucible/cFRM/stake/deposit"),
      },
      unstake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM/unstake/success"),
        unstake: path(ROOTS_DASHBOARD, "/crucible/cFRM/unstake/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRM/unstake/add-liquidity" ),
      },
      withdraw: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM/withdraw/success"),
        withdraw: path(ROOTS_DASHBOARD, "/crucible/cFRM/withdraw/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRM/withdraw/add-liquidity" ),
      },
      unwrap: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM/unwrap/success"),
        unwrap: path(ROOTS_DASHBOARD, "/crucible/cFRM/unwrap/deposit"), 
      },
      liquidity : path(ROOTS_DASHBOARD, "/crucible/cFRM/add-liquidity"),
    },
    cFRMx: {
      introduction: path(ROOTS_DASHBOARD, "/crucible/cFRMx/introduction"),
      manage: path(ROOTS_DASHBOARD, "/crucible/cFRMx/manage"),
      mint: {
        checks: path(ROOTS_DASHBOARD, "/crucible/cFRMx/mint/steps"),
        mint: path(ROOTS_DASHBOARD, "/crucible/cFRMx/mint/deposit"),
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx/mint/success"),
        steps: path(ROOTS_DASHBOARD, "/crucible/cFRMx/mint/add-liquidity"),
      },
      stake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx/stake/success"),
        stake: path(ROOTS_DASHBOARD, "/crucible/cFRMx/stake/deposit"),
      },
      unstake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx/unstake/success"),
        unstake: path(ROOTS_DASHBOARD, "/crucible/cFRMx/unstake/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRMx/unstake/add-liquidity" ),
      },
      withdraw: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx/withdraw/success"),
        withdraw: path(ROOTS_DASHBOARD, "/crucible/cFRMx/withdraw/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRMx/withdraw/add-liquidity" ),
      },
      unwrap: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx/unwrap/success"),
        unwrap: path(ROOTS_DASHBOARD, "/crucible/cFRMx/unwrap/deposit"), 
      },
      liquidity : path(ROOTS_DASHBOARD, "/crucible/cFRMx/add-liquidity"),
    },
    cFRM_BNB: {
      introduction: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/introduction"),
      manage: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/manage"),
      mint: {
        steps: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/mint/add-liquidity"),
        mint: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/mint/deposit"),
      },
      stake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/stake/success"),
        stake: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/stake/deposit"),
      },
      unstake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/unstake/success"),
        unstake: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/unstake/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRM-BNB/unstake/remove-liquidity" ),
      },
      withdraw: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/withdraw/success"),
        withdraw: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/withdraw/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRM-BNB/withdraw/add-liquidity" ),
      },
      unwrap: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/unwrap/success"),
        unwrap: path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/unwrap/deposit"), 
      },
      liquidity : path(ROOTS_DASHBOARD, "/crucible/cFRM-BNB/add-liquidity"), 
    },
    cFRMx_BNB: {
      introduction: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/introduction"),
      manage: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/manage"),
      mint: {
        steps: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/mint/add-liquidity"),
        mint: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/mint/deposit"),
      },
      stake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/stake/success"),
        stake: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/stake/deposit"),
      },
      unstake: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/unstake/success"),
        unstake: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/unstake/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/unstake/remove-liquidity" ),
      },
      withdraw: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/withdraw/success"),
        withdraw: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/withdraw/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/withdraw/add-liquidity" ),
      },
      unwrap: {
        success: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/unwrap/success"),
        unwrap: path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/unwrap/deposit"), 
      },
      liquidity : path(ROOTS_DASHBOARD, "/crucible/cFRMx_BNB/add-liquidity"), 
    },
  },
};
