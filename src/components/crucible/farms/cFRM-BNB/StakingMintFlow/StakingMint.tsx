import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { FButton, FCard, FContainer, FInputCheckbox, FItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../../../../assets/img/icon-arrow-square.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import * as SFSH_API from "../../../../../_apis/StepFlowStepHistory";
import * as CrucibleActions from "../../../redux/CrucibleActions";
import { getLatestStepToRender, getObjectReadableFarmName } from "../../../common/Helper";
import toast from "react-hot-toast";
import { STEP_FLOW_IDS } from "../../../common/utils";

export const StakingMintSteps = () => {
    const dispatch = useDispatch();
    const location: any = useLocation();
    const history = useHistory();
    const [stepTwoCheck, setStepTwoCheck] = useState(false);
    const [stepThreeCheck, setStepThreeCheck] = useState(false);
    const { farm } = useParams<{ farm?: string }>();
    const { stepFlowStepHistory, currentStep, currentStepIndex } = useSelector(
        (state: RootState) => state.crucible
    );
    const { tokenV2 } = useSelector(
        (state: RootState) => state.walletAuthenticator
    );

    const onStakeClick = async () => {
        for (let i = 0; i < stepFlowStepHistory.length; i++) {
            await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
                stepFlowStepHistory[i]._id,
                { status: "completed" },
                tokenV2
            );
        }
        // getLatestStepToRender(
        //     location.state,
        //     tokenV2,
        //     currentStep,
        //     currentStepIndex,
        //     stepFlowStepHistory,
        //     dispatch,
        //     history,
        //     false,
        //     farm
        // );
        let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].stake;

        location.state.id = nextStepInfo.id;
        location.state.stepFlowName = nextStepInfo.name;
        getLatestStepToRender(
            location.state,
            tokenV2,
            currentStep,
            currentStepIndex,
            stepFlowStepHistory,
            dispatch,
            history,
            true,
            farm
        );

    }

    const onWhatElseClick = async () => {
        try {
            let updatedCurrentStep: any = {};
            let updHistory: any = [];
            let data: any = {};
            let updateResponse: any = {};


            updatedCurrentStep = { ...currentStep, status: "completed" };
            updHistory = stepFlowStepHistory.map((obj, index) =>
                index === currentStepIndex ? { ...obj, status: "completed" } : obj
            );
            data = { status: "completed" };


            updateResponse =
                await SFSH_API.updateStepsFlowStepsHistoryStatusByAssociatedUserIdByStepsFlowStepsHistoryId(
                    currentStep._id,
                    data,
                    tokenV2
                );
            updateResponse = updateResponse?.data?.body?.stepsFlowStepHistory;
            if (updateResponse) {
                dispatch(
                    CrucibleActions.updateCurrentStep({
                        currentStep: updatedCurrentStep,
                        currentStepIndex: currentStepIndex,
                    })
                );
                dispatch(
                    CrucibleActions.updateStepFlowStepHistory({
                        stepFlowStepHistory: updHistory,
                    })
                );
            }
            getLatestStepToRender(
                location.state,
                tokenV2,
                currentStep,
                currentStepIndex,
                stepFlowStepHistory,
                dispatch,
                history,
                true,
                farm
            );
        } catch (e: any) {
            let errorResponse =
                e &&
                e.response &&
                e.response.data.status &&
                e.response.data.status.message;
            errorResponse
                ? toast.error(`Error Occured: ${errorResponse}`)
                : toast.error(`Error Occured: ${e}`);
        }
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
                            <FTypo>Congratulations! You have successfully minted your cFRM tokens! Please proceed to step 2.
                            </FTypo>
                        </span>
                    </li>
                    <li>
                        <span className="step-info">
                            <FTypo className={"f-mb-1"}>Step 2</FTypo>
                            <FTypo>
                                You are now able to stake your cFRM tokens to start earning rewards!
                            </FTypo>
                            <br></br>
                            <FInputCheckbox
                                onClick={() => setStepTwoCheck(!stepTwoCheck)}
                                name="step2Check"
                                className="f-mb-1 f-mt-1"
                                label={"I understand that I have to stake my cFRM tokens to earn cFRM rewards."}
                            />
                            <FInputCheckbox
                                onClick={() => setStepThreeCheck(!stepThreeCheck)}
                                name="step3Check"
                                className="f-mb-1 f-mt-1"
                                label={"I understand that rewards are generated from cFRM trading volume. To participate in generating rewards for my staked tokens, it is recommended that some of the cFRM tokens should be staked, while others should be used to create trading volume which generates rewards."}
                            />
                        </span>
                    </li>
                    <li className="step-last">
                        <FItem>
                            <FButton title="Stake cFRM" postfix={<IconArrow />} className="w-100" disabled={disableCheck()} onClick={() => onStakeClick()} />
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
