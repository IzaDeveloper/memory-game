import React, { useEffect, useState } from "react";
import classNames from "classnames";

export default function (props, row, index, isInactive, isFlipped, isDisabled) {
    const [clicked, setClicked] = useState(false)

    const handleClick = () => {
        // setClicked(!clicked)
        
        // clicked && !isDisabled && onClick(index)

        !isFlipped && !isDisabled && onClick(index);
    }

    return (
        <>
            <div
                // className={classNames("card", {
                //     "is-flipped": isFlipped,
                //     "is-inactive": isInactive
                // })}
                onClick={() => handleClick()}
                className={`border border-gray-200 rounded-lg shadow-md m-4 h-20 relative overflow-hidden`}
            >
                <div className={`absolute w-full h-full flex items-center justify-center ${clicked ? 'invisible' : 'visible'}`}>
                    {/* <img src={props.row.back} alt="" className="rounded-lg"/> */}
                    {props.row.number}
                </div>

                <div className={`absolute w-full h-full flex items-center justify-center ${clicked ? 'visible' : 'invisible'}`}>
                    {/* <img src={props.row.front} alt="" className="rounded-lg"/> */}
                    {props.row.name}
                </div>
            </div>
        </>
    );
}