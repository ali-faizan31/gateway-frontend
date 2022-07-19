import { FContainer, FGrid, FGridItem, FTypo } from 'ferrum-design-system'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { FCard } from '../ferrum-design-system/Fcard/Fcard';
import VestingCards from './vesting-card';
import leftIcon from '../ferrum-design-system/assets/img/f-icons/icon-arrow-dark.svg';
import { PATH_DASHBOARD } from '../../../routes/paths';
const VestingInformationTable = () => {
    const history = useHistory();
    return (
        <>
            <FContainer type="fluid" className={'bg_black h-100'}>
                <div className="f-mt-2 f-mb-2 d_flex justify_start align_center f-ml-1">
                    <div className={'round img_29 bg_white d_flex justify_center align_center f-mr-1'}
                        onClick={() => history.push(PATH_DASHBOARD.vesting.adminDashboard)}>
                        <img src={leftIcon} alt={leftIcon} style={{ width: 14, height: 14 }} />
                    </div>
                    <p className={'primaryColor custom-font-size-18 font-700'}>View Vesting</p>
                </div>
                <div className="d_flex align_center justify_end">
                    <div className="bg_white d_flex justify_center implementation_box">
                        <p className={'custom-font-size-16 font-400 clr_black_new f-mt-1'}>Status: Implemented</p>
                    </div>
                </div>
                <div className={'position_relative'} style={{ marginTop: '-30px' }}>
                    <FCard variant={'whiteLabeled'}>
                        <FGrid>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Title Round
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    Seed Round
                                </FTypo>
                            </FGridItem>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Vesting
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    10% at TGE, 1 month cliff + 7 months linear
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                        <FGrid>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Allocation
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    9.999.999
                                </FTypo>
                            </FGridItem>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Networks
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    BEP20
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                        <FGrid>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Vesting Release Start Date
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    00-00-0000 00:00:00
                                </FTypo>
                            </FGridItem>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Frequency of release
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    Release every hour
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                        <FGrid>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Locking Period (Cliff)
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    30 Days
                                </FTypo>
                            </FGridItem>
                            <FGridItem alignX="left" size={[6, 6, 6]} className={"f-mt-1"}>
                                <FTypo size={16} weight={400} color="white" className={"f-pb--7"}>
                                    Files
                                </FTypo>
                                <FTypo size={18} weight={700} color="#DAA961">
                                    sample.svg
                                </FTypo>
                            </FGridItem>
                        </FGrid>
                    </FCard>
                </div>
                <VestingCards />
            </FContainer>
        </>
    )
}
export default VestingInformationTable;







