import React, { useState, useEffect } from "react";
import { FContainer } from "ferrum-design-system";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

const Dashboard = () => {
  const [networkClient, setNetworkClient] = useState<Web3 | undefined>(
    undefined
  );
  const { active, library } = useWeb3React();

  useEffect(() => {
    if (library && !networkClient) {
      // console.log("web3 react connect set network client");
      setNetworkClient(library);
    }
  }, [active, library, networkClient]);

  //not used file


  return (
    <>

      <FContainer type="fluid">
        {/* <FButton
          type="button"
          className="btn-create f-ml-1"
          onClick={() =>
            mintCrucible(
              "BSC:0xa719b8ab7ea7af0ddb4358719a34631bb79d15dc",
              "BSC:0xe8606f8f4e8d2d1fbbb0086775fb0b3456423224",
              "1",
              true,
              "BSC",
              "0x0Bdb79846e8331A19A65430363f240Ec8aCC2A52"
            )
          }
          title={"Mint"}
        ></FButton> */}
        <h1>Dashboards</h1>
      </FContainer>
    </>
  );
};

export default Dashboard;
