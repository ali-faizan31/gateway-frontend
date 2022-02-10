import React  from 'react';
import { FLayout, FMain  } from "ferrum-design-system"; 
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

const DashboardLayout = ({children}) => { 
    return (
      <FLayout>
        <DashboardSidebar />
        <FMain>
          <DashboardHeader />
          {children} 
        </FMain>
      </FLayout>
    )
}

export default DashboardLayout
