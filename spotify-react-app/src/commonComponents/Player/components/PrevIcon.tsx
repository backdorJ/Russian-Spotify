import React, {FC, useContext} from 'react';
import {getSong} from "../../../http/songApi";
import {PlayerContext, UserContext} from "../../../index";
import {ISong} from "../../Song/interfaces/ISong";

const PrevIcon= () => {
    return (
        <svg className="like-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.84045 10.4367V17.3774C3.84045 17.7209 3.57328 18 3.20594 18H0.601114C0.267164 18 0 17.7209 0 17.3774L1.45912e-06 0.62228C1.45912e-06 0.278752 0.267164 0 0.601114 0L3.20594 4.81558e-07C3.57328 4.81558e-07 3.84045 0.278752 3.84045 0.62228V7.56294L16.5306 0.235357C16.8312 0.0627617 17.1985 0.0627617 17.4991 0.235357C17.7996 0.407958 18 0.726763 18 1.07196C18 4.7069 18 13.2928 18 16.928C18 17.2729 17.7996 17.5917 17.4991 17.7643C17.1985 17.9369 16.8312 17.9369 16.5306 17.7647L3.84045 10.4367Z"
                  fill="#A8A8A8"/>
        </svg>
    )

};

export default PrevIcon;