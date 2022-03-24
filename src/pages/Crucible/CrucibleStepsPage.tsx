import React, { useState } from "react";
import { useHistory } from "react-router";
import { FButton, FCard, FContainer, FInputCheckbox, FItem, FTypo } from "ferrum-design-system";
import { CrucibleMyBalance } from "../../components/crucible/CardMyBalance";
import { ReactComponent as IconArrow } from "../../assets/img/icon-arrow-square.svg";

const CrucibleStepsPage = () => {
  const history = useHistory();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  return (
    <FContainer className="f-mr-0">
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-crucible-steps">
        <FTypo size={25} weight={700} className={"card-title w-100"} display="flex">
          Crucible Token Sustainable Liquidity Farming
        </FTypo>
        <ul>
          <li className="step step-success">
            <span className="step-info">
              <FTypo className={"f-mb-1"} size={22}>
                Step 1
              </FTypo>
              <FTypo size={18}>Congratulations! You have successfully minted your cFRM tokens! Please proceed to step 2.</FTypo>
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"} size={22}>
                Step 2
              </FTypo>
              <FTypo size={18}>
                In order to deposit LP tokens into the cFRM LP Farm (cFRM/BNB pair), you will first need to add liquidity.
                <strong> Click ‘Add Liquidity’ to get started.</strong>
                <br></br>
                <br></br>
                After you add liquidity, you will need to return to this screen and stake the cFRM LP tokens.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                name="step2Check"
                className="f-mb-1 f-mt-1"
                label={"I understand that in order to earn rewards I need to return to this page after adding liquidity and complete Step 3."}
              />
              <FButton title="Add Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepTwoCheck} />
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"} size={22}>
                Step 3
              </FTypo>
              <FTypo size={18}>
                Congratulations! You have successfully added liquidity. You are now able to stake your cFRM LP tokens to start earning rewards!
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                name="step3Check"
                className="f-mb-1 f-mt-1"
                label={"I have added liquidity of cFRM / BNB pair and have the LP tokens. I’m ready to stake my cFRM LP tokens now."}
              />
            </span>
          </li>
          <li className="step-last">
            <FButton
              title="Stake cFRM LP"
              postfix={<IconArrow />}
              className="w-100"
              disabled={!stepThreeCheck}
              onClick={() => history.push("/dashboard/crucible/congrats")}
            />
          </li>
        </ul>
      </FCard>
    </FContainer>
  );
};

export default CrucibleStepsPage;
