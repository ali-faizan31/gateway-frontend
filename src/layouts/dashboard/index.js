import React  from 'react';
import { FLayout, FMain, FContainer  } from "ferrum-design-system"; 
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({headerTitle, children}) => { 
    return (
      <FLayout themeBuilder={false}>
        <DashboardSidebar />
        <FMain>
          <DashboardHeader title={headerTitle} />
          <FContainer type="fluid">
          {children} 
          </FContainer>
        </FMain>
      </FLayout>
    )
}

export default DashboardLayout
