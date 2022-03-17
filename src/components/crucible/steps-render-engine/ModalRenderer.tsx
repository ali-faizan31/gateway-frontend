import React, { useEffect } from 'react'
import {
    FDialog,
    FCard,
    FButton,
    FItem,
    FGridItem,
    FGrid
} from "ferrum-design-system";
import RenderStep from './RenderStep'; 
import { useDispatch } from 'react-redux';
import GetCrucibleActions from "./CrucibleActions";

const ModalRenderer = ({ show, onHide, content, style, type }: any) => {
    // const dispatch = useDispatch();
    // console.log(GetCrucibleActions(type, dispatch));

    // useEffect(() => { 
    //     console.log(GetCrucibleActions(type, dispatch));
    // }, [type])
    
    
    const renderContent = (stepJson: any) => {
        return stepJson.map((element: any, index: any) => {
            return (<RenderStep key={index} element={element} />)

        });
    }

    return (
        <div>
            <FDialog
                show={show}
                size={"medium"}
                onHide={onHide}>

                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    <img src={`/ferrum/${style}.svg`} />
                </FItem>
                <FItem className={"f-mt-2 f-mb-2"} align="center">
                    {renderContent(content)}  
                </FItem>
            </FDialog>
        </div>
    )
}

export default ModalRenderer