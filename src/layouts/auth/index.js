import React, { useState, useEffect} from 'react';
import { FLayout, FMain  } from "ferrum-design-system";  

const AuthLayout = ({children}) => { 
    return (
      <FLayout> 
        <FMain> 
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

export default AuthLayout
