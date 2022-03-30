import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import {
  FButton,
  FCard,
  FGrid,
  FGridItem,
  FItem,
  FSelect,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
// import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import {
  getHumanReadableFarmName,
  getLatestStepToRender,
  getObjectReadableFarmName,
  // getNextStepFlowStepId,
} from "../../../common/Helper";
import {  getBaseTokenName, getCrucibleTokenName, STEP_FLOW_IDS } from "../../../common/utils";

import { ReactComponent as IconNetworkFrm } from "../../../../../assets/img/icon-network-frm.svg";
import IconNetworkCFrmStr from "../../../../../assets/img/icon-network-cfrm.svg";
import IconNetworkFrmx from "../../../../../assets/img/icon-network-frmx.svg";
import IconNetworkCFrmx from "../../../../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkBnb } from "../../../../../assets/img/icon-network-bnb.svg";

export const CrucibleManage = ({
  dashboardAction,
  setDashboardAction,
  setFlowType,
  unwrap,
  setUnwrap,
}: any) => {
  const history = useHistory();
  const location: any = useLocation();
  const dispatch = useDispatch();
  const tokenPrices = useSelector(
    (state: RootState) => state.crucible.tokenPrices
  );
  // const { isConnected } = useSelector(
  //   (state: RootState) => state.walletConnector
  // );
  const { tokenV2 } = useSelector(
    (state: RootState) => state.walletAuthenticator
  );
  const { currentStep, currentStepIndex, stepFlowStepHistory } = useSelector(
    (state: RootState) => state.crucible
  );

  const { farm } = useParams<{ farm?: string }>();

  useEffect(() => { 
    if (location.state === undefined) {
      history.push({ pathname: PATH_DASHBOARD.crucible.index });
    }
    // eslint-disable-next-line
  }, []);

  const onMintcFRMClick = () => {
    console.log(location.state.stepFlowName, "Mint", farm, getObjectReadableFarmName(farm)); 
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].mint;
    console.log('next step id:', nextStepInfo)
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    console.log(nextStepInfo, location.state);
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history,
      true,
      farm
    );
    // history.push({pathname:PATH_DASHBOARD.crucible.cFRM_BNB.mint.mint});
  };

  const onWrapClick = () => {
    let nextStepInfo: any = STEP_FLOW_IDS[`${getObjectReadableFarmName(farm)}`].unwrap;
    console.log(nextStepInfo, location.state);
    location.state.id = nextStepInfo.id;
    location.state.stepFlowName = nextStepInfo.name;
    getLatestStepToRender(
      location.state,
      tokenV2,
      currentStep,
      currentStepIndex,
      stepFlowStepHistory,
      dispatch,
      history,
      true,
      farm
    );
  };

  const [selectedToken, setSelectedToken] = useState<any>();

  const selectTokens = [
    {
      value: "frm",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <IconNetworkFrm />
          </span>{" "}
          <span>FRM</span>
        </FItem>
      ),
    },
    {
      value: "frmx",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <img src={IconNetworkFrmx} alt="network-frmx" />
          </span>{" "}
          <span>FRMx</span>
        </FItem>
      ),
    },
    {
      value: "cfrm",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <img src={IconNetworkCFrmStr} alt="network-cfrm" />
          </span>{" "}
          <span>cFRM</span>
        </FItem>
      ),
    },
    {
      value: "cfrmx",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <img src={IconNetworkCFrmx} alt="network-cfrmx" />
          </span>{" "}
          <span>cFRMx</span>
        </FItem>
      ),
    },
    {
      value: "bnb",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <IconNetworkBnb />
          </span>{" "}
          <span>BNB</span>
        </FItem>
      ),
    },
  ];

  return (
    <FCard variant={"secondary"} className="card-manage-crucible card-shadow">
      <div className="card-title f-mb-2">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={24} weight={700}>
            Crucible Farms Dashboard - {getHumanReadableFarmName(farm)}
          </FTypo>
        </FItem>
        <div className="network-icon-wrapper">
          <span className="icon-wrap">
            <img src={IconNetworkCFrmStr} alt="network-cfrm" />
            <IconNetworkBnb />
          </span>
        </div>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              {getBaseTokenName(farm)} Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              ${tokenPrices[farm!] || 0}
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              {getCrucibleTokenName(farm)} Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              ${tokenPrices[getCrucibleTokenName(farm)!] || 0}
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FGrid className="btn-wrap f-mt-1" spacing={5}>
        <FGridItem size={[4, 4, 4]}>
          <FSelect
            name={"selectOptions"}
            placeholder="Buy Token"
            options={selectTokens}
            value={selectedToken}
            onChange={(option: any) => setSelectedToken(option)}
          />
        </FGridItem>

        <FGridItem size={[4, 4, 4]}>
          <FButton
            title={farm?.includes("cFRM-")? "Mint cFRM" : farm?.includes("cFRMx-") ? "Mint cFRMx" : "Mint"}
            className={"w-100 f-btn-gradiant"}
            onClick={() => onMintcFRMClick()}
          ></FButton>
        </FGridItem>
        <FGridItem size={[4, 4, 4]}>
          <FButton
            variant={"secondary"}
            title={"Unwrap"}
            outlined
            className={"w-100"}
            onClick={() => onWrapClick()}
          ></FButton>
        </FGridItem>
      </FGrid>
    </FCard>
  );
};
