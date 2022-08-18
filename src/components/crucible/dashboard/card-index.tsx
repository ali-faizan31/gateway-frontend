import { FGrid, FGridItem } from 'ferrum-design-system'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';
import CrucibleDashboardCards from './crucible-dashboard-card';
const CrucibleDashboardIndex = () => {
    const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
    const tokenExchangePrices = useSelector((state: RootState) => state.crucible.tokenExchange);
    const { tokenData } = useSelector((state: RootState) => state.crucible);
    const DATA_PRICE = [
        { name: "FRMBSC", network: "FRM", price_percentage: "4.8", price: tokenPrices["FRM"] || 0, cruciblePrice: tokenExchangePrices["FRM"] || 0, cNetwork: 'cFRM', cNetworkPrice: tokenPrices["cFRM"] },
        { name: "cFRM", network: "cFRM", price_percentage: "4.8", price: tokenPrices["cFRM"] || 0, cruciblePrice: tokenExchangePrices["cFRM"] || 0, cNetwork: 'FRM', cNetworkPrice: tokenPrices["FRM"] },
        { name: "FRMxBSC", network: "FRMx", price_percentage: "4.8", price: tokenPrices["FRMx"] || 0, cruciblePrice: tokenExchangePrices["FRMx"] || 0, cNetwork: 'cFRMx', cNetworkPrice: tokenPrices["cFRMx"] },
        { name: "cFRMx", network: "cFRMx", price_percentage: "4.8", price: tokenPrices["cFRMx"] || 0, cruciblePrice: tokenExchangePrices["cFRMx"] || 0, cNetwork: 'FRMx', cNetworkPrice: tokenPrices["FRMx"] },
    ];
    return (
        <>
            <FGrid className={'f-mt-1 f-mb-2'}>
                {DATA_PRICE.length
                    ? DATA_PRICE.map((item, index) => {
                        return (
                            <FGridItem size={[3, 3, 3]}>
                                <CrucibleDashboardCards item={item} tokenData={tokenData} />
                            </FGridItem>
                        );
                    })
                    : null}
            </FGrid>
        </>
    )
}
export default CrucibleDashboardIndex;







