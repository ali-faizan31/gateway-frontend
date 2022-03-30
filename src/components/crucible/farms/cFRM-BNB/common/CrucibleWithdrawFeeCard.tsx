import {
  FCard,
  FTypo,
  FGrid,
  FGridItem,
  FItem,
  // FButton,
  FContainer,
} from "ferrum-design-system";
import React, { useEffect } from "react";

const CrucibleWithdrawFeeCard = () => {
  useEffect(() => {
    console.log("test");
  }, []);

  return (
    <>
      <FContainer width={650}>
        <FCard className="card-crucible-token-info">
          <FTypo size={20}>Crucible Token Info</FTypo>
          <FGrid className="info-bar">
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                  2%
                </FTypo>
                <FTypo size={20}>Transfer Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                  4%
                </FTypo>
                <FTypo size={20}>Unwrap Fee</FTypo>
              </FItem>
            </FGridItem>
            <FGridItem size={[4, 4, 4]}>
              <FItem align={"center"}>
                <FTypo
                  color="#DAB46E"
                  size={20}
                  weight={700}
                  className="f-pb--2"
                >
                  cFRM
                </FTypo>
                <FTypo size={20}>Crucible Token</FTypo>
              </FItem>
            </FGridItem>
          </FGrid>
          <FCard className={"styled-card align-v your-crucible"}>
            <FGrid>
              <FGridItem size={[6, 6, 6]} dir="column">
                <FTypo className="f-pb--2">Your Crucible LP Deposits</FTypo>
                <FTypo
                  size={24}
                  weight={600}
                  align={"end"}
                  display="flex"
                  alignY={"end"}
                >
                  13.929
                  <FTypo size={12} weight={300} className={"f-pl--7 f-pb--1"}>
                    APE-LP cFRM-BNB
                  </FTypo>
                </FTypo>
              </FGridItem>
              <FGridItem size={[6, 6, 6]}>
                <FItem align="right">
                  <FTypo
                    color="#DAB46E"
                    size={40}
                    weight={600}
                    align={"end"}
                    display="flex"
                    alignY={"end"}
                  >
                    <FTypo
                      size={16}
                      weight={500}
                      className={"f-pr--7 f-pb--3"}
                      align="right"
                    >
                      APR
                    </FTypo>
                    192%
                  </FTypo>
                </FItem>
              </FGridItem>
            </FGrid>
          </FCard>
        </FCard>
      </FContainer>
    </>
  );
};

export default CrucibleWithdrawFeeCard;
