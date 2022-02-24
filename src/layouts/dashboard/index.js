import React  from 'react';
import { FLayout, FMain  } from "ferrum-design-system"; 
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({headerTitle, children}) => { 
    return (
      <FLayout themeBuilder={false}>
        <DashboardSidebar />
        <FMain>
          <DashboardHeader title={headerTitle} />
          {children} 
        </FMain>
      </FLayout>
    )
}

export default DashboardLayout
