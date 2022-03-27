import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {
  FButton,
  FCard,
  FContainer,
  FInputCheckbox,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
// import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { CFRM_BNB_STEP_FLOW_IDS } from "../../../common/utils";
import { getLatestStepToRender } from "../../../common/Helper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";

export const CrucibleStepsPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location: any = useLocation();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector(
    (state: RootState) => state.crucible
  );
  const { tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );

  const onStakeClick = () => {
    let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.stake;
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history
    );
  };

  return (
    <FContainer className="f-mr-0" width={700}>
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-crucible-steps">
        <FTypo
          size={25}
          weight={700}
          className={"card-title w-100"}
          display="flex"
        >
          Crucible Token Sustainable Liquidity Farming teste
        </FTypo>
        <ul>
          <li className="step step-success">
            <span className="step-info">
              <FTypo className={"f-mb-1"} size={22}>
                Step 1
              </FTypo>
              <FTypo size={18}>
                Congratulations! You have successfully minted your cFRM tokens!
                Please proceed to step 2.
              </FTypo>
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"} size={22}>
                Step 2
              </FTypo>
              <FTypo size={18}>
                In order to deposit LP tokens into the cFRM LP Farm (cFRM/BNB
                pair), you will first need to add liquidity.
                <strong>Click ‘Add Liquidity’ to get started.</strong>
                <br></br>
                <br></br>
                After you add liquidity, you will need to return to this screen
                and stake the cFRM LP tokens.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                name="step2Check"
                className="f-mb-1 f-mt-1"
                label={
                  "I understand that in order to earn rewards I need to return to this page after adding liquidity and complete Step 3."
                }
              />
              <FButton
                title="Add Liquidity"
                postfix={<IconArrow />}
                className="w-100"
                disabled={!stepTwoCheck}
              />
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"} size={22}>
                Step 3
              </FTypo>
              <FTypo size={18}>
                Congratulations! You have successfully added liquidity. You are
                now able to stake your APE-LP cFRM-BNB tokens to start earning
                rewards!
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                name="step3Check"
                className="f-mb-1 f-mt-1"
                label={
                  "I have added liquidity of APE-LP cFRM-BNB pair and have the LP tokens. I’m ready to stake my APE-LP cFRM-BNB tokens now."
                }
              />
              {/* <FButton title="Add Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepThreeCheck} /> */}
            </span>
          </li>
          <li className="step-last">
            <FButton
              title="Stake cFRM LP"
              postfix={<IconArrow />}
              className="w-100"
              disabled={!stepThreeCheck}
              onClick={() => onStakeClick()}
            />
          </li>
        </ul>
      </FCard>
    </FContainer>
  );
};
