import React, { useEffect, useState, useRef } from "react";
import Card from "./assets/components/card";

export default function () {
    const [cardsShuffled, setCardsShuffled] = useState([])
    const [cards, setCards] = useState([])

    // Quantidade de cartas que terão par
    const config = {
        num_card: 3,
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
                name: String("Card " + index)
            };
            array_cards.push(card);
        }

        setCards(array_cards)

        setCardsShuffled(shuffleCards(array_cards.concat(array_cards)));
    }, []);

    return (
        <div className="bg-red-500 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 h-screen">
            {cardsShuffled.map((row, index) => (
                <div key={index}>
                    <Card
                        row={row}
                        index={index}
                    />
                </div>
            ))}
        </div>
    );
}