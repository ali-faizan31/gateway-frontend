import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
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
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";
import { PATH_DASHBOARD } from "../../../../../routes/paths";

export const Success = () => {
  const history = useHistory();

  const onAddLiquidityClick = () => {
    history.push({ pathname: PATH_DASHBOARD.crucible.cFRMx.mint.steps });
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
            Congratulations! You have successfully minted your cFRMx tokens. You
            can use cFRMx to earn rewards, generate rewards, take advantage of
            arbitrage opportunities between cFRMx, FRMx many more tokens. Check
            out the benefits highlighted below and choose your path.
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
                onClick={() => onAddLiquidityClick()}
              >
                <span className="icon-wrap">
                  <IconNetworkcFRMx />
                  <IconNetworkBsc />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Add Liquidity & Compound Rewards
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
                Stake & Earn Rewards
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
