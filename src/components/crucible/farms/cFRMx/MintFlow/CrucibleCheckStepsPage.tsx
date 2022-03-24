import React, { useState } from "react";
import { useHistory } from "react-router";
import { FButton, FCard, FContainer, FGrid, FInputCheckbox, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { PATH_DASHBOARD } from "../../../../../routes/paths";

export const CrucibleStepsPage = () => {
  const history = useHistory();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  const onStakeClick = () => {
    history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx.stake.stake });
  }

  const onWhatElseClick = () => {
    history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx.mint.success });
  }

  const disableCheck = () => {
    return (!stepTwoCheck) || (!stepThreeCheck)
  }

  return (
    <FContainer className="f-mr-0" width={900}>
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-crucible-steps">
        <FTypo size={20} className={"card-title w-100"} display="flex">
          Crucible Token Sustainable Farming
        </FTypo>
        <ul>
          <li className="step step-success">
            <span className="step-info">
              <FTypo className={"f-mb-1"}>Step 1</FTypo>
              <FTypo>Congratulations! You have successfully minted your cFRMx tokens! Please proceed to step 2.
              </FTypo>
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"}>Step 2</FTypo>
              <FTypo>
                You are now able to stake your cFRMx tokens to start earning rewards!
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                name="step2Check"
                className="f-mb-1 f-mt-1"
                label={"I understand that I have to stake my cFRMx tokens to earn cFRMx rewards."}
              />
              <FInputCheckbox
                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                name="step3Check"
                className="f-mb-1 f-mt-1"
                label={"I understand that rewards are generated from cFRMx trading volume. To participate in generating rewards for my staked tokens, it is recommended that some of the cFRMx tokens should be staked, while others should be used to create trading volume which generates rewards."}
              />
            </span>
          </li>
          <li className="step-last">
            <FItem>
              <FButton title="Stake cFRMx" postfix={<IconArrow />} className="w-100" disabled={disableCheck()} onClick={() => onStakeClick()} />
            </FItem>
            <FItem>
              <FButton title="What Else Can I Do?" postfix={<IconArrow />} className="w-100" disabled={disableCheck()} onClick={() => onWhatElseClick()} />
            </FItem>
          </li>
        </ul>
      </FCard>
    </FContainer>
  );
};
