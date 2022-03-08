import React, { lazy, Suspense } from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import "./custom.scss";
import AuthLayout from "./layouts/auth";
// guards
import GuardedRoute from "./guards/GuardedRoute";
import UnGuardedRoute from "./guards/UnGuardedRoute";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment-timezone";
import { WalletApplicationWrapper } from "./container-components";
import { PATH_DASHBOARD } from "./routes/paths";
import { TOKEN_TAG } from "./utils/const.utils";

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={<ClipLoader color="#cba461" loading={true} size={150} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

const LeaderboardById = Loadable(lazy(() => import("./components/leaderboard/LeaderboardInformation")));
const CreateLeaderboard = Loadable(lazy(() => import("./components/leaderboard/NewLeaderboard")));
const MultiTokenLeaderboardById = Loadable(lazy(() => import("./components/leaderboard-multitoken/index")));
const LeaderboardManagement = Loadable(lazy(() => import("./components/leaderboard/LeaderboardManagement")));
const CommunityRegister = Loadable(lazy(() => import("./components/authentication/community/register")));
const CommunityLogin = Loadable(lazy(() => import("./components/authentication/community/login")));
const OrganizationRegister = Loadable(lazy(() => import("./components/authentication/organization/register/index")));
const OrganizationLogin = Loadable(lazy(() => import("./components/authentication/organization/login")));
const CreateCompetition = Loadable(lazy(() => import("./components/competition/NewCompetition")));
const CompetitionManagement = Loadable(lazy(() => import("./components/competition/CompetitionManagement")));
const CompetitionById = Loadable(lazy(() => import("./components/competition/CompetitionInformation")));
const Page404 = Loadable(lazy(() => import("./components/error/page404")));
const ForgotPassword = Loadable( lazy(() => import("./components/common/forgot-password/index")) );
const ResetPassword = Loadable( lazy(() => import("./components/common/reset-password/index")) );
const WalletAuthentication = Loadable( lazy(() => import("./components/common/wallet-authentication/index")) );
const EmailVerification = Loadable( lazy(() => import("./components/common/email-verification/index")) );
const ResendEmailVerification = Loadable( lazy(() => import("./components/common/resend-email-verification/index")) );
const StakingLeaderboard = Loadable( lazy(() => import("./components/leaderboard-staking/StakingLeaderboard")) );
const Dashboard = Loadable( lazy(() => import("./components/dashboard/dashboard")) );
const ProfileSettings = Loadable( lazy(() => import("./components/profile-management")) );
const CrucibleIntroduction = Loadable( lazy(() => import("./components/crucible/Intro")) );
const MintAndStake = Loadable( lazy(() => import("./components/crucible/MintAndStake")) );
const Crucible = Loadable( lazy(() => import("./components/crucible/index")) );

function App() {
  const isAuthenticated = localStorage.getItem(TOKEN_TAG);
  moment.tz.setDefault("UTC");

  return (
    <WalletApplicationWrapper.ApplicationWrapper>
      <>
        <Switch>
          <Route exact path="/"> <Redirect to="/pub/multi/leaderboard/61b6d48337f5125acbbfddeb" /> </Route>
          <UnGuardedRoute path="/home" component={Dashboard} auth={isAuthenticated} layout={DashboardLayout} headerTitle=""/>
          <UnGuardedRoute path="/auth/forgot-password" component={ForgotPassword} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          <UnGuardedRoute path="/auth/verify" component={EmailVerification} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          <UnGuardedRoute path="/auth/resend-code" component={ResendEmailVerification} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          <UnGuardedRoute path="/auth/reset-password/:token" component={ResetPassword} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          <UnGuardedRoute path="/auth/wallet-authentication" component={WalletAuthentication} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          {/* <UnGuardedRoute path='/auth/login' component={CommunityLogin} auth={isAuthenticated} layout={AuthLayout}/>
          <UnGuardedRoute path='/auth/register' component={CommunityRegister} auth={isAuthenticated} layout={AuthLayout}/> */}
          <UnGuardedRoute path="/auth/org/register" component={OrganizationRegister} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          <UnGuardedRoute path="/auth/org/login" component={OrganizationLogin} auth={isAuthenticated} layout={AuthLayout} headerTitle=""/>
          <UnGuardedRoute path="/pub/leaderboard/:id" component={LeaderboardById} auth={isAuthenticated} layout={DashboardLayout} headerTitle=""/> 
          <UnGuardedRoute path="/pub/multi/leaderboard/:id" component={MultiTokenLeaderboardById} auth={isAuthenticated} layout={DashboardLayout} headerTitle=""/>
          <UnGuardedRoute path="/pub/competition/:id" component={CompetitionById} auth={isAuthenticated} layout={DashboardLayout} headerTitle=""/>
          <UnGuardedRoute path="/pub/staking/leaderboard/:id" component={StakingLeaderboard} auth={isAuthenticated} layout={DashboardLayout} headerTitle=""/>
          <GuardedRoute path="/dashboard/leaderboard/management" component={LeaderboardManagement} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/leaderboard/create" component={CreateLeaderboard} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/competition/create" component={CreateCompetition} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/competition/management" component={CompetitionManagement} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/competition/:id" component={CompetitionById} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/multi/leaderboard/:id" component={MultiTokenLeaderboardById} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/leaderboard/:id" component={LeaderboardById} auth={isAuthenticated} layout={DashboardLayout} />
          <UnGuardedRoute path={PATH_DASHBOARD.general.profile} component={ProfileSettings} auth={isAuthenticated} layout={DashboardLayout} headerTitle="My Profile" />
          <UnGuardedRoute path={PATH_DASHBOARD.crucible.intro} component={CrucibleIntroduction} auth={isAuthenticated} layout={DashboardLayout} headerTitle="Crucible" />
          <UnGuardedRoute path={PATH_DASHBOARD.crucible.mintAndStake} component={MintAndStake} auth={isAuthenticated} layout={DashboardLayout} headerTitle="Crucible" />
          <UnGuardedRoute path={PATH_DASHBOARD.crucible.index} component={Crucible} auth={isAuthenticated} layout={DashboardLayout} headerTitle="Crucible" />

          <Route path="*" component={Page404}></Route>
        </Switch>
      </>
    </WalletApplicationWrapper.ApplicationWrapper>
  );
}

export default App;

///pub/multi/leaderboard/61b6d48337f5125acbbfddeb
