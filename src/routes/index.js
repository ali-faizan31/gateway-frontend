import { Suspense, lazy, useState, useEffect } from 'react';
import { Link, Switch, Route, useLocation } from 'react-router-dom'; 
// layouts 
import DashboardLayout from '../layouts/dashboard'; 
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard'; 

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    // <Suspense
    //   fallback={
    //     <LoadingScreen
    //       sx={{
    //         ...(!isDashboard && {
    //           top: 0,
    //           left: 0,
    //           width: 1,
    //           zIndex: 9999,
    //           position: 'fixed'
    //         })
    //       }}
    //     />
    //   }
    // >
      <Component {...props} />
    // </Suspense>
  );
};

export default function Router() {
  const { pathname } = useLocation();
  const isPublicUser = pathname.includes('/pub'); 

  // const publicUserRoutes = useRoutes([
  //   {
  //     path: 'pub',
  //     element: (
  //       <GuestGuard>
  //         <DashboardLayout isPublic={isPublicUser} />
  //       </GuestGuard>
  //     ),
  //     children: [
  //       {
  //         path: 'leaderboard',
  //         children: [
  //           { element: <Link to="/pub/leaderboard/:id" replace /> },
  //           { path: ':id', element: <LeaderboardById /> }
  //         ]
  //       },
        // {
        //   path: 'multi/leaderboard',
        //   children: [
        //     { element: <Navigate to="/pub/multi/leaderboard/619bb9b17d28d14a60636ad4" replace /> },
        //     { path: ':id', element: <MultiTokenLeaderboardById /> }
        //   ]
        // },
        // {
        //   path: 'competition',
        //   children: [
        //     { element: <Navigate to="/pub/competition/:id" replace /> },
        //     { path: ':id', element: <CompetitionById /> }
        //   ]
        // }
    //   ]
    // },

    // { path: '*', element: <Navigate to="/404" replace /> }
  // ]);

  // const adminRoutes = useRoutes([
  //   // {
  //   //   path: 'auth',
  //   //   children: [
  //   //     {
  //   //       path: 'login',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <CommunityLogin />
  //   //         </GuestGuard>
  //   //       )
  //   //     },
  //   //     {
  //   //       path: 'org/Login',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <OrgLogin />
  //   //         </GuestGuard>
  //   //       )
  //   //     },
  //   //     {
  //   //       path: 'register',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <CommunityRegister />
  //   //         </GuestGuard>
  //   //       )
  //   //     },
  //   //     {
  //   //       path: 'org/register',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <OrgRegister />
  //   //         </GuestGuard>
  //   //       )
  //   //     }, 
  //   //     { path: 'reset-password', element: <ResetPassword /> },
  //   //     {
  //   //       path: 'verify',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <CommunityVerifyCode /> 
  //   //         </GuestGuard>
  //   //       )
  //   //     },
  //   //     {
  //   //       path: 'resend-code',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <CommunityResendVerifyCode /> 
  //   //         </GuestGuard>
  //   //       )
  //   //     }, 
  //   //     {
  //   //       path: 'wallet-authentication',
  //   //       element: (
  //   //         <GuestGuard>
  //   //           <CommunityWalletAuthentication /> 
  //   //         </GuestGuard>
  //   //       )
  //   //     }
  //   //   ]
  //   // },

  //   // // admin routes
  //   // {
  //   //   path: 'admin',
  //   //   element: (
  //   //     <AuthGuard>
  //   //       <DashboardLayout />
  //   //     </AuthGuard>
  //   //   ),
  //   //   children: [
  //   //     {
  //   //       path: 'leaderboard',
  //   //       children: [
  //   //         { element: <Navigate to="/admin/leaderboard/create" replace /> },
  //   //         { path: 'create', element: <ContractInformation /> },
  //   //         { path: 'management', element: <LeaderboardManagement /> }
  //   //       ]
  //   //     },
  //   //     {
  //   //       path: 'competition',
  //   //       children: [
  //   //         { element: <Navigate to="/admin/competition/create" replace /> },
  //   //         { path: 'create', element: <CompetitionInformation /> },
  //   //         { path: 'management', element: <CompetitionManagement /> }
  //   //       ]
  //   //     }
  //   //   ]
  //   // },

  //   // // Dashboard Routes
  //   // {
  //   //   path: 'dashboard',
  //   //   element: (
  //   //     <AuthGuard>
  //   //       <DashboardLayout />
  //   //     </AuthGuard>
  //   //   ),
  //   //   children: [
  //   //     { element: <Navigate to="/dashboard/leaderboard" replace /> },
  //   //     { path: 'leaderboard', element: <LeaderboardById /> },  
  //   //     { path: 'leaderboard/:id', element: <LeaderboardById /> },
  //   //     { path: 'competition/:id', element: <CompetitionById /> } 
  //   //   ]
  //   // }, 
  //   // { path: '*', element: <Navigate to="/404" replace /> }
  // ]);

  if (isPublicUser) {
    return ( 
    <Switch>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="pub" element={<GuestGuard>
          <DashboardLayout isPublic={isPublicUser} />
        </GuestGuard>}>
          <Route path="leaderboard/:id" element={<LeaderboardById />} />
          {/* <Route path=":id" element={<UserProfile />} />
          <Route path="me" element={<OwnUserProfile />} /> */}
        </Route>
      </Switch>)
    // return publicUserRoutes;
  }
  // return adminRoutes;
}

// IMPORT COMPONENTS

// Authentication
// const CommunityLogin = Loadable(lazy(() => import('../components/authentication/CommunityLogin')));
// const OrgLogin = Loadable(lazy(() => import('../components/authentication/OrgLogin')));
// const CommunityRegister = Loadable(lazy(() => import('../components/authentication/CommunityRegister')));
// const OrgRegister = Loadable(lazy(() => import('../components/authentication/OrgRegister')));
// const ResetPassword = Loadable(lazy(() => import('../components/authentication/ResetPassword')));
// const CommunityVerifyCode = Loadable(lazy(() => import('../components/authentication/CommunityVerifyCode')));
// const CommunityResendVerifyCode = Loadable(lazy(() => import('../components/authentication/CommunityResendVerifyCode')));
// const CommunityWalletAuthentication = Loadable(lazy(() => import('../components/authentication/CommunityWalletAuthentication')));  
// const ContractInformation = Loadable(lazy(() => import('../components/leaderboard/NewLeaderboard')));
// const CompetitionInformation = Loadable(lazy(() => import('../components/competition/NewCompetition')));
// const LeaderboardManagement = Loadable(lazy(() => import('../components/leaderboard/LeaderboardManagement')));
// const CompetitionManagement = Loadable(lazy(() => import('../components/competition/CompetitionManagement')));
const LeaderboardById = Loadable(lazy(() => import('../components/leaderboard/LeaderboardInformation')));
// const CompetitionById = Loadable(lazy(() => import('../components/competition/CompetitionInformation')));
// const MultiTokenLeaderboardById = Loadable(lazy(() => import('../components/leaderboard-multitoken/index')));
