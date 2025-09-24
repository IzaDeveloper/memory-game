import 'animate.css';
import back from '../assets/back.png'

export default function Card(props) {    
    const handleClick = () => {
        if (!props.isFlipped && !props.isDisabled && !props.isInactive) {
            props.onClick(props.index);
        }
    };

    return (
         <div
            onClick={handleClick}
            className={`card relative cursor-pointer transition-transform duration-500 ease-in-out
                ${props.isFlipped ? 'is-flipped' : 'flipped'} 
                ${props.isInactive ? 'is-inactive pointer-events-none' : ''}
            w-full max-w-full`}
        >

            <div className={`card-face card-front-face`}>
                <img 
                    src={back} 
                    alt="Pokedex"
                    className="w-full h-full object-contain p-5"
                />
            </div>

            <div className={`card-face card-back-face`}>
                <img 
                    src={props.row.image}
                    alt={props.row.name}
                    className="w-full h-full object-contain p-5"
                />
            </div>

        </div>
    );
}
