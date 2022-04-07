import React, { useEffect, useState } from 'react';
import { FCard, FContainer } from 'ferrum-design-system'; 
import { useParams } from 'react-router';
import { TOKEN_TAG } from '../../../utils/const.utils';
import { getStepFlowStepByAssociatedOrganizationByStepFlowStepId } from '../../../_apis/StepFlowStepCrud';
import RenderStep from './RenderStep';

const Index = () => {
    const { id }: any = useParams();
    const [stepJson, setStepJson] = useState([]);

    useEffect(() => { 
        if (id && id !== ":id") {
            getStepFlowStepInformation(id);
        }
    }, [id])


    const getStepFlowStepInformation = async (id: any) => {
        let res = await getStepFlowStepByAssociatedOrganizationByStepFlowStepId(id, localStorage.getItem(TOKEN_TAG))
        setStepJson(res.data.body.stepFlowStep.stepsRenderingJson.json);
        console.log(res.data.body.stepFlowStep.stepsRenderingJson.json)
    }

    const renderContent = (stepJson: any) => {
        return stepJson.map((element: any, index: any) => {
            return (<RenderStep key={index} element={element} />)

        });
    }

    return (<>
        <FContainer width={700}>
            <FCard variant="primary">
                {renderContent(stepJson)}

            </FCard>
        </FContainer>
    </>)
}

export default Index
