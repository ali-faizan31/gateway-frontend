import { FContainer, FGrid, FGridItem, FButton, FTypo } from 'ferrum-design-system';
import React, { useRef, useState } from 'react';
import { FCard } from '../ferrum-design-system/Fcard/Fcard';
import { FDatepicker } from '../ferrum-design-system/Fform/Fdatepicker/Fdatepicker';
import { FInputCheckbox } from '../ferrum-design-system/Fform/FinputCheckbox/FinputCheckbox';
import { FInputText } from '../ferrum-design-system/Fform/FinputText/FinputText';
import { FSelect } from '../ferrum-design-system/Fform/Fselect/Fselect';
import leftIcon from '../ferrum-design-system/assets/img/f-icons/icon-arrow-dark.svg';
import { useHistory, useLocation } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';
const VestingForm = () => {
    const location: any = useLocation();
    const history = useHistory();
    const { isEditedForm } = location.state;
    const [titleRound, setTitleRound] = useState('');
    const [vestingInfo, setVestingInfo] = useState('');
    const [allocation, setAllocation] = useState('');
    const [lockingPeriod, setLockingPeriod] = useState('');
    const [selectedNetwork, setSelectedNetwork] = useState('');
    const [selectedFrequency, setSelectedFrequency] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const hiddenFileInput: any = useRef(null);
    const handleClick = (event: any) => {
        hiddenFileInput && hiddenFileInput.current && hiddenFileInput.current.click();
    };
    const handleChange = (event: any) => {
        const fileUploaded = event.target.files[0];
        setSelectedFile(fileUploaded);
    };
    return (
        <>
            <FContainer type="fluid" className={'bg_black h-100'}>
                <div className="f-mt-2 f-mb-2 d_flex justify_start align_center">
                    <div className={'round img_29 bg_white d_flex justify_center align_center f-mr-1'}
                        onClick={() => history.push(PATH_DASHBOARD.vesting.adminDashboard)}>
                        <img src={leftIcon} alt={leftIcon} style={{ width: 14, height: 14 }} />
                    </div>
                    <p className={'primaryColor custom-font-size-18 font-700'}>
                        {isEditedForm ? 'Edit' : 'Add New'} Vesting</p>
                </div>
                <FContainer>
                    <FCard variant={'whiteLabeled'}>
                        <form autoComplete="off">
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <FInputText
                                        variant="whiteLabeled"
                                        label="Title Round"
                                        name="TitleRound"
                                        placeholder="Title Vesting Round"
                                        value={titleRound}
                                        onChange={((e: any) => { setTitleRound(e.target.value) })}
                                    />
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <FInputText
                                        variant="whiteLabeled"
                                        label="Vesting"
                                        name="Vesting"
                                        placeholder="Example: 10% at TGE, 1 month cliff + 7 months linear"
                                        value={vestingInfo}
                                        onChange={((e: any) => { setVestingInfo(e.target.value) })}
                                    />
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <FInputText
                                        variant="whiteLabeled"
                                        label="Allocation"
                                        name="Allocation"
                                        placeholder="Allocation"
                                        value={allocation}
                                        onChange={((e: any) => { setAllocation(e.target.value) })}
                                    />
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <FSelect
                                        variant="whiteLabeled"
                                        label="Network"
                                        name="Network"
                                        placeholder="Select Network"
                                    />
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <FTypo>
                                        Locking Period
                                    </FTypo>
                                    <div className={'w-100 f-mt-1 f-mb-1'}>
                                        <FInputCheckbox
                                            variant={'whiteLabeled'}
                                            display={"inline"}
                                            label="Yes"
                                            name={"LockingYes"}
                                        />
                                        <FInputCheckbox
                                            variant={'whiteLabeled'}
                                            display={"inline"}
                                            label="No"
                                            name={"LockingNo"}
                                        />
                                    </div>
                                    <FInputText
                                        variant="whiteLabeled"
                                        placeholder="Locking Period (Cliff)"
                                        value={lockingPeriod}
                                        onChange={((e: any) => { setLockingPeriod(e.target.value) })}
                                    />
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 6, 6]} className={"f-mt-1"}>
                                    <FSelect
                                        variant="whiteLabeled"
                                        label="Frequency of release"
                                        name="Frequencyofrelease"
                                        placeholder="Frequency of release"
                                    />
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="center" size={[6, 12, 12]}>
                                    <FDatepicker
                                        className={"f-mt-1"}
                                        variant="whiteLabeled"
                                        label={"Vesting Release Start Date"}
                                        name={"startDate"}
                                    />
                                </FGridItem>
                                <FGridItem alignX="center" size={[6, 12, 12]}>
                                    <label className={`f-input-label w-100 f-mt-1`}>
                                        Upload CSV
                                    </label>
                                    <div className={'custom_input_wrap d_flex justify_between custom-padding-10 f-mt--8'}>
                                        <p>{selectedFile ? selectedFile.name : 'sample.csv'}</p>
                                        <div
                                            className={'d_flex justify_center align_center csvBtn cursor_pointer'}
                                            onClick={handleClick}>
                                            <p>Choose File</p>
                                        </div>

                                    </div>
                                </FGridItem>
                            </FGrid>
                            <FGrid>
                                <FGridItem alignX="end" dir={"row"} className={"f-mt-3"}>
                                    <FButton variant={'whiteLabeled'} type={'submit'} style={{ width: '201px', height: '40px' }} title={`Edit & Save`} />
                                </FGridItem>
                            </FGrid>
                        </form>
                    </FCard>
                    <input
                        type="file"
                        style={{ display: 'none' }}
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        ref={hiddenFileInput}
                        onChange={handleChange} />
                </FContainer>
            </FContainer>
        </>
    )
}
export default VestingForm;
