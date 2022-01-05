import React, { useState, useEffect} from 'react';
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
          {/*  <FList variant="info">
                  <FListItem>
                    <FItem align="left"> one</FItem>
                    <FItem align="right"> 2nd</FItem> 
                  </FListItem>
                  <FListItem>
                    <FItem align="left"> one</FItem>
                    <FItem align="right"> 2nd</FItem> 
                  </FListItem>
                  <FListItem>
                    <FItem align="left"> one</FItem>
                    <FItem align="right"> 2nd</FItem> 
                  </FListItem>
                </FList>  */}
        </FMain>
      </FLayout>
    )
}

export default DashboardLayout
