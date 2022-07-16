import { FGrid, FGridItem, FItem, FTypo } from 'ferrum-design-system'
import React from 'react'
import { FCard } from '../ferrum-design-system/Fcard/Fcard';
const VestingCards = () => {
    return (
        <>
            <FGrid className={'f-mt-2 f-mb-2'}>
                <FGridItem size={[4, 4, 4]}>
                    <FCard variant={'whiteLabeled'} height={'170px'} >
                        <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                            Total Vesting
                        </FTypo>
                        <FTypo size={25} weight={400} color="#DAB46E" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            123456.789
                            <FTypo size={14} weight={700} color="white" className={"f-pl--7 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FCard>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                    <FCard variant={'whiteLabeled'} height={'170px'}>
                        <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                            Total Claimable
                        </FTypo>
                        <FTypo size={25} weight={400} color="#DAB46E" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            123456.789
                            <FTypo size={14} weight={700} color="white" className={"f-pl--7 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FCard>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                    <FCard variant={'whiteLabeled'} height={'170px'}>
                        <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                            Total Claimed
                        </FTypo>
                        <FTypo size={25} weight={400} color="#DAB46E" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                            123456.789
                            <FTypo size={14} weight={700} color="white" className={"f-pl--7 f-pb--1"}>
                                TOKEN
                            </FTypo>
                        </FTypo>
                    </FCard>
                </FGridItem>
            </FGrid>
        </>
    )
}
export default VestingCards;







