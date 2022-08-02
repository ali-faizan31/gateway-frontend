import { FGrid, FGridItem, FTypo } from 'ferrum-design-system'
import React from 'react';
import cardImg from '../../../../assets/img/Group278.svg';
import { FCard } from '../../ferrum-design-system/Fcard/Fcard';
const DashboardCards = () => {
    return (
        <>
            <FGrid className={'f-mt-1 f-mb-2'}>
                <FGridItem size={[3, 3, 3]}>
                    <div className={'new_trickCard'}>
                        <div>
                            <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                                Allocation
                            </FTypo>
                            <FTypo size={25} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                98212
                                <FTypo size={16} weight={400} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
                                    TOKEN
                                </FTypo>
                            </FTypo>
                        </div>
                    </div>
                </FGridItem>
                <FGridItem size={[3, 3, 3]}>
                    <div className={'new_trickCard'}>
                        <div>
                            <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                                Claimable
                            </FTypo>
                            <FTypo size={25} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                12
                                <FTypo size={16} weight={400} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
                                    TOKEN
                                </FTypo>
                            </FTypo>
                        </div>
                    </div>
                </FGridItem>
                <FGridItem size={[3, 3, 3]}>
                    <div className={'new_trickCard'}>
                        <div>
                            <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                                Total Claimed
                            </FTypo>
                            <FTypo size={25} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                1234
                                <FTypo size={16} weight={700} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
                                    TOKEN
                                </FTypo>
                            </FTypo>
                        </div>
                    </div>
                </FGridItem>
                <FGridItem size={[3, 3, 3]}>
                    <div className={'new_trickCard'}>
                        <div>
                            <FTypo size={20} weight={400} color="white" className={"f-pb-1"}>
                                Price
                            </FTypo>
                            <FTypo size={25} weight={700} color="#FFFFFF" align={"end"} display="flex" alignY={"end"} className="f-mt--5">
                                123
                                <FTypo size={16} weight={700} color="#DAB46E" className={"f-pl--7 f-pb--1"}>
                                    TOKEN
                                </FTypo>
                            </FTypo>
                        </div>
                    </div>
                </FGridItem>
            </FGrid>
        </>
    )
}
export default DashboardCards;







