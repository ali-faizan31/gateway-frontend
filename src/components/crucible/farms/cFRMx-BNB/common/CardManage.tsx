import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
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
import { useSelector } from "react-redux";
// import { RootState } from "../../../../../redux/rootReducer";
import { PATH_DASHBOARD } from "../../../../../routes/paths";

import { ReactComponent as IconNetworkFrm } from "../../../../../assets/img/icon-network-frm.svg";
import IconNetworkCFrmStr from "../../../../../assets/img/icon-network-cfrm.svg";
import IconNetworkFrmx from "../../../../../assets/img/icon-network-frmx.svg";
import IconNetworkCFrmx from "../../../../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkBnb } from "../../../../../assets/img/icon-network-bnb.svg";
import { getActualRoute } from "../../../common/Helper";

export const CrucibleManage = ({
  dashboardAction,
  setDashboardAction,
  setFlowType,
  unwrap,
  setUnwrap,
}: any) => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  // const location: any = useLocation();
  // const { isConnected } = useSelector((state: RootState) => state.walletConnector);
  //@ts-ignore
  const tokenPrices = useSelector((state) => state.crucible.tokenPrices);
  // useEffect(() => {
  //   if ( isConnected === false ){
  //     history.push('dashboard/crucible')
  //   }
  // }, [isConnected])

  const onMintcFRMxClick = () => {
    history.push({
      pathname: getActualRoute(
        farm,
        PATH_DASHBOARD.crucible.crucibleActionRoutes.mint.mint
      ),
    });
  };

  const onWrapClick = () => {
    history.push({
      pathname: getActualRoute(
        farm,
        PATH_DASHBOARD.crucible.crucibleActionRoutes.unwrap.unwrap
      ),
    });
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
            Crucible Farms Dashboard - cFRMx / BNB
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
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              ${tokenPrices["FRM"] || 0}
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              cFRMx Price (USD)
            </FTypo>
            <FTypo size={36} weight={500}>
              ${tokenPrices["cFRMx"] || 0}
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FGrid className="btn-wrap f-mt-1 " spacing={5}>
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
            title={"Mint cFRMx"}
            className={"w-100  f-btn-gradiant"}
            onClick={() => onMintcFRMxClick()}
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
