import React from "react";
import { useHistory } from "react-router";
import Datatable from "react-bs-datatable";
import {
  FButton,
  FCard,
  FInputText,
  FItem,
  FTable,
  FTypo,
} from "ferrum-design-system";
import { ReactComponent as IconNetworkCFrm } from "../../assets/img/icon-network-cfrm.svg";
import { ReactComponent as IconNetworkBsc } from "../../assets/img/icon-network-bsc.svg";

export const CardAPR = () => {
  const history = useHistory();
  const tableHeads: any[] = [
    {
      width: 200,
      prop: "sustainableCrucibleFarms",
      title: "Sustainable Crucible Farms",
    },
    { prop: "totalDeposited", title: "Total Deposited" },
    { prop: "yourDeposit", title: "Your Deposit" },
    { prop: "yourRewards", title: "Your Rewards" },
    {
      prop: "apr",
      title: <FTypo color="#DAB46E">APR</FTypo>,
    },
    { prop: "action", title: <></> },
  ];

  const body = Array.from(new Array(57), () => {
    const rd: any = (Math.random() * 10).toFixed(1);
    return {
      sustainableCrucibleFarms: (
        <FItem
          data-label="Sustainable Crucible Farms"
          className={"col-crucible-farming"}
          display={"flex"}
          alignY="center"
        >
          <span className="network-icon-wrap f-mr-1">
            <IconNetworkCFrm />
            <IconNetworkBsc />
          </span>
          cFRM / BNB
        </FItem>
      ),
      totalDeposited: <FTypo className={"col-amount"}>127.{rd}</FTypo>,
      yourDeposit: <FTypo className={"col-your"}>$13.{rd}</FTypo>,
      yourRewards: <FTypo className={"col-your"}>$.{rd}</FTypo>,
      apr: (
        <FTypo className={"col-amount"} size={24} color="#DAB46E" weight={500}>
          {rd}
        </FTypo>
      ),
      action: (
        <div className="col-action">
          <FButton
            title={"Manage"}
            onClick={() => history.push("/dashboard/crucible/manage")}
          />
          <FButton
            title={"Deposit"}
            onClick={() => history.push("/dashboard/crucible/get-started")}
          ></FButton>
        </div>
      ),
    };
  });

  return (
    <FCard className="card-apr f-mt-2">
      <FItem
        display={"flex"}
        alignX="between"
        alignY={"center"}
        className="f-pb-1 f-m-0"
      >
        <FTypo className="card-title f-pl-1">APR</FTypo>
        <FInputText
          type={"text"}
          placeholder="Search by Farm Name, Token Name, Token Contract Address"
        />
      </FItem>
      <FTable>
        <Datatable
          tableBody={body}
          tableHeaders={tableHeads}
          rowsPerPage={10}
        />
      </FTable>
    </FCard>
  );
};
