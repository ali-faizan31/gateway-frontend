import React from "react";
import { FButton, FCard, FContainer, FTypo } from "ferrum-design-system";
import { ReactComponent as IconArrow } from "../../assets/img/icon-arrow-square.svg";
import { useHistory } from "react-router";
import { CrucibleMyBalance } from "./CardMyBalance";

export const CrucibleGetStarted = () => {
  const history = useHistory();
  return (
    <FContainer className="f-mb-2 f-mr-0">
      <CrucibleMyBalance />
      <FCard variant={"secondary"} className="card-get-started">
        <FTypo className="card-title" size={25} weight={700} color="#DAB46E">
          Welcome To The Crucible by Ferrum Network
        </FTypo>
        <FTypo size={18}>
          Watch the explainer video below for a step-by-step tutorial on how to mint, add liquidity, farm, trade, and earn rewards through the
          Crucible!
        </FTypo>
        <div className="video-wrapper f-mt-1 f-mb-1">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/S2m-UV7F89o"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            frameBorder="0"
            allowFullScreen></iframe>
        </div>
        <FTypo size={22} weight={500} className="f-mb-1">
          Crucible Benefits
        </FTypo>
        <FTypo size={18} className="f-mb-2">
          Below are just a few of the incredible features of The Crucible.
        </FTypo>
        <ul>
          <li>Ecosystem of Autonomous Sustainable Farming Pools</li>
          <li>Sustainable Rewards Economy</li>
          <li>Built-in Token Burn</li>
          <li>Mint, Add Liquidity, Farm, Trade, and Earn Rewards</li>
        </ul>
        <FButton title={"Get Started"} postfix={<IconArrow />} className="w-100 f-mt-2" onClick={() => history.push("/dashboard/crucible/manage")} />
      </FCard>
    </FContainer>
  );
};
