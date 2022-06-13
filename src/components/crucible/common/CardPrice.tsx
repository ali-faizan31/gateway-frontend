import React, { useEffect, useRef, useState } from "react";
import {
  FCard,
  //  FGrid,
  //  FGridItem,
  FItem,
  FLabel,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../../assets/img/icon-ferrum.svg";
import { ReactComponent as IconArrowGreen } from "../../../assets/img/icon-price-arrow-indicator-green.svg";
// import { ReactComponent as IconArrowRed } from "../../../assets/img/icon-price-arrow-indicator-red.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { FToggle } from "../../global/switch";
import TokenSupply from "./TokenSupply";

export const CruciblePrice = () => {
  const tokenPrices = useSelector((state: RootState) => state.crucible.tokenPrices);
  const { tokenData } = useSelector((state: RootState) => state.crucible);
  const [isCrucibleValue, setIsCrucibleValue] = useState(false);
  const [isClassChanged, setIsClassChanged] = useState(false);
  const DATA_PRICE = [
    { name: "FRMBSC", network: "FRM", price_percentage: "4.8", price: tokenPrices["FRM"] || 0, cruciblePrice: tokenPrices["cFRM"] || 0, cNetwork: 'cFRM' },
    { name: "cFRM", network: "cFRM", price_percentage: "4.8", price: tokenPrices["cFRM"] || 0, cruciblePrice: tokenPrices["FRM"] || 0, cNetwork: 'FRM' },
    { name: "FRMxBSC", network: "FRMx", price_percentage: "4.8", price: tokenPrices["FRMx"] || 0, cruciblePrice: tokenPrices["cFRMx"] || 0, cNetwork: 'cFRMx' },
    { name: "cFRMx", network: "cFRMx", price_percentage: "4.8", price: tokenPrices["cFRMx"] || 0, cruciblePrice: tokenPrices["FRMx"] || 0, cNetwork: 'FRMx' },
  ];
  const ref: any = useRef(null);
  const refRepeat: any = useRef(null);
  useEffect(() => {
    setIsClassChanged(true);
    setTimeout(function () {
      setIsClassChanged(false);
    }, 100)
  }, [isCrucibleValue])
  return (
    <>
      <TokenSupply />
      <FCard className="card-prices">
        <FItem display={"flex"} alignX="between" alignY={"center"}>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <FTypo className="card-title f-pl-1" size={16} weight={700}>Price</FTypo>
          </FItem>
          <FItem display={"flex"} alignY={"center"} className="w-100 justify-content-end">
            <div className="justify-content-space-between align-item-center f-mb--8">
              <FTypo className="justify-content-end f-pr--7" alignX={'center'} size={12} weight={700}>
                {isCrucibleValue ? 'Crucible' : 'USD'}</FTypo>
              <FToggle isChecked={isCrucibleValue} setIsChecked={setIsCrucibleValue} />
            </div>
          </FItem>
        </FItem>
        <div className={"card-price-wrapper"}>
          {DATA_PRICE.length
            ? DATA_PRICE.map((item, index) => {
              return (
                <FCard variant={"secondary"} className="card-price styled-card align-h" key={index}>
                  <FItem display={"flex"} alignX="between" alignY={"center"}>
                    <FItem display={"flex"} alignY={"center"} className="w-100">
                      <span className="icon-network f-pr--5">
                        <img src={tokenData[item.name]?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
                      </span>
                      <FTypo>{item.network}</FTypo>
                    </FItem>
                    <FTypo color="#28B885" size={14} align={"right"}>
                      {/* <IconArrowGreen width={15} /> */}
                      {/* {item.price_percentage}% */}
                    </FTypo>
                  </FItem>
                  <div ref={ref} className={`zoom-out ${isClassChanged && 'zoom-out-in'}`}>
                    <FTypo size={25} weight={600} align={"end"} display="flex" alignY={"end"} className={`f-mt--5`}>
                      {isCrucibleValue ? item.cruciblePrice : item.price}
                      <FTypo size={12} weight={600} color="#DAB46E" className={"f-pl--2 f-pb--1"}>
                        {isCrucibleValue ? item.cNetwork : 'USD'}
                      </FTypo>
                    </FTypo>
                  </div>
                  <div ref={refRepeat} className={`zoom-in ${isClassChanged && 'zoom-out-in'}`}>
                    <FTypo size={15} weight={400} align={"end"} display="flex" alignY={"end"} className={`f-mt--5`}>
                      {isCrucibleValue ? item.price : item.cruciblePrice}
                      <FTypo size={8} weight={700} color="#DAB46E" className={"f-pl--2 f-pb--1"}>
                        {isCrucibleValue ? 'USD' : item.cNetwork}
                      </FTypo>
                    </FTypo>
                  </div>
                </FCard>
              );
            })
            : null}
        </div>
      </FCard>
    </>
  );
};
