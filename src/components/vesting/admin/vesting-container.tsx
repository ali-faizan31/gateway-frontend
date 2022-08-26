import { FContainer } from "ferrum-design-system";
import React from "react";
import { VestingInformation } from "../vesting-information";

const VestingContainer = () => {

    return (
        <FContainer type="fluid" className={'bg_black h-100'}>
            <div className="f-mt-2 f-mb-2 f-ml-2">
                <p className={'primaryColor custom-font-size-18 font-700'}>Vesting</p>
            </div>
            <VestingInformation />
        </FContainer>
    );
};

export default VestingContainer;