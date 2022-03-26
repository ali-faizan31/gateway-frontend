import React, { useEffect, useState } from "react";
import {
  FButton,
  FCard,
  FContainer,
  FInputCheckbox,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { useHistory, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { MetaMaskConnector } from "../../../../../container-components";
import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { ConnectWalletDialog } from "../../../../../utils/connect-wallet/ConnectWalletDialog";
import { getLatestStepWithPendingStatus } from "../../../../../utils/global.utils";
import { updateStepFlowStepHistoryByStepFlowStepHistoryId } from "../../../../../_apis/StepFlowStepHistory";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";

export const Introduction = () => {
  const history = useHistory();
  const location: any = useLocation();

  const [neverShowAgain, setNeverShowAgain] = useState(false);
  const [stepFlowResponse, setStepFlowResponse] = useState<any>(undefined);
  const { meV2, tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );
  const { stepFlowStepHistory, currentStep } = useSelector(
    (state: RootState) => state.crucible
  );
  const { isConnected } = useSelector(
    (state: RootState) => state.walletConnector
  );

  useEffect(() => {
    console.log(location.state);
    if (location.state.id === undefined) {
      history.push(PATH_DASHBOARD.crucible.index);
    }
  }, [location]);

  useEffect(() => {
    if (stepFlowStepHistory?.length) {
      const step: any = getLatestStepWithPendingStatus(stepFlowStepHistory); // undefined check implement to reatrt sequence
      if (tokenV2 && location.state.id && step?.step?.name !== "Introduction") {
        history.push({
          pathname: PATH_DASHBOARD.crucible.deployer,
          state: location.state,
        });
      }
    }
  }, [tokenV2, location, stepFlowStepHistory]);

  const onGetStartedClick = async () => {
    console.log(neverShowAgain);
    if (neverShowAgain === true) {
      let data = { status: "completed" };
      let updateResponse: any =
        await updateStepFlowStepHistoryByStepFlowStepHistoryId(
          currentStep._id,
          data,
          tokenV2
        );
      updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
      console.log(updateResponse, "------------------");
      history.push({
        pathname: PATH_DASHBOARD.crucible.deployer,
        state: location.state,
      });
    } else {
      history.push({
        pathname: "/dashboard/crucible/manage",
        state: location.state,
      });
    }
  };

  const onNeverShowClick = (value: any) => {
    setNeverShowAgain(value);
  };

  return (
    <FContainer className="f-mb-2 f-mr-0">
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-get-started">
        <FTypo className="card-title" size={25} weight={700} color="#DAB46E">
          Welcome To The Crucible by Ferrum Network
        </FTypo>
        <FTypo size={18}>
          Watch the explainer video below for a step-by-step tutorial on how to
          mint, add liquidity, farm, trade, and earn rewards through the
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
            allowFullScreen
          ></iframe>
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
        {meV2._id ? (
          <FButton
            title={"Get Started"}
            postfix={<IconArrow />}
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
        className="f-mb-1 f-mt-1"
        label={"Don’t show the intro guide again."}
      />
    </FContainer>
  );
};
