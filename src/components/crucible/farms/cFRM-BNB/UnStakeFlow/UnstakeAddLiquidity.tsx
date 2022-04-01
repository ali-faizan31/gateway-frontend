import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import {
  FButton,
  FCard,
  FContainer,
  // FGrid,
  // FGridItem,
  FInputCheckbox,
  FItem,
  // FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { getObjectReadableFarmName, getLatestStepToRender } from "../../../common/Helper";
import { STEP_FLOW_IDS } from "../../../common/utils";
import { ClipLoader } from "react-spinners";
import { getNetworkInformationForPublicUser } from "../../../../../_apis/NetworkCrud";

export const UnstakeAddLiquidity = () => {
  const dispatch = useDispatch();
  const { farm } = useParams<{ farm?: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const location: any = useLocation();
  const history = useHistory();
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  const { currentWalletNetwork } = useSelector((state: RootState) => state.walletConnector);
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);
  const crucible = useSelector((state: RootState) => state.crucible.selectedCrucible);
  const [addLiquidityUrl, setAddLiquidityUrl] = useState("");

  useEffect(() => {
    if (currentWalletNetwork) {
      getNetworkInfo();
    }
  }, [currentWalletNetwork]);

  const getNetworkInfo = async () => {
    let networkResponse: any = await getNetworkInformationForPublicUser(currentWalletNetwork);
    networkResponse = networkResponse.data && networkResponse.data.body && networkResponse.data.body.network;
    if (networkResponse) {
      let dexUrl = networkResponse.networkCurrencyAddressByNetwork.networkDex.dex.url;
      let addLiquidityUrl = `${dexUrl}add/${crucible.contractAddress}/ETH`;
      setAddLiquidityUrl(addLiquidityUrl);
    }
  };

  const onStakeClick = () => {
    setIsLoading(true);
    let nextStepInfo: any;
    let newFarm: any;
    if (farm === "cFRMx") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx-BNB")}`].stake;
      newFarm = "cFRMx-BNB";
    } else if (farm === "cFRM") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM-BNB")}`].stake;
      newFarm = "cFRM-BNB";
    }
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, newFarm, setIsLoading);
  };

  return (
    <>
      {isLoading ? (
        <FCard>
          <FItem align={"center"}>
            <ClipLoader color="#cba461" loading={true} size={150} />
          </FItem>
        </FCard>
      ) : (
        <FContainer width={700}>
          <CrucibleMyBalance />
          <FCard variant={"secondary"} className="card-crucible-steps">
            <FTypo size={25} weight={700} className={"card-title w-100"} display="flex">
              Crucible Token Sustainable Farming
            </FTypo>
            <ul>
              <li className="step step-success">
                <span className="step-info">
                  <FTypo className={"f-mb-1"} size={22}>
                    Step 1
                  </FTypo>
                  <FTypo size={18}>Congratulations! You have successfully unstaked your {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens! Please proceed to step 2.</FTypo>
                </span>
              </li>
              <li>
                <span className="step-info">
                  <FTypo className={"f-mb-1"} size={22}>
                    Step 2
                  </FTypo>
                  <FTypo size={18}>
                    In order to deposit LP tokens into the {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} LP Farm ({farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}/BNB pair), you will
                    first need to add liquidity.
                    <strong>Click ‘Add Liquidity’ to get started.</strong>
                    <br></br>
                    <br></br>
                    After you add liquidity, you will need to return to this screen and stake the {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} LP tokens.
                  </FTypo>
                  <br></br>
                  <FInputCheckbox
                    onClick={() => setStepTwoCheck(!stepTwoCheck)}
                    name="step2Check"
                    className="f-mb-1 f-mt-1"
                    label={"I understand that in order to earn rewards I need to return to this page after adding liquidity and complete Step 3."}
                  />
                  <FButton title="Add Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepTwoCheck} onClick={() => window.open(addLiquidityUrl, "_blank")} />
                </span>
              </li>
              <li>
                <span className="step-info">
                  <FTypo className={"f-mb-1"} size={22}>
                    Step 3
                  </FTypo>
                  <FTypo size={18}>
                    Congratulations! You have successfully added liquidity. You are now able to stake your {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} LP tokens to start earning
                    rewards!
                  </FTypo>
                  <br></br>
                  <FInputCheckbox
                    onClick={() => setStepThreeCheck(!stepThreeCheck)}
                    name="step3Check"
                    className="f-mb-1 f-mt-1"
                    label={`I have added liquidity of ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} / BNB pair and have the LP tokens. I’m ready to stake my ${
                      farm?.includes("cFRMx") ? "cFRMx" : "cFRM"
                    } LP tokens now.`}
                  />
                </span>
              </li>
              <li className="step-last">
                <FButton
                  title={`Stake ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} LP`}
                  postfix={<IconArrow />}
                  className="w-100"
                  disabled={!stepThreeCheck}
                  onClick={() => onStakeClick()}
                />
              </li>
            </ul>
          </FCard>
        </FContainer>
      )}
    </>
  );
};
