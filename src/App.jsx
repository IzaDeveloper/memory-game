import React, { useEffect, useState, useRef } from "react";
import Card from "./assets/components/card";

export default function () {
    const CardsArray = [
        {
            number: "1",
            name: 'Card 1'
        },
        {
            number: "2",
            name: 'Card 2'
        },
        {
            number: "3",
            name: 'Card 3'
        },
        {
            number: "4",
            name: 'Card 4'
        },
        {
            number: "5",
            name: 'Card 5'
        },
        {
            number: "6",
            name: 'Card 6'
        }
    ]

    function shuffleCards(array) {
        const length = array.length;

        for (let i = length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const currentIndex = i - 1;
            const temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }

        return array
    }

    const [move, setMove] = useState(0);
    const [cards, setCards] = useState(() => shuffleCards(CardsArray.concat(CardsArray)))
    const [openCards, setOpenCards] = useState([]);
    const [clearedCards, setClearedCards] = useState({});
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const timeout = useRef(null);

    const disable = () => {
        setShouldDisableAllCards(true);
    };

    const enable = () => {
        setShouldDisableAllCards(false);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === CardsArray.length) {
            setShowModal(true)
        }
    };

    const evaluate = () => {
        const [first, second] = openCards;
        
        enable();

        if (cards[first].number === cards[second].number) {
            setClearedCards((prev) => ({ ...prev, [cards[first].number]: true }));
            setOpenCards([]);
            return;
        }
        
        timeout.current = setTimeout(() => {
            setOpenCards([]);
        }, 500);
    };

    const handleCardClick = (index) => {
        if (openCards.length === 1) {
            setOpenCards((prev) => [...prev, index]);
            setMove((move) => move + 1);
            disable();
        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;
        if (openCards.length === 2) {
            setTimeout(() => {
                evaluate()
            }, 700)
        }
        return () => {
            clearTimeout(timeout);
        };
    }, [openCards]);

    useEffect(() => {
        checkCompletion();
    }, [clearedCards]);

    const checkIsFlipped = (index) => {
        return openCards.includes(index);
    };

    const checkIsInactive = (row) => {
        return Boolean(clearedCards[row.number]);
    };

    return (
        <>
            {move}
            <div className="bg-red-500 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-screen p-4 gap-4">
                {cards.map((row, index) => (
                    <Card
                        key={index}
                        row={row}
                        index={index}
                        onClick={() => handleCardClick(index)}
                        isDisabled={shouldDisableAllCards}
                        isInactive={checkIsInactive(row)}
                        isFlipped={checkIsFlipped(index)}
                    />
                ))}
            </div>
        </>
    );
}