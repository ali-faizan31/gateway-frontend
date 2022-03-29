import React, { useState } from "react";
import { useHistory, useParams } from "react-router";
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
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { getActualRoute } from "../../../common/Helper";

export const UnstakeRemoveLiquidity = () => {
  const { farm } = useParams<{ farm?: string }>();
  const history = useHistory();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  const onStakeClick =() => {

  }

  const onUnwrapClick = () => {
    
  }

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
                Congratulations! You have successfully unstaked your APE-LP {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} -BNB tokens!
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
                In order to unwrap your LP tokens into the {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} and BNB, you will first need to remove liquidity.
                <strong>Click ‘Remove Liquidity’ to get started.</strong>
                <br></br>
                <br></br>
                After you remove liquidity, you will need to return to this screen to either unwrap {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, Stake {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"}, or simply hold.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                name="step2Check"
                className="f-mb-1 f-mt-1"
                label={
                  `I understand that in order to unwrap or stake ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} I need to return to this page after removing liquidity and complete Step 3.`
                }
              />
              <FButton
                title="Remove Liquidity"
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
                Congratulations! You have successfully removed liquidity. You are now able to unwrap or stake your {farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens.
              </FTypo>
              <br></br>
              <FInputCheckbox
                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                name="step3Check"
                className="f-mb-1 f-mt-1"
                label={
                  `I have removed liquidity of APE LP ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} - BNB pair and have the ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens. I’m ready to unwrap or stake my ${farm?.includes("cFRMx") ? "cFRMx" : "cFRM"} tokens.`}
              />
              {/* <FButton title="Add Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepThreeCheck} /> */}
            </span>
          </li>
          <li className="step-last">
            <FItem>
              <FButton title={`Stake`} className="w-100" disabled={!stepThreeCheck} onClick={() => onStakeClick()} />
            </FItem>
            <FItem>
              <FButton title="Unwrap" className="w-100" disabled={!stepThreeCheck} onClick={() => onUnwrapClick()} />
            </FItem> 
          </li>
        </ul>
      </FCard>
    </FContainer>
  );
};
