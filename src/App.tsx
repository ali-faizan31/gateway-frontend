import React, { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import DashboardLayout from "./layouts/dashboard";
import "./custom.scss";
import "./assets/css/styles.min.css";
import AuthLayout from "./layouts/auth";
// guards
import GuardedRoute from "./guards/GuardedRoute";
import UnGuardedRoute from "./guards/UnGuardedRoute";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment-timezone";
import { WalletApplicationWrapper } from "./container-components";
import { PATH_DASHBOARD, PATH_PUBLIC_USER } from "./routes/paths";
import { cFRM_Trading_Competition_Details, FRM_FRMx_leaderboard_Details, TOKEN_TAG } from "./utils/const.utils";
import { useDispatch } from "react-redux";
import { getPhraseDataDispatch } from "./redux/slices/phrase";
import { Deployer as CrucibleDeployer } from "./components/crucible/common/Deployer";
import { useSelector } from "react-redux";
import { WalletAuthencationOnSignIn } from "./components/common/wallet-authentication/WalletAuthenticationSignIn";
import { RootState } from "./redux/rootReducer";
import { cFRMBNBModule } from "./components/crucible/farms";

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { pathname } = useLocation();
  // const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense fallback={<ClipLoader color="#cba461" loading={true} size={150} />}>
      <Component {...props} />
    </Suspense>
  );
};

