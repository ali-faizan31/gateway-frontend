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
import { STEP_FLOW_IDS } from "../../../common/utils";
import { getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { ClipLoader } from "react-spinners";

export const UnstakeRemoveLiquidity = () => {
  const { farm } = useParams<{ farm?: string }>();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  const [removeLiquidityUrl, setRemoveLiquidityUrl] = useState("");
  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector((state: RootState) => state.crucible);
  const { tokenV2, currentNetworkInformation } = useSelector((state: RootState) => state.walletAuthenticator);

  useEffect(() => {
    if (currentNetworkInformation) {
      let dexUrl = currentNetworkInformation?.networkCurrencyAddressByNetwork?.networkDex?.dex?.url;
      let removeLiquidityUrl = `${dexUrl}pool`;
      setRemoveLiquidityUrl(removeLiquidityUrl);
    }
  }, [currentNetworkInformation]);

  const onStakeClick = () => {
    setIsLoading(true);
    let nextStepInfo: any;
    let newFarm: any;
    if (farm === "cFRM-BNB") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM")}`].stake;
      newFarm = "cFRM";
    } else if (farm === "cFRMx-BNB") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx")}`].stake;
      newFarm = "cFRMx";
    }
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history, newFarm, setIsLoading);
  };

  const onUnwrapClick = () => {
    let nextStepInfo: any;
    let newFarm: any;
    if (farm === "cFRMx-BNB") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRMx-BNB")}`].unwrap;
      newFarm = "cFRMx-BNB";
    } else if (farm === "cFRM-BNB") {
      nextStepInfo = STEP_FLOW_IDS[`${getObjectReadableFarmName("cFRM-BNB")}`].unwrap;
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
        <div className="justify_start align_start d-flex min-100vw new-design-container-paddings-lr f-mb-3">
          <div className="custom-mr-50 f-mt-2">
            <FTypo size={20} weight={700} className={"card-title w-100"} display="flex">
              Crucible Token Sustainable Liquidity Farming
            </FTypo>
            <div className={'congrats-step1-card f-mt-2'}>
              <FTypo className={"f-mb-1"} size={25} weight={700} color="#D9B373">
                Step 1
              </FTypo>
              <FTypo className={"f-mb-2"} size={16} weight={700} color="#FCFCFC">Congratulations! You have successfully unstaked your CAKE-LP {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} -BNB tokens! Please proceed to step 2.</FTypo>
            </div>
            <div className={'congrats-step2-card'}>
              <FTypo className={"f-mb-1"} size={25} weight={700} color="#D9B373">
                Step 2
              </FTypo>
              <FTypo className={"f-mb-1"} size={16} weight={700} color="#FCFCFC">
                In order to unwrap your LP tokens into the {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} and BNB, you will first need to remove liquidity.
                <strong>Click ‘Remove Liquidity’ to get started.</strong>
                <br></br>
                <br></br>
                After you remove liquidity, you will need to return to this screen to either unwrap {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, Stake{" "}
                {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, or simply hold.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                name="step2Check"
                className="f-mb-1 f-mt-1"
                label={`I understand that in order to unwrap or stake ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"
                  } I need to return to this page after removing liquidity and complete Step 3.`}
              />
              <FButton
                title="REMOVE LIQUIDITY"
                className={`w-100 f-mb-2 ${!stepTwoCheck ? 'congrats-disabled-btn' : 'clr_new_black'}`}
                disabled={!stepTwoCheck}
                onClick={() => window.open(removeLiquidityUrl, "_blank")} />
            </div>
            <div className={'congrats-step3-card'}>
              <FTypo className={"f-mb-1"} size={25} weight={700} color="#D9B373">
                Step 3
              </FTypo>
              <FTypo className={"f-mb-1"} size={16} weight={700} color="#FCFCFC">
                Congratulations! You have successfully removed liquidity. You are now able to unwrap or stake your {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                name="step3Check"
                className="f-mb-1 f-mt-1"
                label={`I have removed liquidity of APE LP ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} - BNB pair and have the ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"
                  } tokens. I’m ready to unwrap or stake my ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens.`}
              />
              <div className={'d-flex justify_center align_center w-100 f-mb-1'}>
                <FButton
                  title="STAKE"
                  className={`w-100 custom-mr-10 ${!stepThreeCheck ? 'congrats-disabled-btn' : 'clr_new_black'}`}
                  disabled={!stepThreeCheck}
                  onClick={() => onStakeClick()} />
                <FButton
                  title="UNWRAP"
                  className={`w-100 ${!stepThreeCheck ? 'congrats-disabled-btn' : 'clr_new_black'}`}
                  disabled={!stepThreeCheck}
                  onClick={() => onUnwrapClick()} />
              </div>
            </div>
          </div>
          <div>
            <CrucibleMyBalance />
          </div>
        </div>
        // <FContainer width={700}>
        //   <CrucibleMyBalance />
        //   <FCard variant={"secondary"} className="card-crucible-steps">
        //     <FTypo size={25} weight={700} className={"card-title w-100"} display="flex">
        //       Crucible Token Sustainable Liquidity Farming
        //     </FTypo>
        //     <ul>
        //       <li className="step step-success">
        //         <span className="step-info">
        //           <FTypo className={"f-mb-1"} size={22}>
        //             Step 1
        //           </FTypo>
        //           <FTypo size={18}>
        //             Congratulations! You have successfully unstaked your CAKE-LP {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} -BNB tokens! Please proceed to step 2.
        //           </FTypo>
        //         </span>
        //       </li>
        //       <li>
        //         <span className="step-info">
        //           <FTypo className={"f-mb-1"} size={22}>
        //             Step 2
        //           </FTypo>
        //           <FTypo size={18}>
        //             In order to unwrap your LP tokens into the {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} and BNB, you will first need to remove liquidity.
        //             <strong>Click ‘Remove Liquidity’ to get started.</strong>
        //             <br></br>
        //             <br></br>
        //             After you remove liquidity, you will need to return to this screen to either unwrap {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, Stake{" "}
        //             {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, or simply hold.
        //           </FTypo>
        //           <br></br>
        //           <FInputCheckbox
        //             onClick={() => setStepTwoCheck(!stepTwoCheck)}
        //             name="step2Check"
        //             className="f-mb-1 f-mt-1"
        //             label={`I understand that in order to unwrap or stake ${
        //               farm?.includes("cFRMx") ? "cFRMx" : "cFRM"
        //             } I need to return to this page after removing liquidity and complete Step 3.`}
        //           />
        //           <FButton title="Remove Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepTwoCheck} onClick={() => window.open(removeLiquidityUrl, "_blank")} />
        //         </span>
        //       </li>
        //       <li>
        //         <span className="step-info">
        //           <FTypo className={"f-mb-1"} size={22}>
        //             Step 3
        //           </FTypo>
        //           <FTypo size={18}>
        //             Congratulations! You have successfully removed liquidity. You are now able to unwrap or stake your {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens.
        //           </FTypo>
        //           <br></br>
        //           <FInputCheckbox
        //             onClick={() => setStepThreeCheck(!stepThreeCheck)}
        //             name="step3Check"
        //             className="f-mb-1 f-mt-1"
        //             label={`I have removed liquidity of APE LP ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} - BNB pair and have the ${
        //               farm?.includes("cFRMx") ? "cFRMx" : "cFRM"
        //             } tokens. I’m ready to unwrap or stake my ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens.`}
        //           />
        //         </span>
        //       </li>
        //       <li className="step-last">
        //         <FItem>
        //           <FButton title={`Stake`} className="w-100" disabled={!stepThreeCheck} onClick={() => onStakeClick()} />
        //         </FItem>
        //         <FItem>
        //           <FButton title="Unwrap" className="w-100" disabled={!stepThreeCheck} onClick={() => onUnwrapClick()} />
        //         </FItem>
        //       </li>
        //     </ul>
        //   </FCard>
        // </FContainer>
      )}
    </>
  );
};
