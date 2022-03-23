import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FButton, FCard, FGrid, FGridItem, FItem, FSelect, FTypo } from "ferrum-design-system";
import { ReactComponent as IconGoBack } from "../../assets/img/icon-go-back.svg";
import { ReactComponent as IconNetworkFrm } from "../../assets/img/icon-network-frm.svg";
import IconNetworkFrmx from "../../assets/img/icon-network-frmx.svg";
import IconNetworkCFrm from "../../assets/img/icon-network-cfrm.svg";
import IconNetworkCFrmx from "../../assets/img/icon-network-cfrmx.svg";
import { ReactComponent as IconNetworkBnb } from "../../assets/img/icon-network-bnb.svg";

export const CrucibleManage = ({ deposit, setDeposit, unwrap, setUnwrap }: any) => {
  const history = useHistory();
  const [selectedToken, setSelectedToken] = useState<any>();

  const selectTokens = [
    {
      value: "frm",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <IconNetworkFrm />
          </span>{" "}
          <span>FRM</span>
        </FItem>
      ),
    },
    {
      value: "frmx",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <img src={IconNetworkFrmx} alt="network-frmx" />
          </span>{" "}
          <span>FRMx</span>
        </FItem>
      ),
    },
    {
      value: "cfrm",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <img src={IconNetworkCFrm} alt="network-cfrm" />
          </span>{" "}
          <span>cFRM</span>
        </FItem>
      ),
    },
    {
      value: "cfrmx",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <img src={IconNetworkCFrmx} alt="network-cfrmx" />
          </span>{" "}
          <span>cFRMx</span>
        </FItem>
      ),
    },
    {
      value: "bnb",
      label: (
        <FItem display={"flex"} alignY="center">
          <span className="icon-wrap">
            <IconNetworkBnb />
          </span>{" "}
          <span>BNB</span>
        </FItem>
      ),
    },
  ];
  return (
    <FCard variant={"secondary"} className="card-manage-crucible card-shadow">
      <div className="card-title">
        <FItem display={"flex"} alignY="center">
          <Link to="/dashboard/crucible" className="btn-back">
            <IconGoBack />
          </Link>
          <FTypo size={24} weight={700}>
            Crucible Farm Dashboard - cFRMx / BNB
          </FTypo>
        </FItem>
        <div className="network-icon-wrapper">
          <span className="icon-wrap">
            <img src={IconNetworkCFrm} alt="network-cfrm" />
            <IconNetworkBnb />
          </span>
        </div>
      </div>
      <FGrid>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              FRMx Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
        <FGridItem size={[6, 6, 6]}>
          <FItem bgColor="#1C2229" className={"f-p-2"}>
            <FTypo size={20} className="f-mb-1">
              FRMx Price (USD)
            </FTypo>
            <FTypo size={30} weight={500}>
              $0.072
            </FTypo>
          </FItem>
        </FGridItem>
      </FGrid>
      <FGrid className="btn-wrap" spacing={5}>
        <FGridItem size={[4, 4, 4]}>
          <FSelect
            name={"selectOptions"}
            placeholder="Buy Token"
            options={selectTokens}
            value={selectedToken}
            onChange={(option: any) => setSelectedToken(option)}
          />
        </FGridItem>
        <FGridItem size={[4, 4, 4]}>
          <FButton title={"Mint cFRMx"} outlined className={"w-100"} onClick={() => setDeposit(true)}></FButton>
        </FGridItem>
        <FGridItem size={[4, 4, 4]}>
          <FButton variant={"secondary"} title={"Unwrap"} outlined className={"w-100"}></FButton>
        </FGridItem>
      </FGrid>
    </FCard>
  );
};
