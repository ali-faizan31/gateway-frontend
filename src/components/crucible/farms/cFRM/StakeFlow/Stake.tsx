import React from "react";
import {
  // FButton,
  // FCard,
  FContainer,
  // FGrid,
  // FGridItem,
  // FItem,
  // FResponseBar,
  // FTypo,
} from "ferrum-design-system";
import { Stake as CrucibleStake } from "./StakeCard";
import CrucibleFeeCard from "../common/CrucibleFeeCard";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";

export const Stake = () => {
  // const [dashboardAction, setDashboardAction] = useState(false);
  // const [unwrap, setUnwrap] = useState(false);
  // const [flowType, setFlowType] = useState("");

  return (
    <FContainer className="f-mr-0 card-manage" width={700}>
      <CrucibleMyBalance />

      <CrucibleStake />

      <CrucibleFeeCard />
    </FContainer>
  );
};
