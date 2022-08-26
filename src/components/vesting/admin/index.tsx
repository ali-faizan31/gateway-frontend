import React from "react";
import { VestingInformation } from "../vesting-information";
import VestingCards from "../vesting-information/vesting-card";

const VestingAdminDashboard = () => {

  return (
    <div className={'container f-ml-0 f-pl-2 f-pr-2'}>
      <div className="f-mt-2 f-mb-3 f-ml-1">
        <p className={'primaryColor custom-font-size-18 font-700'}>Welcome to your Dashboard</p>
      </div>
      <VestingCards />
      <VestingInformation />
    </div>
  );
};

export default VestingAdminDashboard;
