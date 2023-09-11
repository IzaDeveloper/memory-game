import React from "react";
import 'animate.css';
import { backCard } from '../assets';

export default function (props) {

    const handleClick = () => {
        !props.isFlipped && !props.isDisabled && props.onClick(props.index) && props.isInactive;
    }

    return (
        <div
            onClick={handleClick}
            className={`card ${props.isFlipped ? 'is-flipped' : 'flipped'} ${props.isInactive && 'is-inactive'}`}>

            <div className={`card-face card-front-face`}>
                <img src={backCard} alt="" />
            </div>

            <div className={`card-face card-back-face`}>
                <img src={props.row.image} alt="" />
            </div>

        </div>
    );
}