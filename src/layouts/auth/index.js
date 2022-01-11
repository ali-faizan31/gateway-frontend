import React, { useState, useEffect } from "react";
import { FLayout, FMain, FGrid, FGridItem, FItem, FContainer } from "ferrum-design-system";

const AuthLayout = ({ children }) => {
  return (
    <>
    
        <FGrid  layout={"grid"}>
          <FGridItem
          size={[4,12,12]}
            alignX={"center"}
            alignY={"center"}
            display={"block"}
            style={{ background: "#eee", height: "100vh" }}
            >
            <FItem className={"w-100"} align={"center"}>
              <h1>Some pic here</h1>
            </FItem>
            <FItem>
              <img
                src={"/ferrum/illustration_login.png"}
                alt=""
                width={"100%"}
              />
            </FItem>
          </FGridItem>
          <FGridItem size={[8,12,12]} alignX={'center'} alignY={'center'}>
            {children}
          </FGridItem>
        </FGrid>

      {/* <FLayout>
        <FMain>{children}</FMain>
      </FLayout> */}
    </>
  );
};

export default AuthLayout;
