import { FButton, FCard, FContainer, FInputText } from 'ferrum-design-system'
import React, { useEffect, useState } from 'react'
import { RiArrowRightCircleLine } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { RootState } from '../../redux/rootReducer';
import { PATH_DASHBOARD } from '../../routes/paths';

const MintAndStake = () => {
    const history = useHistory();
    const mintToken = 'FRM';
    const { userProfile  } = useSelector((state: RootState) => state.walletApplicationWrapper);
    const [isApproved, setIsApproved] = useState(false);
    const [isApproving, setIsApproving] = useState(false);
    const [approvedModal, setApprovedModal] = useState(false);
    
   
    return (
        <>
            <FContainer width={700}>
                <FCard variant="primary">
                    <h2 className='primary-color f-mb-1'>Title lorem ipsum sit amet elit.</h2>
                    <p className='f-mb-1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>

                    <h3 className='f-mb-1 f-mt-1'> Mint crucible with ${mintToken}</h3>

                    <FInputText 
                        placeholder={`Enter ${mintToken}`}   
                        prefix={<img src=""/>}
                        postfix={<strong className='primary-color f-pr-1' onClick={()=> console.log("max")}> Max </strong>}
                    />

                    <p className='f-mb-1 f-mt-1'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. </p>

                    <FButton title={"Approve"} className="w-100 f-mt-2 " postfix={<RiArrowRightCircleLine />} onClick={() => setIsApproving(true)} />

                </FCard>
            </FContainer>
        </>
    )
}

export default MintAndStake