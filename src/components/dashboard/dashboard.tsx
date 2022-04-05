import React, { useState, useEffect } from "react";
import { FContainer, FButton } from "ferrum-design-system";
import {} from "./../../";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { CrucibleClient } from "./../../container-components/web3Client/crucibleClient";
import { Web3Helper } from "./../../container-components/web3Client/web3Helper";
// import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [networkClient, setNetworkClient] = useState<Web3 | undefined>(
    undefined
  );
  const { active, library } = useWeb3React();
  const dispatch = useDispatch();

  useEffect(() => {
    if (library && !networkClient) {
      // console.log("web3 react connect set network client");
      setNetworkClient(library);
    }
  }, [active, library, networkClient]);

  const mintCrucible = async (
    currency: string,
    crucibleAddress: string,
    amount: string,
    isPublic: boolean,
    network: string,
    userAddress: string
  ) => {
    if (networkClient) {
      const web3Helper = new Web3Helper(networkClient as any);
      const client = new CrucibleClient(web3Helper);

      //@ts-ignore
      await client.mintCrucible(
        dispatch,
        currency,
        crucibleAddress,
        amount,
        isPublic,
        network,
        userAddress
      );
    }
  };

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
