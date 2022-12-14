import React, { useState } from "react";
import 'animate.css';

export default function (props) {
    const [clicked, setClicked] = useState(false)
    const [animate, setAnimate] = useState(false)

    const handleClick = () => {
        setClicked(!clicked)
        setAnimate(true)

        setTimeout(() => {
            setAnimate(false)
        }, [1005])
    }

    return (
        <div onClick={() => handleClick()}
            className={`border bg-gray-200 rounded-lg shadow-md m-4 h-20 relative overflow-hidden animate__animated ${animate ? 'animate__flipInY' : ''}`}>
            
            <div className={`absolute w-full h-full flex items-center justify-center ${clicked ? 'invisible' : 'visible'}`}>
                {props.row.number}
            </div>

            <div className={`absolute w-full h-full flex items-center justify-center ${clicked ? 'visible' : 'invisible'}`}>
                {props.row.name}
            </div>
            
        </div>
    );
}