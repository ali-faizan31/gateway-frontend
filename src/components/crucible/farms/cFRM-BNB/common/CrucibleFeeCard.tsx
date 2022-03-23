import { FCard, FTypo, FGrid, FGridItem, FItem, FButton } from 'ferrum-design-system'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { PATH_DASHBOARD } from '../../../../../routes/paths';

const CrucibleFeeCard = () => {
  const history = useHistory();
    useEffect(() => { 
        console.log('test')
    }, [])
    
    const onClaimRewardsClick = () => {
      history.push({pathname: PATH_DASHBOARD.crucible.cFRM_BNB.withdraw.withdraw})
    }

  return (
    <>
    <FCard className="card-crucible-token-info" width={"95%"}>
        <FTypo size={24}>Crucible Token Info</FTypo>
        <FGrid className="btn-wrap">
          <FGridItem size={[4, 4, 4]}>
            <FItem align={"center"}>
              <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                2%
              </FTypo>
              <FTypo size={20}>Transfer Fee</FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FItem align={"center"}>
              <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                4%
              </FTypo>
              <FTypo size={20}>Unwrap Fee</FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[4, 4, 4]}>
            <FItem align={"center"}>
              <FTypo color="#DAB46E" size={20} weight={700} className="f-pb--2">
                cFRM
              </FTypo>
              <FTypo size={20}>Crucible Token</FTypo>
            </FItem>
          </FGridItem>
        </FGrid>
        <FCard className={"styled-card align-v your-crucible"}>
          <FGrid>
            <FGridItem size={[6, 6, 6]}>
              <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
              <FTypo size={24} weight={600} align={"end"} display="flex" alignY={"end"}>
                13.929
                <FTypo size={14} weight={300} className={"f-pl--7 f-pb--1"}>
                  APE-LP cFRM-BNB
                </FTypo>
              </FTypo>
            </FGridItem>
            <FGridItem size={[6, 6, 6]}>
              <FItem align="right">
                <FTypo color="#DAB46E" size={50} weight={600} align={"end"} display="flex" alignY={"end"}>
                  <FTypo size={16} weight={500} className={"f-pr--7 f-pb--3"} align="right">
                    APR
                  </FTypo>
                  192%
                </FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
        </FCard>
        <FCard className={"your-claimed-rewards"}>
          <FGrid>
            <FGridItem size={[8, 8, 6]}>
              <FTypo className="f-pb--2">Your unclaimed Rewards</FTypo>
              <FTypo size={24} weight={500}>
                7.292 cFRM
              </FTypo>
            </FGridItem>
            <FGridItem size={[4, 4, 6]} alignX="center" alignY={"end"}>
              <FButton title={"Claim"} onClick={()=> onClaimRewardsClick()}></FButton>
            </FGridItem>
          </FGrid>
        </FCard>
      </FCard>
    </>
  )
}

export default CrucibleFeeCard