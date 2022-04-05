import React, { useEffect, useState } from "react";
import { FButton, FCard, FContainer, FInputCheckbox, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MetaMaskConnector } from "../../../../../container-components";
import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import {
  getLatestStepToRender,
  // getLatestStepWithPendingStatus,
  //  renderComponent
} from "../../../common/Helper";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
// import {CrucibleClient} from './../../../../../container-components/web3Client/crucibleClient';
// import {Web3Helper} from './../../../../../container-components/web3Client/web3Helper';
import toast, { Toaster } from "react-hot-toast";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import { ClipLoader } from "react-spinners";

export const Introduction = () => {
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { farm } = useParams<{ farm?: string }>();
  const [neverShowAgain, setNeverShowAgain] = useState(false);
  // const [pendingStepInfo, setpendingStepInfo]  = useState<any>(undefined);
  const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);

  const [networkClient, setNetworkClient] = useState<Web3 | undefined>(undefined);
  const { active, library } = useWeb3React();

  useEffect(() => {
    if (location.state === undefined) {
      history.push(PATH_DASHBOARD.crucible.index);
    }
    // eslint-disable-next-line
  }, [location]);

  useEffect(() => {
    if (library && !networkClient) {
      setNetworkClient(library);
    }
    // eslint-disable-next-line
  }, [active, library, networkClient]);

  const onGetStartedClick = async () => {
    setIsLoading(true);
    try {
      let updatedCurrentStep: any = {};
      let updHistory: any = [];
      let data: any = {};
      let updateResponse: any = {};

      if (neverShowAgain === true) {
        updatedCurrentStep = { ...currentStep, status: "skip" };
        updHistory = stepFlowStepHistory.map((obj, index) => (index === currentStepIndex ? { ...obj, status: "skip" } : obj));
        data = { status: "skip" };
      } else {
        updatedCurrentStep = { ...currentStep, status: "started" };
        updHistory = stepFlowStepHistory.map((obj, index) => (index === currentStepIndex ? { ...obj, status: "started" } : obj));
        data = { status: "started" };
      }

      updateResponse = await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(currentStep._id, data, tokenV2);
      updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, farm, setIsLoading);
    } catch (e: any) {
      let errorResponse = e && e.response && e.response.data.status && e.response.data.status.message;
      errorResponse ? toast.error(`Error Occured: ${errorResponse}`) : toast.error(`Error Occured: ${e}`);
    }
  };

  const onNeverShowClick = (value: any) => {
    setNeverShowAgain(value);
  };

  return (
    <>
      <Toaster />
      <FContainer width={800} className="f-mb-2">
        {isLoading ? (
          <FCard>
            <FItem align={"center"}>
              <ClipLoader color="#cba461" loading={true} size={150} />
            </FItem>
          </FCard>
        ) : (
          <div className="card-get-started">
            <FCard variant={"secondary"}>
              <FTypo className="card-title" size={25} weight={700} color="#DAB46E">
                Welcome To The Crucible by Ferrum Network
              </FTypo>
              <FTypo size={18}>
                Watch the explainer video below for a step-by-step tutorial on how to mint, add liquidity, farm, trade, and earn rewards through the
                Crucible!
              </FTypo>
              <div className="video-wrapper f-mt-1 f-mb-1">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/S2m-UV7F89o"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  frameBorder="0"
                  allowFullScreen></iframe>
              </div>
              <FTypo size={22} weight={500} className="f-mb-1">
                Crucible Benefits
              </FTypo>
              <FTypo size={18} className="f-mb-2">
                Below are just a few of the incredible features of The Crucible.
              </FTypo>
              <ul>
                <li>Ecosystem of Autonomous Sustainable Farming Pools</li>
                <li>Sustainable Rewards Economy</li>
                <li>Built-in Token Burn</li>
                <li>Mint, Add Liquidity, Farm, Trade, and Earn Rewards</li>
              </ul>
              {meV2._id && isConnected ? (
                <FButton
                  title={"Get Started"}
                  postfix={<IconArrow />}
                  // disabled={isLoading}
                  className="w-100 f-mt-2"
                  onClick={() => onGetStartedClick()}
                />
              ) : (
                <MetaMaskConnector.WalletConnector
                  WalletConnectView={FButton}
                  WalletConnectModal={ConnectWalletDialog}
                  isAuthenticationNeeded={true}
                  WalletConnectViewProps={{ className: "w-100" }}
                />
              )}
            </FCard>
            <FInputCheckbox
              onClick={() => onNeverShowClick(!neverShowAgain)}
              name="neverShowAgain"
              className="f-mb-1 f-mt-2"
              label={"Don’t show the intro guide again."}
            />
          </div>
        )}
      </FContainer>
    </>
  );
};
