import React, { useEffect, useState } from "react";
import classNames from "classnames";

export default function (props) {
    const [backCard, setBackCard] = useState("back-card");
    const [frontCard, setFrontCard] = useState("front-card");

    const flipped = () => {
        setBackCard("back-card-flip");
        setFrontCard("front-card-flip");
    };

    return (
        <>
            <div
                onClick={() => props.setMove()}
                className="border border-gray-200 rounded-lg shadow-md m-4"
            >
                <div className={backCard}>
                    <img src={props.row.back} alt="" className="rounded-lg"/>
                </div>

                <div className={frontCard}>
                    <img src={props.row.front} alt="" className="rounded-lg"/>
                </div>
            </div>
        </>
    );
}