import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  FButton,
  FCard,
  FGrid,
  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../../../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkCFrm } from "../../../../../assets/img/icon-network-cfrm.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import {
  getActualRoute,
  getHumanReadableFarmName,
} from "../../../common/Helper";
// import { CFRM_BNB_STEP_FLOW_IDS } from "../../../common/utils";

export const CrucibleManage = ({
  dashboardAction,
  setDashboardAction,
  setFlowType,
  unwrap,
  setUnwrap,
}: any) => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  // const dispatch = useDispatch()
  // const location: any = useLocation();
  // const { isConnected } = useSelector((state: RootState) => state.walletConnector);
  // const { tokenV2 } = useSelector((state: RootState) => state.walletAuthenticator);
  // const { currentStep, currentStepIndex, stepFlowStepHistory } = useSelector((state: RootState) => state.crucible);

  // useEffect(() => {
  //   if ( isConnected === false ){
  //     history.push('dashboard/crucible')
  //   }
  // }, [isConnected])

  const onMintClick = () => {
    history.push({
      pathname: getActualRoute(
        farm,
        PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.mint
      ),
    });
  };

  const onUnWrapClick = () => {
    // let nextStepInfo: any = CFRM_BNB_STEP_FLOW_IDS.wrap;
    // location.state.id = nextStepInfo.id;
    // location.state.stepFlowName = nextStepInfo.name;
    // getLatestStepToRender(location.state, tokenV2, currentStep, currentStepIndex, stepFlowStepHistory, dispatch, history);
  };

  return (
    <FCard variant={"secondary"} className="card-manage-crucible card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={30} weight={600}>
            Crucible Farms Dashboard - cFRM
          </FTypo>
        </FItem>
        <div className="network-icon-wrapper">
          <span className="icon-wrap">
            <IconNetworkCFrm />
          </span>
        </div>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              FRM Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={24} className="f-mb-1">
              cFRM Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FGrid className="btn-wrap">
        <FGridItem size={[4, 4, 4]}>
          <FButton title={"Buy Token"} outlined className={"w-100"}></FButton>
        </FGridItem>
        <FGridItem size={[4, 4, 4]}>
          <FButton
            title={"Mint cFRM"}
            outlined
            className={"w-100"}
            onClick={() => onMintClick()}
          ></FButton>
        </FGridItem>
        <FGridItem size={[4, 4, 4]}>
          <FButton
            variant={"secondary"}
            title={"Unwrap"}
            outlined
            className={"w-100"}
            onClick={() => onUnWrapClick()}
          ></FButton>
        </FGridItem>
      </FGrid>
    </FCard>
  );
};
