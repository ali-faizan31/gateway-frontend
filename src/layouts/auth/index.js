import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  // FLayout,
  // FMain,
  FGrid,
  FGridItem,
  FItem,
  // FContainer,
} from "ferrum-design-system";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const AuthLayout = ({ children }) => {
  const [width] = useWindowSize();
  const [showPicture, setShowPicture] = useState(true); 

  useEffect(() => {
    if (width < 1200) {
      setShowPicture(false);
    } else{
      setShowPicture(true);
    }
  }, [width]);
  
  return (
    <>
      <FGrid layout={"grid"}>
        <FGridItem
          size={[4, 12, 12]}
          dir={"column"}
          // display={!showPicture && "none"}
          alignX={"center"}
          alignY={"center"}
          display={"block"}
          style={{ background: "#212b36", height: "100vh", display: !showPicture && "none"}}
        >
          <FItem className={"w-100"} align={"center"}>
            <h1>
            <p>Welcome to</p>
            <p className="f-mt--4" style={{fontSize: "54px"}}>Leaderboard</p>
            </h1>
          </FItem>
          <FItem>
            <img src={"/ferrum/Gateway.png"} alt="" width={"100%"} />
          </FItem>
        </FGridItem>
        <FGridItem size={[8, 12, 12]} className="f-p-2" alignX={"center"} alignY={"center"}>
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
