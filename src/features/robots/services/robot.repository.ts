import { Robot } from '../models/robot';
import { Repository } from './repository';

export class RobotRepository implements Repository<Robot> {
    url: string;
    constructor(url = '') {
        this.url = url ? url : (process.env.REACT_APP_URL_ROBOTS as string);
        //SI COMENTO LA DE ABAJO, Y DEJO LA DE ARRIBA, PINTA, PERO NO TRAE NADA
        // this.url = url
        //     ? url
        //     : 'https://two02210-w7ch5-mireya-chaparro.onrender.com/robots';
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
        return fetch(this.url + 'create', {
            method: 'POST',
            body: JSON.stringify(robot),
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2JiZTU0OWNiMTIzZTM2MmMzZDk0MiIsIm5hbWUiOiJtaXJleWEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjkxNDM1ODJ9.p1glWDqlEhnpZuuXRaReD4UhiP6uYFFqPpgJyJEDJn0`,
            },
        }).then((response) => {
            if (response.ok) return response.json();
            throw this.#createError(response);
        });
    }

    // delete
    delete(id: number): Promise<void> {
        return fetch(`${this.url}delete/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzN2JiZTU0OWNiMTIzZTM2MmMzZDk0MiIsIm5hbWUiOiJtaXJleWEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjkxNDM1ODJ9.p1glWDqlEhnpZuuXRaReD4UhiP6uYFFqPpgJyJEDJn0`,
            },
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
