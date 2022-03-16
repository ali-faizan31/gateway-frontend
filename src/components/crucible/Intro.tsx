import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import {
    FButton,
    FCard,
    FCardTitle,
    FContainer,
    FDivider,
    FGridItem,
    FInputText,
    FGrid,
    FLabel, FList,
    FListItem,
    FItem
} from "ferrum-design-system";
import { RootState } from "../../redux/rootReducer"; 
import { RiCheckboxCircleLine, RiArrowRightCircleLine } from "react-icons/ri"
import { PATH_DASHBOARD } from '../../routes/paths';
import { useHistory } from 'react-router';

const Intro = () => {
    const history = useHistory();
    const { walletAddress, isConnected } = useSelector((state: RootState) => state.walletConnector)

    const info = [
        { title: "Dolor sit amet, adipiscing elit. " },
        { title: "Consectetuer adipiscing." },
        { title: "Dolor adipiscing elit. " },
        { title: "Sit amet, consectetuer adipiscing." }
    ]

    return (<>
        <FContainer width={700}>
            <FCard variant="primary">
                <h2 className='primary-color f-mb-1'>Title lorem ipsum sit amet elit.</h2>
                <p className='f-mb-1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>

                <FCard variant={"secondary"} style={{ height: "44px" }}> 
                    <embed type="video/webm" src="" width="600" height="300"></embed>
                </FCard>

                <h3 className='f-mb-1 f-mt-1'> Title lorem ipsum sit amet elit.</h3>
                <p className='f-mb-1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit commodo ligula. </p>


                {info.length && info.map((item, index) => (
                    <FItem key={index}>
                        <span className='f-pr--3'><img src="/ferrum/check.svg"/></span>
                        {item.title} 
                    </FItem>
                ))}

                <FButton title={"Get Started"} className="w-100 f-mt-2 font-size-22" postfix={<img src="/ferrum/Get_Started.svg"/>} onClick={()=>history.push(PATH_DASHBOARD.crucible.mintAndStake)}/>

            </FCard>
        </FContainer>
    </>)
}

export default Intro