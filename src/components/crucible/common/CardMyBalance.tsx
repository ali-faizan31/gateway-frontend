import React, { useEffect, useState } from "react";
import { FCard, FItem, FList, FListItem, FTypo } from "ferrum-design-system";
import { ReactComponent as IconFerrum } from "../../../assets/img/icon-ferrum.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import * as CrucibleActions from "../redux/CrucibleActions";
import {
  getCABNInformation,
  getTokenInformationFromWeb3,
  TruncateWithoutRounding,
} from "../../../utils/global.utils";
import {
  CBTTokenContractAddress,
  CBTxTokenContractAddress,
  APELPCFRMBNBTokenContractAddress,
  APELPCFRMxBNBTokenContractAddress,
} from "../../../utils/const.utils";

export const CrucibleMyBalance = () => {
  const dispatch = useDispatch();
  const [CBTTokenInfo, setCBTTokenInfo] = useState<any>({});
  const [CBTxTokenInfo, setCBTxTokenInfo] = useState<any>({});
  const [APELPCFRMTokenInfo, setAPELPCFRMTokenInfo] = useState<any>({});
  const [APELPCFRMxTokenInfo, setAPELPCFRMxTokenInfo] = useState<any>({});

  const { tokenData } = useSelector((state: RootState) => state.crucible);

  useEffect(() => {
    console.log(tokenData);
    // getTokenInformation(networkClient, walletAddress, CBTTokenContractAddress, setCBTTokenInfo, CBTTokenInfo, dispatch);
    // getCABNInformation(CBTTokenContractAddress, setCBTTokenInfo, CBTTokenInfo);
    // getTokenInformation(networkClient, walletAddress, CBTxTokenContractAddress, setCBTxTokenInfo, CBTxTokenInfo);
    // getCABNInformation(CBTxTokenContractAddress, setCBTxTokenInfo, CBTxTokenInfo);
    // getTokenInformation(networkClient, walletAddress, APELPCFRMBNBTokenContractAddress, setAPELPCFRMTokenInfo, APELPCFRMTokenInfo);
    // getCABNInformation(APELPCFRMBNBTokenContractAddress, setAPELPCFRMTokenInfo, APELPCFRMTokenInfo);
    // getTokenInformation(networkClient, walletAddress, APELPCFRMxBNBTokenContractAddress, setAPELPCFRMxTokenInfo, APELPCFRMxTokenInfo);
    // getCABNInformation(APELPCFRMxBNBTokenContractAddress, setAPELPCFRMxTokenInfo, APELPCFRMxTokenInfo);
  }, []);

  return (
    <FCard className="card-my-balance styled-card align-v">
      <FTypo className="card-title" size={20} color="#DAB46E">
        My Balance
      </FTypo>
      <FList>
        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img
                src={tokenData["CBTToken"]?.logo}
                height="22px"
                width="22px"
                style={{ marginRight: "3px" }}
                alt=""
              />
            </span>
            <FTypo>{tokenData["CBTToken"]?.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(tokenData["CBTToken"]?.balance, 3) || 0}
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img
                src={tokenData["APELPCFRMBNB"]?.logo}
                height="22px"
                width="22px"
                style={{ marginRight: "3px" }}
                alt=""
              />
            </span>
            <FTypo>{tokenData["APELPCFRMBNB"]?.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(tokenData["APELPCFRMBNB"]?.balance, 3) ||
              0}
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img
                src={tokenData["CBTxToken"]?.logo}
                height="22px"
                width="22px"
                style={{ marginRight: "3px" }}
                alt=""
              />
            </span>
            <FTypo>{tokenData["CBTxToken"]?.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(tokenData["CBTxToken"]?.balance, 3) || 0}
          </FTypo>
        </FListItem>

        <FListItem>
          <FItem display={"flex"} alignY={"center"} className="w-100">
            <span className="icon-network f-pr--5">
              <img
                src={tokenData["APELPCFRMxBNB"]?.logo}
                height="22px"
                width="22px"
                style={{ marginRight: "3px" }}
                alt=""
              />
            </span>
            <FTypo>{tokenData["APELPCFRMxBNB"]?.symbol}</FTypo>
          </FItem>
          <FTypo
            size={30}
            weight={600}
            align={"end"}
            display="flex"
            alignY={"end"}
          >
            {TruncateWithoutRounding(tokenData["APELPCFRMxBNB"]?.balance, 3) ||
              0}
          </FTypo>
        </FListItem>
      </FList>
    </FCard>
  );
};
