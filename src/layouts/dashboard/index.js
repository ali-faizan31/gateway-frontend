import React from "react";
import { useLocation } from "react-router";
import { FLayout, FMain, FContainer } from "ferrum-design-system";
import DashboardHeader from "./DashboardHeader";
import VestingDashboardHeader from "./VestingDashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ headerTitle, children }) => {
  const location = useLocation();
  let layoutCrucible = location.pathname.includes("crucible");
  let layoutVesting = location.pathname.includes("vesting");
  console.log("location:", location.pathname);
  return (
    <FLayout themeBuilder={false} className={layoutCrucible ? "layout-crucible scroll-container" : ""}>
      <DashboardSidebar />
      <FMain>
        {layoutVesting ? (
          <>
            {location.pathname === "/dashboard/vesting/user" && <VestingDashboardHeader title={headerTitle} />}
            <div>{children}</div>
          </>
        ) : (
          <>
            <DashboardHeader title={headerTitle} />
            <FContainer type="fluid" className={"new-bg-body min-100vh scroll-container min-100vw"} style={{ paddingRight: "21rem !important", paddingLeft: "2rem" }}>
              {children}
            </FContainer>
          </>
        )}
      </FMain>
    </FLayout>
  );
};

export default DashboardLayout;
