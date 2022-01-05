import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
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
          <Route path="/dashboard/leaderboard/:id" >
            <DashboardLayout>
              <LeaderboardById />
            </DashboardLayout>
          </Route>
          <Route path="/pub/multi/leaderboard/:id">
            <Redirect to="/pub/multi/leaderboard/61d448bcb4918f09cb510ddf" />
            <DashboardLayout>
              <MultiTokenLeaderboardById />
            </DashboardLayout>
          </Route>
          <Route path="/dashboard/leaderboard/management">
            <DashboardLayout>
              <LeaderboardManagement />
            </DashboardLayout>
          </Route>
          <Route path="/dashboard/leaderboard/create">
            <DashboardLayout>
              <CreateLeaderboard />
            </DashboardLayout>
          </Route>
          <Route path="/dashboard/competition/create">
            <DashboardLayout>
              <CreateCompetition />
            </DashboardLayout>
          </Route>
          <Route path="/">
            <Redirect to="/pub/leaderboard/6185930b4454af30818cb26c" />
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
    <AuthLayout>
      <Suspense
        fallback={
          <ClipLoader color='red' loading={true} size={150} />
        }
      >
        <Component {...props} />
      </Suspense>
    </AuthLayout>
  );
};

const LeaderboardById = Loadable(lazy(() => import('./components/leaderboard/LeaderboardInformation')));
const CreateLeaderboard = Loadable(lazy(() => import('./components/leaderboard/NewLeaderboard')));
const MultiTokenLeaderboardById = Loadable(lazy(() => import('./components/leaderboard-multitoken/index')));
const LeaderboardManagement = Loadable(lazy(() => import('./components/leaderboard/LeaderboardManagement')));
const CommunityRegister = Loadable(lazy(() => import('./components/authentication/community/register')));
const CommunityEmailVerification = Loadable(lazy(() => import('./components/authentication/community/email-verification')));
const CommunityResend = Loadable(lazy(() => import('./components/authentication/community/resend-email-verification')));
const CommunityWalletAuthentication = Loadable(lazy(() => import('./components/authentication/community/wallet-authentication')));
const CommunityLogin = Loadable(lazy(() => import('./components/authentication/community/login')));
const CreateCompetition = Loadable(lazy(() => import('./components/competition/NewCompetition')));
const Page404 = Loadable(lazy(() => import('./components/error/page404')));
export default App;
