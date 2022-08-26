import React, { useState } from "react";
import { useHistory } from "react-router";
import { FButton, FCard, FContainer, FInputCheckbox, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../assets/img/icon-arrow-square.svg";
import { CrucibleMyBalance } from "./CardMyBalance";

const CrucibleStepsPage = () => {
  const history = useHistory();
  const [stepTwoCheck, setStepTwoCheck] = useState(false);
  const [stepThreeCheck, setStepThreeCheck] = useState(false);

  return (
    <div className="justify_start align_start d-flex min-100vw new-design-container-paddings-lr f-mb-3">
      <div className="custom-mr-50 f-mt-2">
        <FTypo size={20} weight={700} className={"card-title w-100"} display="flex">
          Crucible Token Sustainable Liquidity Farming
        </FTypo>
        <div className={'congrats-step1-card f-mt-2'}>
          <FTypo className={"f-mb-1"} size={25} weight={700} color="#D9B373">
            Step 1
          </FTypo>
          <FTypo className={"f-mb-2"} size={16} weight={700} color="#FCFCFC">Congratulations! You have successfully minted your cFRM tokens! Please proceed to step 2.</FTypo>
        </div>
        <div className={'congrats-step2-card'}>
          <FTypo className={"f-mb-1"} size={25} weight={700} color="#D9B373">
            Step 2
          </FTypo>
          <FTypo className={"f-mb-1"} size={16} weight={700} color="#FCFCFC">
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
          <FButton
            title="ADD LIQUIDITY"
            className={`w-100 f-mb-2 ${!stepTwoCheck ? 'congrats-disabled-btn' : 'clr_new_black'}`}
            disabled={!stepTwoCheck} />
        </div>
        <div className={'congrats-step3-card'}>
          <FTypo className={"f-mb-1"} size={25} weight={700} color="#D9B373">
            Step 3
          </FTypo>
          <FTypo className={"f-mb-1"} size={16} weight={700} color="#FCFCFC">
            Congratulations! You have successfully added liquidity. You are now able to stake your cFRM LP tokens to start earning rewards!
          </FTypo>
          <br></br>
          <FInputCheckbox
            onClick={() => setStepThreeCheck(!stepThreeCheck)}
            name="step3Check"
            className="f-mb-1 f-mt-1"
            label={"I have added liquidity of cFRM / BNB pair and have the LP tokens. I’m ready to stake my cFRM LP tokens now."}
          />
          <FButton
            title={`Stake cFRM LP`}
            className={`w-100 f-mb-1 ${!stepThreeCheck ? 'congrats-disabled-btn' : 'clr_new_black'}`}
            disabled={!stepThreeCheck}
            onClick={() => history.push("/dashboard/crucible/congrats")} />
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
    //           <FTypo size={18}>Congratulations! You have successfully minted your cFRM tokens! Please proceed to step 2.</FTypo>
    //         </span>
    //       </li>
    //       <li>
    //         <span className="step-info">
    //           <FTypo className={"f-mb-1"} size={22}>
    //             Step 2
    //           </FTypo>
    //           <FTypo size={18}>
    //             In order to deposit LP tokens into the cFRM LP Farm (cFRM/BNB pair), you will first need to add liquidity.
    //             <strong> Click ‘Add Liquidity’ to get started.</strong>
    //             <br></br>
    //             <br></br>
    //             After you add liquidity, you will need to return to this screen and stake the cFRM LP tokens.
    //           </FTypo>
    //           <br></br>
    //           <FInputCheckbox
    //             onClick={() => setStepTwoCheck(!stepTwoCheck)}
    //             name="step2Check"
    //             className="f-mb-1 f-mt-1"
    //             label={"I understand that in order to earn rewards I need to return to this page after adding liquidity and complete Step 3."}
    //           />
    //           <FButton title="Add Liquidity" postfix={<IconArrow />} className="w-100" disabled={!stepTwoCheck} />
    //         </span>
    //       </li>
    //       <li>
    //         <span className="step-info">
    //           <FTypo className={"f-mb-1"} size={22}>
    //             Step 3
    //           </FTypo>
    //           <FTypo size={18}>
    //             Congratulations! You have successfully added liquidity. You are now able to stake your cFRM LP tokens to start earning rewards!
    //           </FTypo>
    //           <br></br>
    //           <FInputCheckbox
    //             onClick={() => setStepThreeCheck(!stepThreeCheck)}
    //             name="step3Check"
    //             className="f-mb-1 f-mt-1"
    //             label={"I have added liquidity of cFRM / BNB pair and have the LP tokens. I’m ready to stake my cFRM LP tokens now."}
    //           />
    //         </span>
    //       </li>
    //       <li className="step-last">
    //         <FButton
    //           title="Stake cFRM LP"
    //           postfix={<IconArrow />}
    //           className="w-100"
    //           disabled={!stepThreeCheck}
    //           onClick={() => history.push("/dashboard/crucible/congrats")}
    //         />
    //       </li>
    //     </ul>
    //   </FCard>
    // </FContainer>
  );
};

export default CrucibleStepsPage;
