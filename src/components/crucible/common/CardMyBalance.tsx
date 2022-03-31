import React, { useEffect, useState } from "react";
import { FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../../assets/img/icon-ferrum.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { getCABNInformation, getTokenInformation, TruncateWithoutRounding } from "../../../utils/global.utils";



export const CrucibleMyBalance = () => {
  const [CBTTokenInfo, setCBTTokenInfo] = useState<any>({});
  const [CBTxTokenInfo, setCBTxTokenInfo] = useState<any>({});
  const [APELPCFRMTokenInfo, setAPELPCFRMTokenInfo] = useState<any>({});
  const [APELPCFRMxTokenInfo, setAPELPCFRMxTokenInfo] = useState<any>({});

  const { walletAddress, networkClient, } = useSelector((state: RootState) => state.walletConnector);


  let CBTxTokenContractAddress = "0x176e6504bfa5edf24d3a2665cc766f16959c2633";
  let CBTTokenContractAddress = "0x1a59bf30d6dc8e8363c90a14c142dcb85825c5a7";
  let APELPCFRMBNBTokenContractAddress = "0x90dc901c3d4481d67934633d0c7f07a24e78b079";
  let APELPCFRMxBNBTokenContractAddress = "0x9205bd849fe296bb2fc50eecde69425ea9ff95f3";


  useEffect(() => {
    getTokenInformation(networkClient, walletAddress, CBTTokenContractAddress, setCBTTokenInfo, CBTTokenInfo);
    getTokenInformation(networkClient, walletAddress, CBTxTokenContractAddress, setCBTxTokenInfo, CBTxTokenInfo);
    getTokenInformation(networkClient, walletAddress, APELPCFRMBNBTokenContractAddress, setAPELPCFRMTokenInfo, APELPCFRMTokenInfo);
    getTokenInformation(networkClient, walletAddress, APELPCFRMxBNBTokenContractAddress, setAPELPCFRMxTokenInfo, APELPCFRMxTokenInfo);
  }, [networkClient])


  useEffect(() => {
    getCABNInformation(CBTTokenContractAddress, setCBTTokenInfo, CBTTokenInfo);
    getCABNInformation(CBTxTokenContractAddress, setCBTxTokenInfo, CBTxTokenInfo);
    getCABNInformation(APELPCFRMBNBTokenContractAddress, setAPELPCFRMTokenInfo, APELPCFRMTokenInfo);
    getCABNInformation(APELPCFRMxBNBTokenContractAddress, setAPELPCFRMxTokenInfo, APELPCFRMxTokenInfo);
  }, [])


  return (
    <FCard className="card-my-balance styled-card align-v">
      <FTypo className="card-title" size={20} color="#DAB46E">
        My Balance
      </FTypo>
      <FList>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={CBTTokenInfo?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{CBTTokenInfo.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(CBTTokenInfo.balance, 3) || 0}
            <FTypo
              size={14}
              weight={600}
              color="#DAB46E"
              className={"f-pl--7 f-pb--1"}
            >
              USD
            </FTypo>
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={APELPCFRMTokenInfo?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{APELPCFRMTokenInfo.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(APELPCFRMTokenInfo.balance, 3) || 0}
            <FTypo
              size={14}
              weight={600}
              color="#DAB46E"
              className={"f-pl--7 f-pb--1"}
            >
              USD
            </FTypo>
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={CBTxTokenInfo?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{CBTxTokenInfo.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(CBTxTokenInfo.balance, 3) || 0}
            <FTypo
              size={14}
              weight={600}
              color="#DAB46E"
              className={"f-pl--7 f-pb--1"}
            >
              USD
            </FTypo>
          </FTypo>
        </FListItem>


        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img src={APELPCFRMxTokenInfo?.logo} height="22px" width="22px" style={{ marginRight: "3px" }} alt="" />
            </span>
            <FTypo>{APELPCFRMxTokenInfo.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(APELPCFRMxTokenInfo.balance, 3) || 0}
            <FTypo
              size={14}
              weight={600}
              color="#DAB46E"
              className={"f-pl--7 f-pb--1"}
            >
              USD
            </FTypo>
          </FTypo>
        </FListItem>
      </FList>
    </FCard>
  );
};

