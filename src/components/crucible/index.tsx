import { FCard, FContainer } from 'ferrum-design-system';
import React from 'react'
import { jsonTemplate } from './steps-render-engine/ExampleJson'
import RenderStep from './steps-render-engine/RenderStep'
import Intro from './Intro';

const index = () => {
    let step = jsonTemplate.body.stepFlowStepsHistory[0].step[0].name;
    let stepJson = jsonTemplate.body.stepFlowStepsHistory[0].stepFlowStep[0].stepsRenderingJson.json;


    const renderContent = (stepJson: any) => {
        return stepJson.map((element: any, index: any) => { 
            return (<RenderStep key={index} element={element}/>)

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

export default index