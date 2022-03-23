import React from "react";
import { useLocation } from "react-router";
import { FLayout, FMain, FContainer } from "ferrum-design-system";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ headerTitle, children }) => {
  const location = useLocation();
  let layoutCrucible = location.pathname.includes("crucible");
  return (
    <FLayout themeBuilder={false} className={layoutCrucible ? "layout-crucible" : ""}>
      <DashboardSidebar />
      <FMain>
        <DashboardHeader title={headerTitle} />
        <FContainer type="fluid">{children}</FContainer>
      </FMain>
    </FLayout>
  );
};

export default DashboardLayout;
