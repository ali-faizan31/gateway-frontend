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
    orgLogin: path(ROOTS_AUTH, '/org/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    communityRegister: path(ROOTS_AUTH, '/register'),
    orgRegister: path(ROOTS_AUTH, '/org/register'), 
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    communityVerify: path(ROOTS_AUTH, '/verify'),
    communityResendCode: path(ROOTS_AUTH, '/resend-code'),
    communityWalletAuthentication: path(ROOTS_AUTH, '/wallet-authentication')
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
      competition: path(ROOTS_DASHBOARD, '/competition'), 
      leaderboardManagement: path(ROOTS_DASHBOARD, '/leaderboard/management'),
      detailLeaderBoardById: path(ROOTS_DASHBOARD, '/leaderboard:id'),
      detailCompetitionById: path(ROOTS_DASHBOARD, '/competition:id')
    }
  };
   
  