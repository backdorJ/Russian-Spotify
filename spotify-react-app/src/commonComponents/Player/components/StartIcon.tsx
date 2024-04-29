import React, {FC, useContext, useEffect, useState} from 'react';
import {ISong} from "../../Song/interfaces/ISong";
import {PlayerContext} from "../../../index";

const StartIcon = () => {
    return (
        <svg cursor="pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M12 0.0384521C18.6233 0.0384521 24 5.19133 24 11.5384C24 17.8857 18.6233 23.0385 12 23.0385C5.37663 23.0385 0 17.8857 0 11.5384C0 5.19133 5.37663 0.0384521 12 0.0384521ZM10.5974 6.94125C10.5974 6.6855 10.3636 6.47773 10.1104 6.47773H8.08441C7.81169 6.47773 7.5974 6.6855 7.5974 6.94125V16.0791C7.5974 16.3351 7.81169 16.5429 8.08441 16.5429H10.1104C10.3636 16.5429 10.5974 16.3351 10.5974 16.0791V6.94125ZM16.5975 6.94125C16.5975 6.6855 16.3831 6.47773 16.1104 6.47773H14.0844C13.8117 6.47773 13.5975 6.6855 13.5975 6.94125V16.0791C13.5975 16.3351 13.8117 16.5429 14.0844 16.5429H16.1104C16.3831 16.5429 16.5975 16.3351 16.5975 16.0791V6.94125Z"
                  fill="white"/>
        </svg>
    )

};

export default StartIcon;