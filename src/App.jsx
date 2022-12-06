import React, { useEffect, useState, useRef } from "react";
import Card from "./assets/components/card";
import { card_0, card_1 } from "./assets/components/image";

export default function () {
    const [cardsShuffled, setCardsShuffled] = useState([]);
    const [cards, setCards] = useState([])
    const [openCards, setOpenCards] = useState([])
    const [clearedCards, setClearedCards] = useState({})
    const [shouldDisableAllCards, setShouldDisableAllCards] = useState(false)
    const [moves, setMoves] = useState(0);
    const timeout = useRef(null)

    // Quantidade de cartas que terão par
    const config = {
        num_card: 6,
    };

    // Embaralhar cartas
    function shuffleCards(array) {
        const length = array.length;

        for (let i = length; i > 0; i--) {
            const randomIndex = Math.floor(Math.random() * i);
            const currentIndex = i - 1;
            const temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temp;
        }
        return array;
    }

    // Criar pares
    useEffect(() => {
        const array_cards = [];

        for (let index = 1; index < config.num_card + 1; index++) {
            var card = {
                number: index,
                name: String("Card " + index),
                front: card_1,
                back: card_0,
            };
            array_cards.push(card);
        }

        setCards(array_cards)

        setCardsShuffled(shuffleCards(array_cards.concat(array_cards)));
    }, []);

    const disable = () => {
        setShouldDisableAllCards(true);
    };

    const enable = () => {
        setShouldDisableAllCards(false);
    };

    const checkCompletion = () => {
        if (Object.keys(clearedCards).length === cards.length) {
            // setShowModal(true);
            // const highScore = Math.min(moves, bestScore);
            // setBestScore(highScore);
            // localStorage.setItem("bestScore", highScore);
        }
    };

    const evaluate = () => {
        const [first, second] = openCards;
        enable();
        if (cards[first].type === cards[second].type) {
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
            setMoves((moves) => moves + 1);
            disable();

        } else {
            clearTimeout(timeout.current);
            setOpenCards([index]);
        }
    };

    useEffect(() => {
        let timeout = null;

        if (openCards.length === 2) {
            timeout = setTimeout(evaluate, 300);
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

    const checkIsInactive = (card) => {
        return Boolean(clearedCards[card.type]);
    };

    return (
        <>
            <h1>Movimentos: {moves}</h1>

            <div className="bg-red-500 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-screen">
                {cardsShuffled.map((item, index) => (
                    <div key={index}>
                        <Card
                            row={item}
                            index={index}
                            onClick={handleCardClick}
                            isDisabled={shouldDisableAllCards}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}