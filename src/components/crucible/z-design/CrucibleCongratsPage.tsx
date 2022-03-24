import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FCard, FContainer, FGrid, FGridItem, FItem, FTypo } from "ferrum-design-system";
import { CrucibleMyBalance } from "./CardMyBalance";
import { ReactComponent as IconCongrats } from "../../assets/img/icon-check-congrats.svg";
import { ReactComponent as IconNetworkCFrm } from "../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBnb } from "../../assets/img/icon-network-bnb.svg";

const CrucibleCongratsPage = () => {
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
            Congrats! You have successfully staked cFRM / BNB LP tokens. You will now earn rewards for every cFRM transaction that generates a fee.
            The reward distribution is proportional to your share of the pool.
          </FTypo>
        </FItem>
        <FTypo size={20} weight={500} className="f-mt-3 f-mb-3" align={"center"}>
          Whats next?
        </FTypo>
        <FGrid>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkCFrm />
                      <IconNetworkBnb />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    cFRMx / BNB Mint and Stake
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>Use cFRM and BNB to add Liquidity and compound rewards with Farming</FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkCFrm />
                      <IconNetworkBnb />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Go to cFRM Leaderboard Competition
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>Check out the cFRM Leaderboard and participate in the competition to generate rewards</FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkCFrm />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Mint cFRM
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>You can always mint more cFRM to increase your pool share.</FTypo>
                </div>
              </div>
            </FItem>
          </FGridItem>
          <FGridItem size={[6, 6, 6]}>
            <FItem bgColor="#1C2229" className={"card-whats-next"}>
              <div className="card-whats-next-inner">
                <div className="card-whats-next-front">
                  <div className="network-icon-wrapper text-center f-mb-1">
                    <span className="icon-wrap">
                      <IconNetworkCFrm />
                    </span>
                  </div>
                  <FTypo size={20} weight={400} align={"center"}>
                    Trade cFRM
                  </FTypo>
                </div>
                <div className="card-whats-next-back">
                  <FTypo>You can always mint more cFRM to increase your pool share.</FTypo>
                </div>
              </div>
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

export default CrucibleCongratsPage;
