import { FTypo } from 'ferrum-design-system'
import React from 'react';
const CrucibleDashboardCards = ({ item, tokenData }: any) => {
    return (
        <div className={'crucible-dashboard-card'}>
            <div className={'justify-content-center align_center f-mb-1'}>
                <span className="icon-network">
                    <img src={tokenData[item.name]?.logo} height="30px" width="26px" style={{ marginRight: 3 }} alt="" />
                </span>
                <FTypo size={18} weight={700}>{item.network}</FTypo>
            </div>
            <FTypo size={12} weight={500} color="#6F767E" className={'f-mb--2'}>Price</FTypo>
            <FTypo size={22} weight={600} color="#ffffff">{item.price}</FTypo>
            <div className={'justify-content-space-between align_center f-mt-1'}>
                <div>
                    <FTypo size={16} weight={600}>{item.cNetworkPrice}</FTypo>
                    <FTypo size={12} weight={500} color="#D9B373">{item.cNetwork} Price</FTypo>
                </div>
                <div>
                    <FTypo size={16} weight={600}>{item.cruciblePrice}</FTypo>
                    <FTypo size={12} weight={500} color="#D9B373">{item.network} : {item.cNetwork}</FTypo>
                </div>
            </div>
        </div>
    )
}
export default CrucibleDashboardCards;







