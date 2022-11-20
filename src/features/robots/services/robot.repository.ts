import { Robot } from '../models/robot';
import { Repository } from './repository';

export class RobotRepository implements Repository<Robot> {
    url: string;
    constructor(url = '') {
        // this.url = url ? url : (process.env.REACT_APP_URL_ROBOTS as string);
        this.url = url
            ? url
            : 'https://two02210-w7ch5-mireya-chaparro.onrender.com/robots';
    }

    #createError(response: Response) {
        const message = `Error ${response.status}: ${response.statusText}`;
        const error = new Error(message);
        error.name = 'HTTPError';
        return error;
    }

    // read / get
    getAll(): Promise<Array<Robot>> {
        return fetch(this.url).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }

    // create / post
    create(robot: Partial<Robot>): Promise<Robot> {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(robot),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }

    // delete
    delete(id: number): Promise<void> {
        return fetch(`${this.url}/${id}`, {
            method: 'DELETE',
        }).then((response) => {
            if (!response.ok) throw this.#createError(response);
        });
    }

    // uptate / patch
    update(partialRobot: Partial<Robot>): Promise<Robot> {
        return fetch(`${this.url}/${partialRobot.id_front}`, {
            method: 'PATCH',
            body: JSON.stringify(partialRobot),
            headers: {
                'content-type': 'application/json',
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }
}
