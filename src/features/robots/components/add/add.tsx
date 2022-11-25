import { SyntheticEvent, useState } from 'react';
import { useRobots } from '../../hooks/use.robots';
import { ProtoRobot } from '../../models/robot';

type formData = {
    name: string;
    img: string;
    speed: string;
    resistance: string;
    date: string;
};
export function Add() {
    const title = 'Añade tu robot';
    const initialState: formData = {
        name: '',
        img: '',
        speed: '',
        resistance: '',
        date: '',
    };
    const [formState, setFormState] = useState(initialState);
    const { handleAdd } = useRobots();

    const handleInput = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const newRobot: ProtoRobot = {
            ...formState,
            speed: +formState.speed,
            resistance: +formState.resistance,
        };
        handleAdd(newRobot);
    };

    return (
        <>
            <div className="formulario">
                <h2 className="titleform">{title}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form--name">
                        <input
                            type="text"
                            name="name"
                            aria-label="Name"
                            placeholder="Name"
                            value={formState.name}
                            onInput={handleInput}
                            required
                        />
                    </div>
                    <div className="form--img">
                        <input
                            type="text"
                            name="img"
                            aria-label="Image"
                            placeholder="Imagen"
                            value={formState.img}
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form--speed">
                        <p>Speed</p>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            name="speed"
                            aria-label="Speed"
                            value={formState.speed}
                            placeholder="Speed"
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form--resistance">
                        <p>Resistance</p>
                        <input
                            type="number"
                            min="0"
                            max="10"
                            name="resistance"
                            aria-label="Resistance"
                            placeholder="Resistance"
                            value={formState.resistance}
                            onInput={handleInput}
                        />
                    </div>
                    <div className="form--date">
                        <input
                            type="date"
                            name="date"
                            aria-label="Date"
                            placeholder="Date of creation"
                            value={formState.date}
                            onInput={handleInput}
                        />
                    </div>
                    <button type="submit" className="form--button">
                        Guardar
                    </button>
                </form>
            </div>
        </>
    );
}
