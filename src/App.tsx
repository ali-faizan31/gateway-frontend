import React, { lazy, Suspense } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import DashboardLayout from './layouts/dashboard';
import "./custom.scss";
import AuthLayout from './layouts/auth';
// guards 
import GuardedRoute from './guards/GuardedRoute';
import UnGuardedRoute from './guards/UnGuardedRoute'; 
import ClipLoader from "react-spinners/ClipLoader";  

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
      <Suspense
        fallback={
          <ClipLoader color="#cba461" loading={true} size={150} />
        }
      >
        <Component {...props} />
      </Suspense>
  );
};

const LeaderboardById = Loadable(lazy(() => import('./components/leaderboard/LeaderboardInformation')));
const CreateLeaderboard = Loadable(lazy(() => import('./components/leaderboard/NewLeaderboard')));
const MultiTokenLeaderboardById = Loadable(lazy(() => import('./components/leaderboard-multitoken/index')));
const LeaderboardManagement = Loadable(lazy(() => import('./components/leaderboard/LeaderboardManagement')));
const CommunityRegister = Loadable(lazy(() => import('./components/authentication/community/register')));
const CommunityEmailVerification = Loadable(lazy(() => import('./components/authentication/community/email-verification')));
const CommunityResend = Loadable(lazy(() => import('./components/authentication/community/resend-email-verification')));
const CommunityWalletAuthentication = Loadable(lazy(() => import('./components/authentication/community/wallet-authentication/index')));
const CommunityLogin = Loadable(lazy(() => import('./components/authentication/community/login')));
const OrganizationRegister = Loadable(lazy(() => import('./components/authentication/organization/register/index')));
const OrganizationEmailVerification = Loadable(lazy(() => import('./components/authentication/organization/email-verification')));
const OrganizationResend = Loadable(lazy(() => import('./components/authentication/organization/resend-email-verification')));
const OrganizationWalletAuthentication = Loadable(lazy(() => import('./components/authentication/organization/wallet-authentication')));
const OrganizationLogin = Loadable(lazy(() => import('./components/authentication/organization/login')));
const CreateCompetition = Loadable(lazy(() => import('./components/competition/NewCompetition')));
const CompetitionManagement =  Loadable(lazy(() => import('./components/competition/CompetitionManagement')));
const CompetitionById =  Loadable(lazy(() => import('./components/competition/CompetitionInformation')));
const Page404 = Loadable(lazy(() => import('./components/error/page404')));
const ForgotPassword = Loadable(lazy(() => import('./components/authentication/common/forgot-password/index')));
const ResetPassword = Loadable(lazy(() => import('./components/authentication/common/reset-password/index')));

function App() {
  const isAuthenticated = localStorage.getItem('token') ;

  return (
    <> 
      <Switch> 
        <Route exact path="/" ><Redirect to="/pub/multi/leaderboard/61b6d48337f5125acbbfddeb"/></Route> 
        <UnGuardedRoute path='/auth/forgot-password' component={ForgotPassword} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/reset-password/:token' component={ResetPassword} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/login' component={CommunityLogin} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/register' component={CommunityRegister} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/verify' component={CommunityEmailVerification} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/resend-code' component={CommunityResend} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/wallet-authentication' component={CommunityWalletAuthentication} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/org/register' component={OrganizationRegister} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/org/verify' component={OrganizationEmailVerification} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/org/resend-code' component={OrganizationResend} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/org/wallet-authentication' component={OrganizationWalletAuthentication} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/auth/org/login' component={OrganizationLogin} auth={isAuthenticated} layout={AuthLayout}/>
        <UnGuardedRoute path='/pub/leaderboard/:id' component={LeaderboardById} auth={isAuthenticated} layout={DashboardLayout}/>
        <UnGuardedRoute path='/pub/multi/leaderboard/:id' component={MultiTokenLeaderboardById} auth={isAuthenticated} layout={DashboardLayout}/>
        <UnGuardedRoute path='/pub/competition/:id' component={CompetitionById} auth={isAuthenticated}  layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/leaderboard/management' component={LeaderboardManagement} auth={isAuthenticated}  layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/leaderboard/create' component={CreateLeaderboard} auth={isAuthenticated}  layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/competition/create' component={CreateCompetition} auth={isAuthenticated}  layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/competition/management' component={CompetitionManagement} auth={isAuthenticated}  layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/competition/:id' component={CompetitionById} auth={isAuthenticated}  layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/multi/leaderboard/:id' component={MultiTokenLeaderboardById} auth={isAuthenticated} layout={DashboardLayout}/>
        <GuardedRoute path='/dashboard/leaderboard/:id' component={LeaderboardById} auth={isAuthenticated}  layout={DashboardLayout}/>

        <Route path="*" component={Page404}></Route> 
      </Switch>  
    </>
  );
}
  /* <Redirect to="/pub/leaderboard/6185930b4454af30818cb26c" /> */
  //61e6b9f26bd9933bfcb70e63

export default App;