const LeaderboardById = Loadable(lazy(() => import("./components/leaderboard/LeaderboardInformation")));
const CreateLeaderboard = Loadable(lazy(() => import("./components/leaderboard/NewLeaderboard")));
const MultiTokenLeaderboardById = Loadable(lazy(() => import("./components/leaderboard-multitoken/index")));
const LeaderboardManagement = Loadable(lazy(() => import("./components/leaderboard/LeaderboardManagement")));
// const CommunityRegister = Loadable(lazy(() => import("./components/authentication/community/register")));
// const CommunityLogin = Loadable(lazy(() => import("./components/authentication/community/login")));
const OrganizationRegister = Loadable(lazy(() => import("./components/authentication/organization/register/index")));
const OrganizationLogin = Loadable(lazy(() => import("./components/authentication/organization/login")));
const CreateCompetition = Loadable(lazy(() => import("./components/competition/NewCompetition")));
const CompetitionManagement = Loadable(lazy(() => import("./components/competition/CompetitionManagement")));
const CompetitionById = Loadable(lazy(() => import("./components/competition/CompetitionInformation")));
const Page404 = Loadable(lazy(() => import("./components/error/page404")));
const ForgotPassword = Loadable(lazy(() => import("./components/common/forgot-password/index")));
const ResetPassword = Loadable(lazy(() => import("./components/common/reset-password/index")));
const WalletAuthentication = Loadable(lazy(() => import("./components/common/wallet-authentication/index")));
const EmailVerification = Loadable(lazy(() => import("./components/common/email-verification/index")));
const ResendEmailVerification = Loadable(lazy(() => import("./components/common/resend-email-verification/index")));
const StakingLeaderboard = Loadable(lazy(() => import("./components/leaderboard-staking/StakingLeaderboard")));
const Dashboard = Loadable(lazy(() => import("./components/dashboard/dashboard")));
const ProfileSettings = Loadable(lazy(() => import("./components/profile-management")));
const CrucibleDashboardPage = Loadable(lazy(() => import("./components/crucible/dashboard/CrucibleDashboardPage")));
const CruciblePublic = Loadable(lazy(() => import("./components/crucible/public/Introduction")));

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem(TOKEN_TAG);
  moment.tz.setDefault("UTC");

  useEffect(() => {
    dispatch(getPhraseDataDispatch());
    // eslint-disable-next-line
  }, []);

  const { networkClient, walletAddress } = useSelector((state: RootState) => state.walletConnector);

  return (
    <WalletApplicationWrapper.ApplicationWrapper>
      <>
        <Switch>
          <Route exact path="/">
            {" "}
            <Redirect to={`${PATH_PUBLIC_USER.competition.root}/62976783ad472b70c4f756d6`} />{" "}
          </Route>
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.manage}
            component={cFRMBNBModule.cFRMBNBFarmingDashboardFlowManage}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.introduction}
            component={cFRMBNBModule.cFRMBNBFarmingDashboardFlowIntroduction}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.mint}
            component={cFRMBNBModule.cFRMBNBFarmingMintFlowMint}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.stakingMint.steps}
            component={cFRMBNBModule.cFRMBNBFarmingStakingMintFlowIntroduction}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.stakingMint.success}
            component={cFRMBNBModule.cFRMBNBFarmingStakingMintFlowSuccess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.success}
            component={cFRMBNBModule.cFRMBNBFarmingStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.stake}
            component={cFRMBNBModule.cFRMBNBFarmingStakeFlowStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.success}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.unstake}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowUnStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.addLiquidity}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowAddLiquidity}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.removeLiquidity}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowRemoveLiquidity}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.liquidity}
            component={cFRMBNBModule.cFRMBNBFarmingLiquidityFlow}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.success}
            component={cFRMBNBModule.cFRMBNBFarmingWithdrawFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.withdraw}
            component={cFRMBNBModule.cFRMBNBFarmingWithdrawFlowWithdraw}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.steps}
            component={cFRMBNBModule.cFRMBNBFarmingWithdrawFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.unwrap}
            component={cFRMBNBModule.cFRMBNBFarmingUnWrapFlowUnWrap}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.success}
            component={cFRMBNBModule.cFRMBNBFarmingUnWrapFlowSuccess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          {/* <UnGuardedRoute path={PATH_DASHBOARD.crucible.public} component={CruciblePublic} auth={isAuthenticated} layout={DashboardLayout} headerTitle="Crucible" /> */}

          {/* <UnGuardedRoute path="/home" component={Dashboard} auth={isAuthenticated} layout={DashboardLayout} headerTitle="" /> */}
          <UnGuardedRoute path="/auth/forgot-password" component={ForgotPassword} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          <UnGuardedRoute path="/auth/verify" component={EmailVerification} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          <UnGuardedRoute path="/auth/resend-code" component={ResendEmailVerification} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          <UnGuardedRoute path="/auth/reset-password/:token" component={ResetPassword} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          <UnGuardedRoute path="/auth/wallet-authentication" component={WalletAuthentication} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          {/* <UnGuardedRoute path='/auth/login' component={CommunityLogin} auth={isAuthenticated} layout={AuthLayout}/>
          <UnGuardedRoute path='/auth/register' component={CommunityRegister} auth={isAuthenticated} layout={AuthLayout}/> */}
          <UnGuardedRoute path="/auth/org/register" component={OrganizationRegister} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          <UnGuardedRoute path="/auth/org/login" component={OrganizationLogin} auth={isAuthenticated} layout={AuthLayout} headerTitle="" />
          <UnGuardedRoute path="/pub/leaderboard/:id" component={LeaderboardById} auth={isAuthenticated} layout={DashboardLayout} headerTitle="" />
          <UnGuardedRoute path="/pub/multi/leaderboard/:id" component={MultiTokenLeaderboardById} auth={isAuthenticated} layout={DashboardLayout} headerTitle="" />
          <UnGuardedRoute path="/pub/competition/:id" component={CompetitionById} auth={isAuthenticated} layout={DashboardLayout} headerTitle="" />
          <UnGuardedRoute path="/pub/staking/leaderboard/:id" component={StakingLeaderboard} auth={isAuthenticated} layout={DashboardLayout} headerTitle="" />
          <GuardedRoute path="/dashboard/staking/leaderboard/:id" component={StakingLeaderboard} auth={isAuthenticated} layout={DashboardLayout} headerTitle="" />
          <GuardedRoute path="/dashboard/leaderboard/management" component={LeaderboardManagement} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/leaderboard/create" component={CreateLeaderboard} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/competition/create" component={CreateCompetition} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/competition/management" component={CompetitionManagement} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/competition/:id" component={CompetitionById} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/multi/leaderboard/:id" component={MultiTokenLeaderboardById} auth={isAuthenticated} layout={DashboardLayout} />
          <GuardedRoute path="/dashboard/leaderboard/:id" component={LeaderboardById} auth={isAuthenticated} layout={DashboardLayout} />
          <UnGuardedRoute path={PATH_DASHBOARD.general.profile} component={ProfileSettings} auth={isAuthenticated} layout={DashboardLayout} headerTitle="My Profile" />
          {/* <UnGuardedRoute path={PATH_DASHBOARD.crucible.deployer} component={CrucibleDeployer} auth={isAuthenticated} layout={DashboardLayout} headerTitle="Crucible" /> */}
          <UnGuardedRoute path={PATH_DASHBOARD.crucible.index} component={CrucibleDashboardPage} auth={isAuthenticated} layout={DashboardLayout} headerTitle="Crucible" />

          <Route path="*" component={Page404}></Route>
        </Switch>
        <WalletAuthencationOnSignIn account={walletAddress} networkClient={networkClient} />
      </>
    </WalletApplicationWrapper.ApplicationWrapper>
  );
}

export default App;

///pub/multi/leaderboard/61b6d48337f5125acbbfddeb
