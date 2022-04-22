import React, { useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
    FTable,
    FContainer,
    FButton,
    FGrid,
    FInputText,
    FGridItem
} from 'ferrum-design-system';
import Datatable from 'react-bs-datatable';
import { useParams, useLocation } from 'react-router-dom';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import eitherConverter from 'ether-converter';
import {
    getCompetitionById,
    getCompetitionsParticipantsRanks
} from '../../_apis/CompetitionCrud';

import { TOKEN_TAG } from '../../utils/const.utils';
import { T } from '../../utils/translationHelper';

const CompetitionInformation = () => {
    const {id} = useParams();
    const exportRef = useRef();
    let token = localStorage.getItem(TOKEN_TAG);
    const {pathname} = useLocation();
    const isPublicUser = pathname.includes('/pub');
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isQueryChange, setIsQueryChange] = useState(false);
    const [leaderboardData, setLeaderboardData] = useState({});
    const [competitionData, setCompetitionData] = useState({});
    const [competitionParticipants, setCompetitionParticipants] = useState([]);
    const [
        competitionParticipantsFiltered,
        setCompetitionParticipantsFiltered
    ] = useState([]);
    const [showWallets, setShowWallets] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getCompetition();
    }, [id]);

    useEffect(() => {
        if (Object.keys(leaderboardData).length) {
            getCompetitionParticipants();
        }
    }, [leaderboardData]);

    useEffect(() => {
        if (isQueryChange) {
            if (competitionParticipants.length) {
                const tempData = competitionParticipants.filter((x) =>
                    x.tokenHolderAddress
                        .toLowerCase()
                        .includes(query.toLowerCase())
                );
                setCompetitionParticipantsFiltered(tempData);
                setIsQueryChange(false);
            }
        }
    }, [query]);

    const getCompetitionParticipants = () => {
        const leaderboardDexUrl =
            leaderboardData?.leaderboardCurrencyAddressesByNetwork[0]
                ?.currencyAddressesByNetwork?.networkDex?.dex?.url;
        const tokenContractAddress =
            leaderboardData?.leaderboardCurrencyAddressesByNetwork[0]
                ?.currencyAddressesByNetwork?.tokenContractAddress;
        getCompetitionsParticipantsRanks(id, false, 0, 10)
            .then((res) => {
                if (res?.data?.body?.participants) {
                    const formattedRes = res?.data?.body?.participants?.map((p) => {
                        let color = '';
                        if (p?.tokenHolderQuantity === '') {
                            color = 'yellow';
                        }
                        if (Number(p?.humanReadableGrowth) >= 0 && p?.tokenHolderQuantity !== '') {
                            color = 'green';
                        } else if (Number(p?.humanReadableGrowth) < 0 && p?.tokenHolderQuantity !== '') {
                            color = 'red';
                        }
                        return (
                            {
                                ...p,
                                humanReadableGrowth: {
                                    data: p?.humanReadableGrowth,
                                    color
                                },
                                tokenHolderQuantity: p?.tokenHolderQuantity ? TruncateWithoutRounding(
                                    eitherConverter(
                                        p?.tokenHolderQuantity,
                                        'wei'
                                    ).ether,
                                    2
                                )?.toLocaleString('en-US') : 0,
                                levelUpUrl: `${leaderboardDexUrl}swap?inputCurrency=BNB&outputCurrency=${tokenContractAddress}&exactField=output&exactAmount=${TruncateWithoutRounding(
                                    p?.levelUpAmount,
                                    2
                                )}`,
                                formattedLevelUpAmount: p?.levelUpAmount ? TruncateWithoutRounding(
                                    p?.levelUpAmount,
                                    2
                                ) : 0
                            }
                        );
                    });
                    setCompetitionParticipants(formattedRes);
                    setCompetitionParticipantsFiltered(formattedRes);
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                }
            })
            .catch((e) => {
                setIsLoading(false);
                if (e.response) {
                    if (e?.response?.data?.status?.phraseKey !== '') {
                        const fetchedMessage = T(e?.response?.data?.status?.phraseKey);
                        toast.error(fetchedMessage);
                    } else {
                        toast.error(e?.response?.data?.status?.message);
                    }
                } else {
                    toast.error('Something went wrong. Try again later!');
                }
            });
    };

    const getCompetition = () => {
        getCompetitionById(id, token)
            .then((res) => {
                if (res) {
                    setCompetitionData(res?.data?.body?.competition);
                    setLeaderboardData(res?.data?.body?.leaderboard);
                } else {
                    setIsLoading(false);
                }
            })
            .catch((e) => {
                setIsLoading(false);
                if (e.response) {
                    if (e?.response?.data?.status?.phraseKey !== '') {
                        const fetchedMessage = T(e?.response?.data?.status?.phraseKey);
                        toast.error(fetchedMessage);
                    } else {
                        toast.error(e?.response?.data?.status?.message);
                    }
                } else {
                    toast.error('Something went wrong. Try again later!');
                }
            });
    };

    const TruncateWithoutRounding = (value, decimals) => {
        if (value) {
            const parts = value.toString().split('.');

            if (parts.length === 2) {
                return Number([parts[0], parts[1].slice(0, decimals)].join('.'));
            }
            return Number(parts[0]);
        } else {
            return '';
        }
    };

    const levelUpFormatter = (params) => (
        <div data-label="Get Token">
            <a
                href={params.levelUpUrl}
                target="_blank"
                rel="noreferrer"
                className="f-btn f-btn-primary text-decoration-none"
            >
                LEVEL UP
            </a>
        </div>
    );

    const columns = [
        {
            prop: 'rank',
            title: 'Rank',
            cell: (params) => <div data-label="Rank">{params?.rank}</div>
        },
        {
            prop: 'tokenHolderAddress',
            title: 'Wallet Address',
            cell: (params) => (
                <div data-label="Wallet Address">
                    {showWallets
                        ? params?.tokenHolderAddress
                        : `${params?.tokenHolderAddress?.substr(
                            0,
                            6
                        )}...${params?.tokenHolderAddress?.substr(
                            params?.tokenHolderAddress?.length - 4
                        )}`}
                </div>
            )
        },
        {
            prop: 'tokenHolderQuantity',
            title: 'Balance',
            cell: (params) => (
                <div data-label="Balance">{params?.tokenHolderQuantity}</div>
            )
        },
        {
            prop: 'humanReadableGrowth',
            title: 'Growth / Reduction',
            cell: (params) => (
                <div data-label="Growth / Reduction"
                     style={{color: params?.humanReadableGrowth?.color}}>
                    {params?.humanReadableGrowth?.data ? TruncateWithoutRounding(params?.humanReadableGrowth?.data, 2).toLocaleString('en-US') : 0}
                </div>
            )
        },
        {
            prop: 'levelUpAmount',
            title: 'Level Up Amount',
            cell: (params) => (
                <div data-label="Level Up Amount">
                    {params?.levelUpAmount ? TruncateWithoutRounding(params?.levelUpAmount, 2).toLocaleString('en-US') : 0} FRM
                </div>
            )
        },
        {
            prop: 'levelUpUrl',
            title: 'Get Token',
            cell: levelUpFormatter
        }
    ];

    const showAllWallets = () => {
        setShowWallets(!showWallets);
        const tempData = [...competitionParticipants];
        const tempDataFiltered = [...competitionParticipantsFiltered];
        setCompetitionParticipants([]);
        setCompetitionParticipantsFiltered([]);
        setCompetitionParticipants(tempData);
        setCompetitionParticipantsFiltered(tempDataFiltered);
    };

    const csvHeaders = [
        {label: 'Rank', key: 'rank'},
        {label: 'Wallet Address', key: 'tokenHolderAddress'},
        {label: 'Balance', key: 'tokenHolderQuantity'},
        {label: 'Growth / Reduction', key: 'humanReadableGrowth.data'},
        {label: 'Level Up Amount', key: 'formattedLevelUpAmount'}
    ];

    const onQueryChange = (e) => {
        setIsQueryChange(true);
        if (e.target.value) {
            setQuery(e.target.value);
        } else {
            setQuery('');
        }
    };

    const onExportClick = () => {
        setTimeout(() => {
            exportRef?.current?.link?.click();
        }, 3000);
    };

    return (
        <>
            <Toaster/>
            <CSVLink
                data={competitionParticipants}
                headers={csvHeaders}
                filename={`${competitionData?.name}-${moment(new Date()).format(
                    'DD-MMM-YYYY'
                )}.csv`}
                ref={exportRef}
                style={{display: 'none'}}
            />
            <FContainer type="fluid">
                <FContainer>
                    <FGrid className={'f-mt-1 f-mb-1'}>
                        <FGridItem
                            size={[4, 4, 4]}
                            alignX="start"
                            alignY={'end'}
                        >
                            <h1>{competitionData?.name || 'Competition'}</h1>
                        </FGridItem>
                        <FGridItem size={[2, 2, 2]} alignX="start" alignY="end">
                            {(!isPublicUser) && (
                                <FButton
                                    type="button"
                                    className="btn-create f-ml-1"
                                    disabled={isLoading || !competitionParticipants?.length }
                                    onClick={showAllWallets}
                                    title={`${
                                        showWallets ? 'Hide' : 'Show'
                                    } Wallets`}
                                />
                            )}
                        </FGridItem>
                        <FGridItem
                            alignX={'end'}
                            alignY={'end'}
                            dir={'row'}
                            size={[4, 4, 4]}
                        >
                            <FInputText
                                label="Search Wallet"
                                placeholder="0x000...0000"
                                value={query}
                                type="search"
                                onChange={onQueryChange}
                                style={{width: '100%'}}
                            />
                            {!isPublicUser && (
                                <FButton
                                    type="button"
                                    className="btn-create f-ml-1"
                                    disabled={isLoading || !competitionParticipants?.length }
                                    onClick={onExportClick}
                                    title={' Export to CSV'}
                                />
                            )}
                        </FGridItem>
                    </FGrid>
                    {competitionParticipants.length ? (
                        <FTable>
                            <Datatable
                                tableHeaders={columns}
                                tableBody={competitionParticipantsFiltered}
                                rowsPerPage={10}
                                tableClass="striped hover responsive"
                                initialSort={{
                                    prop: 'rank',
                                    isAscending: true
                                }}
                            />
                        </FTable>
                    ) : isLoading ? (
                        <FContainer type="fluid">
                            <FContainer>Loading...</FContainer>
                        </FContainer>
                    ) : (
                        <FContainer type="fluid">
                            <FContainer>No Data found</FContainer>
                        </FContainer>
                    )}
                </FContainer>
            </FContainer>
        </>
    );
};

export default CompetitionInformation;
