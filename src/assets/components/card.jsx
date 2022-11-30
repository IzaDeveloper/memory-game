import { useEffect, useState } from "react";
import { card1, card2, card3, card4, card5, card6 } from '../components/image'

export default function () {
    const [count, setCount] = useState(0);
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
                front: card1,
                back: card2
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

    return (
        <>
            <div className="bg-gray-400 flex-col justify-evenly items-center text-2xl h-10">
                <h1>Movimentos: {count}</h1>
            </div>

            <div className="p-10 grid xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 bg-red-600">
                {cardsShuffled.map((row, index) => (
                    <div>
                        <div className="border border-gray-200 rounded-lg shadow-md m-4">Back</div>
                        <div
                            key={index}
                            onClick={() => setCount((count) => count + 1)}
                            className="border border-gray-200 rounded-lg shadow-md m-4"
                        >
                            <div className="flex justify-center items-center h-80"
                            >
                                {row.name}
                            </div>
                            {/* <img className="flex justify-center items-center h-full rounded-lg" src={row.image} /> */}
                        </div>
                    </div>
                    
                ))}
            </div>
        </>
    );
}