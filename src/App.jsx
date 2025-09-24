import React, { useEffect, useState, useRef } from "react";
import Card from "./components/card";
import { Modal } from "./components/Modal";

export default function () {
    const CardsArray = [
        {
            number: "1",
            name: 'Card 1',
            image: 'https://memory-pokemon.vercel.app/Pikachu.jpg'
        },
        {
            number: "2",
            name: 'Card 2',
            image: 'https://memory-pokemon.vercel.app/Charizard.png'
        },
        {
            number: "3",
            name: 'Card 3',
            image: 'https://memory-pokemon.vercel.app/Bulbasaur.png'
        },
        {
            number: "4",
            name: 'Card 4',
            image: 'https://memory-pokemon.vercel.app/Eevee.png'
        },
        {
            number: "5",
            name: 'Card 5',
            image: 'https://memory-pokemon.vercel.app/Psyduck.png'
        },
        {
            number: "6",
            name: 'Card 6',
            image: 'https://memory-pokemon.vercel.app/Squirtle.png'
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
        <article>
            <section className="bg-red-700 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 p-4 gap-4 min-h-screen overflow-y-auto">
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
            </section>

            {showModal && (
                <Modal 
                    isOpen={showModal}
                    moves={move}
                    onClose={() => setShowModal(false)}
                />
            )}
        </article>
    );
}