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
    specificCompetition: path(ROOTS_DASHBOARD, "/competition/6229cf127b13cb22f75ae6eb"),
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
    crucibleActionRoutes: {
      introduction: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/introduction"),
      manage: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/manage"),
      mint: {
        steps: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/mint/add-liquidity"),
        mint: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/mint/deposit"),
        success: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/stake/success"),
      },
      stakingMint: {
        steps: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/staking-mint/introduction"), 
        success: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/staking-mint/success"),
      },
      stake: {
        success: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/stake/success"),
        stake: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/:contract/stake/deposit"),
      },
      unstake: {
        success: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/unstake/success"),
        unstake: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/unstake/deposit"),
        addLiquidity: path( ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/unstake/add-liquidity" ),
        removeLiquidity: path( ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/unstake/remove-liquidity" ),
      },
      withdraw: {
        success: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/withdraw/success"),
        withdraw: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/withdraw/deposit"),
        steps: path( ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/withdraw/add-liquidity" ),
      },
      unwrap: {
        success: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/unwrap/success"),
        unwrap: path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/unwrap/deposit"), 
      },
      liquidity : path(ROOTS_DASHBOARD, "/crucible/:farm(cFRM-BNB|cFRMx-BNB|cFRM|cFRMx)/add-liquidity"), 
    }
  },
};
