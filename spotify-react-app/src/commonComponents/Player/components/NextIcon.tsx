import React, {FC, useContext} from 'react';
import {ISong} from "../../Song/interfaces/ISong";
import PlayerStore from "../../../stores/playerStore";
import {PlayerContext, UserContext} from "../../../index";
import {getSong} from "../../../http/songApi";

const NextIcon = (props: any) => {
    return (
        <svg onClick={props.handleNext} width="19" className="like-icon" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.308 8.27331V1.33266C14.308 0.989131 14.5752 0.710022 14.9425 0.710022H17.5473C17.8813 0.710022 18.1484 0.989131 18.1484 1.33266V18.0877C18.1484 18.4313 17.8813 18.71 17.5473 18.71H14.9425C14.5752 18.71 14.308 18.4313 14.308 18.0877V11.1471L1.61783 18.4747C1.31727 18.6473 0.949921 18.6473 0.649364 18.4747C0.348808 18.3021 0.148438 17.9833 0.148438 17.6381C0.148438 14.0031 0.148438 5.41727 0.148438 1.78201C0.148438 1.43715 0.348808 1.11833 0.649364 0.945736C0.949921 0.773137 1.31727 0.773112 1.61783 0.945377L14.308 8.27331Z"
                  fill="#A8A8A8"/>
        </svg>
    )
};

export default NextIcon;