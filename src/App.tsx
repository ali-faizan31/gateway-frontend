import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import "./custom.scss";
import DashboardLayout from './layouts/dashboard';
import AuthLayout from './layouts/auth';
// guards
import GuestGuard from './guards/GuestGuard';
import AuthGuard from './guards/AuthGuard';
import Router from './routes';
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  return (
    <>
      <GuestGuard>
        <Switch>
          <Route path="/auth/register">
            <AuthLayout>
              <CommunityRegister />
            </AuthLayout>
          </Route>
          <Route path="/auth/verify">
            <AuthLayout>
              <CommunityEmailVerification />
            </AuthLayout>
          </Route>
          <Route path="/auth/resend-code">
            <AuthLayout>
              <CommunityResend />
            </AuthLayout>
          </Route>
          <Route path="/auth/wallet-authentication">
            <AuthLayout>
              <CommunityWalletAuthentication />
            </AuthLayout>
          </Route>
          <Route path="/auth/login">
            <AuthLayout>
              <CommunityLogin />
            </AuthLayout>
          </Route>
          <Route path="/pub/leaderboard/:id" >
            <DashboardLayout>
              <LeaderboardById />
            </DashboardLayout>
          </Route>
          <Route path="/pub/multi/leaderboard/:id">
            <DashboardLayout>
              <MultiTokenLeaderboardById />
            </DashboardLayout>
          </Route>
          <Route path="/dashboard/leaderboard/management">
            <DashboardLayout>
              <LeaderboardManagement />
            </DashboardLayout>
          </Route>
          <Route path="*" >
            <Page404 />
          </Route>
        </Switch>
        {/* </DashboardLayout> */}
      </GuestGuard>
    </>
  );
}

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <ClipLoader color='red' loading={true} size={150} />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

const LeaderboardById = Loadable(lazy(() => import('./components/leaderboard/LeaderboardInformation')));
const MultiTokenLeaderboardById = Loadable(lazy(() => import('./components/leaderboard-multitoken/index')));
const LeaderboardManagement = Loadable(lazy(() => import('./components/leaderboard/LeaderboardManagement')));
const CommunityRegister = Loadable(lazy(() => import('./components/authentication/community/register')));
const CommunityEmailVerification = Loadable(lazy(() => import('./components/authentication/community/email-verification')));
const CommunityResend = Loadable(lazy(() => import('./components/authentication/community/resend-email-verification')));
const CommunityWalletAuthentication = Loadable(lazy(() => import('./components/authentication/community/wallet-authentication')));
const CommunityLogin = Loadable(lazy(()=>import('./components/authentication/community/login')));
const Page404 = Loadable(lazy(() => import('./components/error/page404')));
export default App;
