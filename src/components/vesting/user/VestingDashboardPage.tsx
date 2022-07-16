import { FContainer, FGrid, FGridItem, FTypo } from "ferrum-design-system";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import DashboardCards from "./user-dashboard/user-dashboard-card";
import PrivateRoundCard from "./user-dashboard/vesting-option-cards/private-round";
import SeedRoundCard from "./user-dashboard/vesting-option-cards/seed-round";
import StrategicRoundCard from "./user-dashboard/vesting-option-cards/strategic-round";

const VestingDashboardPage = () => {
  const { isConnected } = useSelector((state: RootState) => state.walletConnector);



  return (
    <div className="container f-ml-0 f-pl-2 f-pr-2">
      <DashboardCards />
      <div className={'f-mt-3 f-mb-8'}>
        <p className={'custom-font-size-20 font-400 text_left f-mb-2'}>Vesting Options</p>
        <FGrid className={'f-mt-1'}>
          <FGridItem size={[4, 4, 4]} alignX="left">
            <SeedRoundCard isConnected={isConnected} />
          </FGridItem>
          <FGridItem size={[4, 4, 4]} alignX="left">
            <PrivateRoundCard isConnected={isConnected} />
          </FGridItem>
          <FGridItem size={[4, 4, 4]} alignX="left">
            <StrategicRoundCard isConnected={isConnected} />
          </FGridItem>
        </FGrid>
      </div>
    </div>
  );
};
export default VestingDashboardPage;
