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
import { PATH_DASHBOARD } from "./routes/paths";
import { TOKEN_TAG } from "./utils/const.utils";
import { useDispatch } from "react-redux";
import { getPhraseDataDispatch } from "./redux/slices/phrase";
import { Deployer as CrucibleDeployer } from "./components/crucible/common/Deployer";
import { useSelector } from "react-redux";
import { WalletAuthencationOnSignIn } from "./components/common/wallet-authentication/WalletAuthenticationSignIn";
import { RootState } from "./redux/rootReducer";
import {
  cFRMModule,
  cFRMBNBModule,
  cFRMxBNBModule,
  cFRMxModule,
} from "./components/crucible/farms";

const Loadable = (Component: any) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { pathname } = useLocation();
  // const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={<ClipLoader color="#cba461" loading={true} size={150} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

const LeaderboardById = Loadable(
  lazy(() => import("./components/leaderboard/LeaderboardInformation"))
);
const CreateLeaderboard = Loadable(
  lazy(() => import("./components/leaderboard/NewLeaderboard"))
);
const MultiTokenLeaderboardById = Loadable(
  lazy(() => import("./components/leaderboard-multitoken/index"))
);
const LeaderboardManagement = Loadable(
  lazy(() => import("./components/leaderboard/LeaderboardManagement"))
);
// const CommunityRegister = Loadable(lazy(() => import("./components/authentication/community/register")));
// const CommunityLogin = Loadable(lazy(() => import("./components/authentication/community/login")));
const OrganizationRegister = Loadable(
  lazy(() => import("./components/authentication/organization/register/index"))
);
const OrganizationLogin = Loadable(
  lazy(() => import("./components/authentication/organization/login"))
);
const CreateCompetition = Loadable(
  lazy(() => import("./components/competition/NewCompetition"))
);
const CompetitionManagement = Loadable(
  lazy(() => import("./components/competition/CompetitionManagement"))
);
const CompetitionById = Loadable(
  lazy(() => import("./components/competition/CompetitionInformation"))
);
const Page404 = Loadable(lazy(() => import("./components/error/page404")));
const ForgotPassword = Loadable(
  lazy(() => import("./components/common/forgot-password/index"))
);
const ResetPassword = Loadable(
  lazy(() => import("./components/common/reset-password/index"))
);
const WalletAuthentication = Loadable(
  lazy(() => import("./components/common/wallet-authentication/index"))
);
const EmailVerification = Loadable(
  lazy(() => import("./components/common/email-verification/index"))
);
const ResendEmailVerification = Loadable(
  lazy(() => import("./components/common/resend-email-verification/index"))
);
const StakingLeaderboard = Loadable(
  lazy(() => import("./components/leaderboard-staking/StakingLeaderboard"))
);
const Dashboard = Loadable(
  lazy(() => import("./components/dashboard/dashboard"))
);
const ProfileSettings = Loadable(
  lazy(() => import("./components/profile-management"))
);
const CrucibleDashboardPage = Loadable(
  lazy(() => import("./components/crucible/dashboard/CrucibleDashboardPage"))
);
const CruciblePublic = Loadable(
  lazy(() => import("./components/crucible/public/Introduction"))
);

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = localStorage.getItem(TOKEN_TAG);
  moment.tz.setDefault("UTC");

  useEffect(() => {
    dispatch(getPhraseDataDispatch());
    // eslint-disable-next-line
  }, []);

  const { networkClient, walletAddress } = useSelector(
    (state: RootState) => state.walletConnector
  );

  return (
    <WalletApplicationWrapper.ApplicationWrapper>
      <>
        <Switch>
          <Route exact path="/">
            {" "}
            <Redirect to="/pub/multi/leaderboard/61b6d48337f5125acbbfddeb" />{" "}
          </Route>
          {/* new routes ---------------------- */}
          {/* cfrm-bnb routes */}
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.manage}
            component={cFRMBNBModule.cFRMBNBFarmingDashboardFlowManage}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.introduction}
            component={cFRMBNBModule.cFRMBNBFarmingDashboardFlowIntroduction}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.steps}
            component={cFRMBNBModule.cFRMBNBFarmingMintFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.mint}
            component={cFRMBNBModule.cFRMBNBFarmingMintFlowMint}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.success}
            component={cFRMBNBModule.cFRMBNBFarmingStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.stake.stake}
            component={cFRMBNBModule.cFRMBNBFarmingStakeFlowStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.success}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.unstake}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowUnStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.steps}
            component={cFRMBNBModule.cFRMBNBFarmingUnStakeFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.liquidity}
            component={cFRMBNBModule.cFRMBNBFarmingLiquidityFlow}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.success}
            component={cFRMBNBModule.cFRMBNBFarmingWithdrawFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={
              PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.withdraw
            }
            component={cFRMBNBModule.cFRMBNBFarmingWithdrawFlowWithdraw}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.withdraw.steps}
            component={cFRMBNBModule.cFRMBNBFarmingWithdrawFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.unwrap}
            component={cFRMBNBModule.cFRMBNBFarmingUnWrapFlowUnWrap}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.success}
            component={cFRMBNBModule.cFRMBNBFarmingUnWrapFlowSuccess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          {/* cfrm-bnb routes end */}
          {/* cfrmx-bnb routes */}
          {/* <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.introduction}
            component={cFRMxBNBModule.cFRMxBNBFarmingDashboardFlowIntroduction}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.manage}
            component={cFRMxBNBModule.cFRMxBNBFarmingDashboardFlowManage}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.mint.steps}
            component={cFRMxBNBModule.cFRMxBNBFarmingMintFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.mint.mint}
            component={cFRMxBNBModule.cFRMxBNBFarmingMintFlowMint}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.stake.success}
            component={cFRMxBNBModule.cFRMxBNBFarmingStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.stake.stake}
            component={cFRMxBNBModule.cFRMxBNBFarmingStakeFlowStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.unstake.success}
            component={cFRMxBNBModule.cFRMxBNBFarmingUnStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.unstake.unstake}
            component={cFRMxBNBModule.cFRMxBNBFarmingUnStakeFlowUnStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.unstake.steps}
            component={cFRMxBNBModule.cFRMxBNBFarmingUnStakeFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.liquidity}
            component={cFRMxBNBModule.cFRMxBNBFarmingLiquidityFlow}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.withdraw.success}
            component={cFRMxBNBModule.cFRMxBNBFarmingWithdrawFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.withdraw.withdraw}
            component={cFRMxBNBModule.cFRMxBNBFarmingWithdrawFlowWithdraw}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.withdraw.steps}
            component={cFRMxBNBModule.cFRMxBNBFarmingWithdrawFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.unwrap.unwrap}
            component={cFRMxBNBModule.cFRMxBNBFarmingUnWrapFlowUnWrap}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx_BNB.unwrap.success}
            component={cFRMxBNBModule.cFRMxBNBFarmingUnWrapFlowSuccess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          /> */}
          {/* cfrmx-bnb routes end */}
          {/* cfrm routes */}
          {/* <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.introduction}
            component={cFRMModule.cFRMFarmingDashboardFlowIntroduction}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.manage}
            component={cFRMModule.cFRMFarmingDashboardFlowManage}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.mint.checks}
            component={cFRMModule.cFRMFarmingMintFlowCheckSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.mint.mint}
            component={cFRMModule.cFRMFarmingMintFlowMint}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.mint.success}
            component={cFRMModule.cFRMFarmingMintFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.mint.steps}
            component={cFRMModule.cFRMFarmingMintFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.stake.success}
            component={cFRMModule.cFRMFarmingStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.stake.stake}
            component={cFRMModule.cFRMFarmingStakeFlowStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.unstake.success}
            component={cFRMModule.cFRMFarmingUnStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.unstake.unstake}
            component={cFRMModule.cFRMFarmingUnStakeFlowUnStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.unstake.steps}
            component={cFRMModule.cFRMFarmingUnStakeFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.withdraw.success}
            component={cFRMModule.cFRMFarmingWithdrawFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.withdraw.withdraw}
            component={cFRMModule.cFRMFarmingWithdrawFlowWithdraw}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.withdraw.steps}
            component={cFRMModule.cFRMFarmingWithdrawFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.unwrap.unwrap}
            component={cFRMModule.cFRMFarmingUnWrapFlowUnWrap}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRM.unwrap.success}
            component={cFRMModule.cFRMFarmingUnWrapFlowSuccess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          /> */}
          {/* cfrm routes end */}
          {/* cfrmx routes */}
          {/* <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.introduction}
            component={cFRMxModule.cFRMxFarmingDashboardFlowIntroduction}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.manage}
            component={cFRMxModule.cFRMxFarmingDashboardFlowManage}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.mint.checks}
            component={cFRMxModule.cFRMxFarmingMintFlowCheckSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.mint.mint}
            component={cFRMxModule.cFRMxFarmingMintFlowMint}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.mint.success}
            component={cFRMxModule.cFRMxFarmingMintFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.mint.steps}
            component={cFRMxModule.cFRMxFarmingMintFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.stake.success}
            component={cFRMxModule.cFRMxFarmingStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.stake.stake}
            component={cFRMxModule.cFRMxFarmingStakeFlowStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.unstake.success}
            component={cFRMxModule.cFRMxFarmingUnStakeFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.unstake.unstake}
            component={cFRMxModule.cFRMxFarmingUnStakeFlowUnStake}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.unstake.steps}
            component={cFRMxModule.cFRMxFarmingUnStakeFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.withdraw.success}
            component={cFRMxModule.cFRMxFarmingWithdrawFlowSucess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.withdraw.withdraw}
            component={cFRMxModule.cFRMxFarmingWithdrawFlowWithdraw}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.withdraw.steps}
            component={cFRMxModule.cFRMxFarmingWithdrawFlowSteps}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.unwrap.unwrap}
            component={cFRMxModule.cFRMxFarmingUnWrapFlowUnWrap}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <GuardedRoute
            path={PATH_DASHBOARD.crucible.cFRMx.unwrap.success}
            component={cFRMxModule.cFRMxFarmingUnWrapFlowSuccess}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          /> */}
          {/* cfrmx routes end */}
          {/* <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.public}
            component={CruciblePublic}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />

          <UnGuardedRoute
            path="/home"
            component={Dashboard}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/auth/forgot-password"
            component={ForgotPassword}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/auth/verify"
            component={EmailVerification}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/auth/resend-code"
            component={ResendEmailVerification}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/auth/reset-password/:token"
            component={ResetPassword}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/auth/wallet-authentication"
            component={WalletAuthentication}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          /> */}
          {/* <UnGuardedRoute path='/auth/login' component={CommunityLogin} auth={isAuthenticated} layout={AuthLayout}/>
          <UnGuardedRoute path='/auth/register' component={CommunityRegister} auth={isAuthenticated} layout={AuthLayout}/> */}
          <UnGuardedRoute
            path="/auth/org/register"
            component={OrganizationRegister}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/auth/org/login"
            component={OrganizationLogin}
            auth={isAuthenticated}
            layout={AuthLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/pub/leaderboard/:id"
            component={LeaderboardById}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/pub/multi/leaderboard/:id"
            component={MultiTokenLeaderboardById}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/pub/competition/:id"
            component={CompetitionById}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle=""
          />
          <UnGuardedRoute
            path="/pub/staking/leaderboard/:id"
            component={StakingLeaderboard}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle=""
          />
          <GuardedRoute
            path="/dashboard/leaderboard/management"
            component={LeaderboardManagement}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <GuardedRoute
            path="/dashboard/leaderboard/create"
            component={CreateLeaderboard}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <GuardedRoute
            path="/dashboard/competition/create"
            component={CreateCompetition}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <GuardedRoute
            path="/dashboard/competition/management"
            component={CompetitionManagement}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <GuardedRoute
            path="/dashboard/competition/:id"
            component={CompetitionById}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <GuardedRoute
            path="/dashboard/multi/leaderboard/:id"
            component={MultiTokenLeaderboardById}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <GuardedRoute
            path="/dashboard/leaderboard/:id"
            component={LeaderboardById}
            auth={isAuthenticated}
            layout={DashboardLayout}
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.general.profile}
            component={ProfileSettings}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="My Profile"
          />

          {/* new routes ---------------------- */}

          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.deployer}
            component={CrucibleDeployer}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />
          <UnGuardedRoute
            path={PATH_DASHBOARD.crucible.index}
            component={CrucibleDashboardPage}
            auth={isAuthenticated}
            layout={DashboardLayout}
            headerTitle="Crucible"
          />

          <Route path="*" component={Page404}></Route>
        </Switch>
        <WalletAuthencationOnSignIn
          account={walletAddress}
          networkClient={networkClient}
        />
      </>
    </WalletApplicationWrapper.ApplicationWrapper>
  );
}

export default App;

///pub/multi/leaderboard/61b6d48337f5125acbbfddeb
