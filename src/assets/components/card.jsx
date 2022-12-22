import React, { useState } from "react";
import 'animate.css';

export default function (props) {

    const handleClick = () => {
        !props.isFlipped && !props.isDisabled && props.onClick(props.index);
    }

    return (
        <div
            onClick={handleClick}
            className={`border bg-gray-300 rounded-lg shadow-md h-full relative overflow-hidden animate__animated ${props.isFlipped && 'animate__flipInY'}`}>

            <div className={` absolute w-full h-full flex items-center justify-center`}>
                {props.row.number}
            </div>

            <div className={`absolute w-full h-full flex items-center justify-center`}>
                {props.row.name}
            </div>

        </div>
    );
}