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

    <div className="justify_start align_start d-flex min-100vw new-design-container-paddings-lr">
      <div className="custom-mr-50">
        <CrucibleStake />

        <CrucibleFeeCard />
      </div>
      <div>
        <CrucibleMyBalance />
      </div>
    </div>
    // <FContainer className="card-manage">
    //   <CrucibleMyBalance />

    //   <CrucibleStake />

    //   <CrucibleFeeCard />
    // </FContainer>
  );
};
