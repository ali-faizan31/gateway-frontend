import { FTypo } from 'ferrum-design-system';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { ClipLoader } from 'react-spinners'; 
import { RootState } from '../../../redux/rootReducer';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { getLatestStepWithPendingStatus } from '../../../utils/global.utils';
import { getStepFlowStepByStepFlowIdForPublic } from '../../../_apis/StepFlowStepCrud';
import { getLatestStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId, startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId } from '../../../_apis/StepFlowStepHistory';
import * as CrucibleActions from "../redux/CrucibleActions";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import {CrucibleClient} from './../../../container-components/web3Client/crucibleClient';
import {Web3Helper} from './../../../container-components/web3Client/web3Helper';

export const Deployer = () => {
    const location: any = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const { isConnected, isConnecting } = useSelector((state: RootState) => state.walletConnector);
    const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);

    // useEffect(() => {
    //     if ( isConnected === false ){
    //         dispatch(CrucibleActions.resetCrucible());
    //         history.push(PATH_DASHBOARD.crucible.index)
    //     }
    // }, [isConnected])

    useEffect(() => {
        setIsLoading(true);
        if (isConnected && tokenV2) {
            getStepToRender(location.state.id, location.state.name, tokenV2)
        } else if (isConnected === false) {
            history.push({ pathname: PATH_DASHBOARD.crucible.public, state: location.state })
        }
    }, [location])


    const getStepToRender = async (id: any, name: any, tokenV2: any) => {
        let stepResponse: any = [];
        if (tokenV2) {
            switch(name){
                case "cFRM / BNB": history.push({ pathname: `/dashboard/crucible/cFRM-BNB/${location.state.contract}/introduction`, state: location.state }); break;
                case "cFRMx / BNB": history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx_BNB.introduction, state: location.state }); break;
                case "cFRM": history.push({ pathname:`/dashboard/crucible/cFRM/${location.state.contract}/introduction`, state: location.state }); break;
                case "cFRMx": history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx.introduction, state: location.state }); break;
                default: history.push(PATH_DASHBOARD.crucible.index); break;
            }

            // history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.introduction, state: location.state })
            // stepResponse = await getLatestStepFlowStepHistoryByAssociatedUserIdByStepFlowStepId(id, tokenV2);
            // stepResponse = stepResponse.data.body.stepFlowStepsHistory;
            // dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: stepResponse }));
            // if (stepResponse.length > 0) {
            //     const step: any = getLatestStepWithPendingStatus(stepResponse); // undefined check implement to reatrt sequence 
            //     if (step === undefined) {
            //         let restartResponse = await startNewStepFlowStepHistorySequenceByAssociatedUserIdByStepFlowId(id, tokenV2);
            //         //restart flow
            //     }
            //     dispatch(CrucibleActions.updateCurrentStep({ currentStep: step }));
            //     const splitted = step.stepFlowStep.name.split("-");
            //     let stepFlowName = splitted[0];
            //     renderComponent(step?.step?.name, stepFlowName.trim(), id);
            // }
        }
        // else {
        //     stepResponse = await getStepFlowStepByStepFlowIdForPublic(id);
        //     dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: stepResponse.data.body.stepsFlowStep }));
        //     let step = (stepResponse.data.body.stepsFlowStep[0]);
        //     dispatch(CrucibleActions.updateCurrentStep({ currentStep: step }));
        //     const splitted = step.name.split("-");
        //     let word = splitted[splitted.length - 1];
        //     renderComponent(word.trim(), id); 
        // }
    }

    const renderComponent = (stepName: any, stepFlowStepName: any, id: any) => {
        switch (stepFlowStepName) {
            case "cFRM / BNB Crucible Farm":
                switch (stepName) {
                    case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.introduction, state: location.state })
                    case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.cFRM_BNB.manage, state: location.state })
                    default: return history.push(PATH_DASHBOARD.crucible.index);
                }
                break;
            case "cFRMx / BNB Crucible Farm":
                switch (stepName) {
                    case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: location.state })
                    case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: location.state })
                }
                break;
            case "cFRM Crucible Farm":
                switch (stepName) {
                    case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: location.state })
                    case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: location.state })
                }
                break;
            case "cFRMx Crucible Farm":
                switch (stepName) {
                    case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: location.state })
                    case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: location.state })
                }
                break;
            default: return history.push(PATH_DASHBOARD.crucible.index);
        }
    }


    return (
        <>
            <Toaster />
            {isLoading && <ClipLoader color="#cba461" loading={true} size={150} />}
        </>
    )
}
