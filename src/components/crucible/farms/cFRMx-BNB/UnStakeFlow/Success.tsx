import React from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";
// import { ReactComponent as IconNetworkcFRM } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkcFRMx } from "../../../../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkLeaderboard } from "../../../../../assets/img/icon-network-leaderboard.svg";
// import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { PATH_DASHBOARD } from "../../../../../routes/paths";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { getActualRoute } from "../../../common/Helper";

export const Success = () => {
  const history = useHistory();
  const { farm } = useParams<{ farm?: string }>();
  const onRemoveLiquityClick = () => {
    history.push({
      pathname: getActualRoute(
        farm,
        PATH_DASHBOARD.crucible.crucibleActionRoutes.unstake.steps
      ),
    });
  };

  return (
    <FContainer className="f-mr-0" width={800}>
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-congrats">
        <FItem align="center">
          <IconCongrats />
          <FTypo color="#DAB46E" size={30} weight={600}>
            Congratulations!
          </FTypo>
          <FTypo size={20} weight={500} className="f-mt-1">
            Crucible Token Sustainable Liquidity Farming
          </FTypo>
          <FTypo size={16} className="f-mt-1">
            Congrats! You have successfully unstaked your APE-LP cFRMx - BNB
            tokens. You can now use the tokens to generate even more rewards by
            compounding or trading them. You can also unwrap the APE-LP cFRMx -
            BNB tokens.{" "}
          </FTypo>
        </FItem>
        <FTypo
          size={20}
          weight={500}
          className="f-mt-3 f-mb-3"
          align={"center"}
        >
          Whats next?
        </FTypo>
        <FGrid>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={" item-whats-next"}>
              <div
                className="network-icon-wrapper text-center f-mb-1"
                onClick={() => onRemoveLiquityClick()}
              >
                <span className="icon-wrap">
                  <IconNetworkcFRMx />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Remove Liquidity and Unwrap
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={" item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkLeaderboard />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Go to cFRMx Leaderboard Competition
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkcFRMx />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Mint cFRMx
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkcFRMx />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Trade cFRMx
              </FTypo>
            </FItem>
          </FGridItem>
          <Link to="/dashboard/crucible" className="go-back">
            Go To Crucible Dashboard
          </Link>
        </FGrid>
      </FCard>
    </FContainer>
  );
};
