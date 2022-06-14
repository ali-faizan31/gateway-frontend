import { FGrid, FGridItem, FItem, FTypo } from 'ferrum-design-system';
import MintedIcon from "../../../assets/img/plus.svg";
import RemovedIcon from "../../../assets/img/minus.svg";
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/rootReducer';

const TokenSupply = () => {
    const { tokenSupplyData } = useSelector((state: RootState) => state.crucible);


    const getCrucibleTokenSupply = (isMinted: any, tokens: any) => {

        return <>
            <FGrid className="info-bar">
                <FGridItem size={[3, 3, 3]}>
                    <FItem display={"flex"} alignY={"center"} >
                        <FTypo size={12} weight={400} align={"end"} display="flex" alignY={"center"}>
                            <img src={isMinted ? MintedIcon : RemovedIcon} alt="" className='f-mt--3' />
                            <FTypo size={10} display="flex" weight={400} color="#DAB46E" className={"f-pl--2 f-pr--2 f-pb--1 f-mt--5"}>
                                {isMinted ? `MINTED` : `REMOVED`}
                            </FTypo>
                        </FTypo>
                    </FItem>
                </FGridItem>
                <FGridItem size={[5, 5, 5]}>
                    <FItem align={"center"}>
                        <FTypo size={12} weight={400} align={"end"} display="flex" alignY={"end"} className="tooltip f-mt--5 cursor-default">
                            {tokenSupplyData["cFRM"]?.supply}
                            <FTypo size={10} display="flex" weight={400} color="#DAB46E" className={"f-pl--4"}>
                                {tokens.first}
                            </FTypo>
                            <span className="tooltiptext custom-font-size-10">
                                {isMinted ? `Total ${tokens.first} Minted` : ` ${tokens.first} Removed from circulation`}
                            </span>
                        </FTypo>
                    </FItem>
                </FGridItem>
                <FGridItem size={[4, 4, 4]}>
                    <FItem align={"center"}>
                        <FTypo size={12} weight={400} align={"end"} display="flex" alignY={"end"} className="tooltip f-mt--5 cursor-default">
                            {tokenSupplyData["cFRMx"]?.supply}
                            <FTypo size={10} display="flex" weight={400} color="#DAB46E" className={"f-pl--4"}>
                                {tokens.second}
                            </FTypo>
                            <span className="tooltiptext custom-font-size-10">
                                {isMinted ? `Total ${tokens.second} Minted` : ` ${tokens.second} Removed from circulation`}
                            </span>
                        </FTypo>
                    </FItem>
                </FGridItem>
            </FGrid>
        </>
    }


    return (
        <>
            <div className="justify-content-end card-prices">
                <div className={'open-cap-label minted-removed-label'}> {getCrucibleTokenSupply(true, { first: 'cFRM', second: 'cFRMx' })}</div>
                <div className={'open-cap-label minted-removed-label'}> {getCrucibleTokenSupply(false, { first: 'FRM', second: 'FRMx' })}</div>
            </div>
        </>
    )
}

export default TokenSupply