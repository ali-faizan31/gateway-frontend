import React, { useState } from "react";
import { useHistory } from "react-router";
import { FButton, FCard, FContainer, FGrid, FGridItem, FInputCheckbox, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";

export const CrucibleStepsPage = () => {
  const history = useHistory();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  return (
    <FContainer className="f-mr-0" width={900}>
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-crucible-steps">
        <FTypo size={20} className={"card-title w-100"} display="flex">
          Crucible Token Sustainable Liquidity Farming teste
        </FTypo>
        <ul>
          <li className="step step-success">
            <span className="step-info">
              <FTypo className={"f-mb-1"}>Step 1</FTypo>
              <FTypo>Congratulations! You have successfully unstaked your APE LP cFRMx - BNB tokens! Please proceed to step 2.
              </FTypo>
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"}>Step 2</FTypo>
              <FTypo>
                In order to unwrap your LP tokens into the cFRMx and BNB, you will first need to remove liquidity.
                <strong>Click ‘Remove Liquidity’ to get started.</strong>
                <br></br>
                After you remove liquidity, you will need to return to this screen to either unwrap cFRMx, Stake cFRMx, or simply HODL.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                name="step2Check"
                className="f-mb-1 f-mt-1"
                label={"I understand that in order to unwrap or stake cFRMx I need to return to this page after removing liquidity and complete Step 3."}
              />
              <FButton title="Remove Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepTwoCheck} />
            </span>
          </li>
          <li>
            <span className="step-info">
              <FTypo className={"f-mb-1"}>Step 3</FTypo>
              <FTypo>
                Congratulations! You have successfully removed liquidity. You are now able to unwrap or stake your cFRMx tokens.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                name="step3Check"
                className="f-mb-1 f-mt-1"
                label={"I have removed liquidity of APE LP cFRMx - BNB pair and have the cFRMx tokens. I’m ready to unwrap or stake my cFRMx tokens."}
              />
              {/* <FButton title="Add Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepThreeCheck} /> */}
            </span>
          </li>
          <li className="step-last">
            <FButton
              title="Stake"
              postfix={<IconArrow />}
              className="w-100"
              style={{ marginRight: "10px" }}
              disabled={!stepThreeCheck}
              onClick={() => history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.stake.stake })}
            />
            <FButton
              title="Unwrap"
              postfix={<IconArrow />}
              className="w-100"
              disabled={!stepThreeCheck}
              onClick={() => history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.unwrap.unwrap })}
            />
          </li>
        </ul>
      </FCard>
    </FContainer>
  );
};
