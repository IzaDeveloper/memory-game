import React, { useEffect, useState } from "react";
import Card from "./assets/components/card";
import { card_0, card_1 } from "./assets/components/image";

export default function () {
    const [move, setMove] = useState(0);
    const [cardsShuffled, setCardsShuffled] = useState([]);

    const config = {
        num_card: 6,
    };

    useEffect(() => {
        const array_cards = [];

        for (let index = 1; index < config.num_card + 1; index++) {
            var card = {
                number: index,
                name: "Card " + index,
                front: card_1,
                back: card_0,
            };
            array_cards.push(card);
        }
        setCardsShuffled(shuffleCards(array_cards.concat(array_cards)));
    }, []);

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

    const [backCard, setBackCard] = useState("back-card");
    const [frontCard, setFrontCard] = useState("front-card");

    const flipped = () => {
        setBackCard("back-card-flip");
        setFrontCard("front-card-flip");
    };

    return (
        <>
            <h1>Movimentos: {move}</h1>

            <div className="bg-red-500 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                {cardsShuffled.map((item, index) => (
                    <div key={index}>
                        <Card
                            row={item} 
                            onClick={() => setMove((move) => move + 1)}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}