import React from "react";
import { FContainer } from "ferrum-design-system";
import { UnStake as CrucibleUnStake } from "./UnStakeCard";
import CrucibleFeeCard from "../common/CrucibleFeeCard";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";

export const UnStake = () => {
  // const [dashboardAction, setDashboardAction] = useState(false);
  // const [unwrap, setUnwrap] = useState(false);
  // const [flowType, setFlowType] = useState("");

  return (
    <FContainer className="f-mr-0 card-manage" width={900}>
      <CrucibleMyBalance />

      <CrucibleUnStake />

      <CrucibleFeeCard />
    </FContainer>
  );
};
