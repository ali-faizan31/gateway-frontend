import React from "react";
import Datatable from "react-bs-datatable";
import { FCard, FItem, FTypo } from "ferrum-design-system";
import { useHistory } from "react-router";
import { FTable } from "../ferrum-design-system/Ftable/Ftable";
import { FButton } from "../ferrum-design-system/Fbutton/Fbutton";
import { PATH_DASHBOARD } from "../../../routes/paths";
export const VestingInformation = () => {
    const history = useHistory();
    const tableHeads: any[] = [
        { prop: "titleRound", title: "Title Round" },
        { prop: "allocation", title: "Allocation" },
        { prop: "status", title: "Status" },
        { prop: "network", title: "Network" },
        { prop: "action", title: <></> },
    ];
    const getNetworks = (networks: any) => {
        return <div style={{ display: "flex" }}>
            {networks.map((element: any) => {
                return <div className={'white-small-box'}>
                    <span className={'custom-font-size-14 font-400'}>{element}</span>
                </div >
            })}
        </div>
    }
    const vestingInfo = [
        { titleRound: "Seed Round", allocation: "9,999.90 Token", status: "Ready to be implemented", network: ['BEP20', 'ERC20'], id: "1" },
        { titleRound: "Strategic Round", allocation: "9,999.90 Token", status: "Ready to be implemented", network: ['BEP20', 'ERC20'], id: "2" },
        { titleRound: "Strategic 2 Round", allocation: "9,999.90 Token", status: "Ready to be implemented", network: ['BEP20', 'ERC20'], id: "3" },
        { titleRound: "Public Round", allocation: "9,999.90 Token", status: "Implemented", network: ['BEP20'], id: "4" }
    ]
    const body = vestingInfo.map((vesting, index) => {
        return {
            titleRound: <FTypo className={"col-amount"}>{vesting.titleRound}</FTypo>,
            allocation: <FTypo className={"col-amount"}>{vesting.allocation}</FTypo>,
            status: <FTypo className={"col-amount"}>{vesting.status}</FTypo>,
            network: <FTypo className={"col-amount"}>{getNetworks(vesting.network)}</FTypo>,
            action: (
                <div className="col-action">
                    <FButton
                        className={'custom-font-size-16 font-400'}
                        variant={`${vesting.status === "Implemented" ? 'whiteLabeled' : 'whiteLabeledPrimary'}`}
                        style={{ width: '201px', height: '40px' }}
                        title={`${vesting.status === "Implemented" ? "Edit" : "View"} Vesting`}
                        onClick={() => history.push({
                            pathname: `${vesting.status === "Implemented" ? PATH_DASHBOARD.vesting.form : PATH_DASHBOARD.vesting.card}`,
                            state: {
                                isEditedForm: true
                            }
                        })} />
                </div>
            ),
        };
    });
    return (
        <>
            <FCard className="f-mt-2 padding_0" variant="whiteLabeled" >
                <FItem display={"flex"} alignX="between" alignY={"center"} className="f-m-0 f-pt-2 f-pb-1">
                    <FTypo className="card-title f-pl-1" size={24} weight={400}>Vesting</FTypo>
                    <FButton
                        className={'f-mr-2 clr_black_new custom-font-size-16 font-400'}
                        title={"Add New Vesting"}
                        style={{ width: "max-content" }}
                        onClick={() => history.push({
                            pathname: PATH_DASHBOARD.vesting.form,
                            state: {
                                isEditedForm: false
                            }
                        })} />
                </FItem>
                <FTable variant={'whiteLabeled'}>
                    <Datatable tableBody={body} tableHeaders={tableHeads} />
                </FTable>
            </FCard>
        </>
    );
};