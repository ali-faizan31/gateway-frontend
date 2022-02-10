// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_AUTH = '/auth';
  const ROOTS_DASHBOARD = '/dashboard';
  const ROOTS_ADMIN = '/admin';
  const ROOTS_PUBLIC_USER = '/pub';
  
  // ----------------------------------------------------------------------
  export const PATH_AUTH = {
    root: ROOTS_AUTH,
    communityLogin: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    communityRegister: path(ROOTS_AUTH, '/register'),
    orgLogin: path(ROOTS_AUTH, '/org/login'),
    orgRegister: path(ROOTS_AUTH, '/org/register'), 
    orgVerify: path(ROOTS_AUTH, '/org/verify'),
    orgResendCode: path(ROOTS_AUTH, '/org/resend-code'),
    // orgWalletAuthentication: path(ROOTS_AUTH, '/org/wallet-authentication'), 
    communityVerify: path(ROOTS_AUTH, '/verify'),
    communityResendCode: path(ROOTS_AUTH, '/resend-code'),
    // communityWalletAuthentication: path(ROOTS_AUTH, '/wallet-authentication'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
    resetPassword: path(ROOTS_AUTH, '/reset-password/:token'),
    walletAuthentication: path(ROOTS_AUTH, '/wallet-authentication'), 
  };
  
  export const PATH_ADMIN = {
    root: ROOTS_ADMIN,
    leaderboard: {
      create: path(ROOTS_ADMIN, '/leaderboard/create'),
      management: path(ROOTS_ADMIN, '/leaderboard/management'),
    },
    competition:{
      create: path(ROOTS_ADMIN, '/competition/create'),
      management: path(ROOTS_ADMIN, '/competition/management'),
    }
  };
  
  export const PATH_PUBLIC_USER = {
    root: ROOTS_PUBLIC_USER,
    leaderboard: {
      root: path(ROOTS_PUBLIC_USER, '/leaderboard'),
      detailLeaderBoardById: path(ROOTS_PUBLIC_USER, '/leaderboard:id'),
    },
    multiLeaderboard: {
      root: path(ROOTS_PUBLIC_USER, '/multi/leaderboard'),
      detailLeaderBoardById: path(ROOTS_PUBLIC_USER, '/multi/leaderboard/:id'),
      detailLeaderBoardByProvidedId: path(ROOTS_PUBLIC_USER, '/multi/leaderboard/61b6d48337f5125acbbfddeb'),
    },
    competition:{
      root: path(ROOTS_PUBLIC_USER, '/competition'),
      detailCompetitionById: path(ROOTS_PUBLIC_USER, '/competition:id')
    }
  }
  
  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: { 
      leaderboard: path(ROOTS_DASHBOARD, '/leaderboard'),
      createLeaderboard: path(ROOTS_DASHBOARD, '/leaderboard/create'), 
      leaderboardManagement: path(ROOTS_DASHBOARD, '/leaderboard/management'),
      detailLeaderBoardById: path(ROOTS_DASHBOARD, '/leaderboard:id'),
      competition: path(ROOTS_DASHBOARD, '/competition'), 
      createCompetition: path(ROOTS_DASHBOARD, '/competition/create'),
      competitionManagement: path(ROOTS_DASHBOARD, '/competition/management'),
      detailCompetitionById: path(ROOTS_DASHBOARD, '/competition:id'),
      multiLeaderBoardByProvidedId: path(ROOTS_DASHBOARD, '/multi/leaderboard/61b6d48337f5125acbbfddeb'),
    }
  };
   
  