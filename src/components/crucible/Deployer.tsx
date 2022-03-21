import { FTypo } from 'ferrum-design-system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { ClipLoader } from 'react-spinners';
import { RootState } from '../../redux/rootReducer';
import { PATH_DASHBOARD } from '../../routes/paths';
import { getLatestStepWithPendingStatus } from '../../utils/global.utils';
import { getStepFlowStepByStepFlowIdForPublic } from '../../_apis/StepFlowStepCrud';
import { getUserLatestStepFlowStepHistoryByStepFlowId } from '../../_apis/StepFlowStepHistory';
import * as CrucibleActions from "./redux/CrucibleActions";

export const Deployer = () => {
    const { state: stepFlowId }: any = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const { isConnected, isConnecting } = useSelector((state: RootState) => state.walletConnector);
    const { meV2, tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator); 

    useEffect(() => {
        setIsLoading(true);
        if (tokenV2) {
            getStepToRender(stepFlowId, tokenV2)
        } else {
            getStepToRender(stepFlowId, false)
        }
    }, [stepFlowId])

   

    const getStepToRender = async (id: any, tokenV2: any) => {
        let stepResponse: any = [];
        if ( tokenV2 ) {
            stepResponse = await getUserLatestStepFlowStepHistoryByStepFlowId(id, tokenV2);
            stepResponse = stepResponse.data.body.stepFlowStepsHistory;
            dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: stepResponse }));
            if ( stepResponse.length > 0){
                const step: any = getLatestStepWithPendingStatus(stepResponse); // undefined check implement to reatrt sequence 
                renderComponent(step?.step?.name, id);  
            }
        } else {
            stepResponse = await getStepFlowStepByStepFlowIdForPublic(id);
            dispatch(CrucibleActions.updateStepFlowStepHistory({ stepFlowStepHistory: stepResponse.data.body.stepsFlowStep }));
            let step = (stepResponse.data.body.stepsFlowStep[0]);
            const splitted = step.name.split("-");
            let word = splitted[splitted.length - 1];
            renderComponent(word.trim(), id); 
        }
    }

    const renderComponent = (name: any, id: any) => {
        switch (name) {
            case "Introduction": return history.push({ pathname: PATH_DASHBOARD.crucible.getStarted, state: id })
            case "Crucible Farming Dashboard": return history.push({ pathname: PATH_DASHBOARD.crucible.manage, state: id })
        }
    }

    return (
        <>
            {isLoading && <ClipLoader color="#cba461" loading={true} size={150} />}
        </>
    )
}
