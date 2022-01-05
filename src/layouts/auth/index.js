import React, { useState, useEffect } from "react";
import { FLayout, FMain, FGrid, FGridItem, FItem } from "ferrum-design-system";

const AuthLayout = ({ children }) => {
  return (
    <>
      {/* <FLayout>
        <FMain>
          <FGrid size={2} layout={"fixed"}>
            <FGridItem
              alignX={"center"}
              alignY={"center"}
              display={"block"}
              style={{ background: "#eee" }}
              width={"600px"}
              height={"100vh"}
            >
              <FItem className={"w-100"} align={"center"}>
                <h1>Some pic here</h1>
              </FItem>
              <FItem>
                <img
                  src={"/ferrum/illustration_login.png"}
                  alt=""
                  width={"600px"}
                />
              </FItem>
            </FGridItem>
            <FGridItem alignY={"center"} alignX={"center"}>
              {children}
            </FGridItem>
          </FGrid>
        </FMain>
      </FLayout> */}

      <FLayout>
        <FMain>{children}</FMain>
      </FLayout>
    </>
  );
};

export default AuthLayout;
