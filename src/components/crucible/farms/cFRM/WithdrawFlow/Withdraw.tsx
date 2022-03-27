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
import { Withdraw as CrucibleWithdraw } from "./WithdrawCard";
import CrucibleWithdrawFeeCard from "../common/CrucibleWithdrawFeeCard";
import { CrucibleMyBalance } from "../../../common/CardMyBalance";

export const Withdraw = () => {
  // const [dashboardAction, setDashboardAction] = useState(false);
  // const [unwrap, setUnwrap] = useState(false);
  // const [flowType, setFlowType] = useState("");

  return (
    <FContainer className="f-mr-0 card-manage" width={900}>
      <CrucibleMyBalance />

      <CrucibleWithdraw />

      <CrucibleWithdrawFeeCard />
    </FContainer>
  );
};
