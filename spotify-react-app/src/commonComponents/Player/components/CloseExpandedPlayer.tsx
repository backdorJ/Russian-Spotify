import React from 'react';

const CloseExpandedPlayer = (props: any) => {
    return (
        <svg onClick={props.onClick} width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18L24 24M24 24L30 30M24 24L30 18M24 24L18 30" stroke="white" stroke-opacity="0.5"
                  stroke-width="2" stroke-linecap="round"/>
        </svg>
    );
};

export default CloseExpandedPlayer;