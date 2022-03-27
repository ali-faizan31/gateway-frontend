import React from "react";
import { Link } from "react-router-dom";
import {
  FCard,
  FContainer,
  FGrid,
  FGridItem,
  FItem,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconCongrats } from "../../../../../assets/img/icon-check-congrats.svg";
import { ReactComponent as IconNetworkcFRM } from "../../../../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkcFRMx } from "../../../../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkLeaderboard } from "../../../../../assets/img/icon-network-leaderboard.svg";
import { ReactComponent as IconNetworkBsc } from "../../../../../assets/img/icon-network-bnb.svg";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";

export const Success = () => {
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
            Congrats! You have successfully staked cFRM tokens. You will now
            earn rewards for every cFRM transaction that generates a fee. To
            amplify your rewards by ~4x, consider Adding Liquidity for cFRM /
            BNB and staking the LP tokens. The reward distribution is
            proportional to your share of the pool.{" "}
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
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkcFRM />
                  <IconNetworkBsc />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Try cFRM / BNB Sustainable Farming
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
                Go to cFRM Leaderboard Competition
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
                Mint and Stake cFRMx
              </FTypo>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"item-whats-next"}>
              <div className="network-icon-wrapper text-center f-mb-1">
                <span className="icon-wrap">
                  <IconNetworkcFRM />
                </span>
              </div>
              <FTypo size={20} weight={400} align={"center"}>
                Trade cFRM
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
