import { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { rootState } from '../../../infrastructure/store/store';
import { ProtoRobot, Robot } from '../models/robot';
import * as ac from '../reducer/action.creators';
import { RobotRepository } from '../services/robot.repository';

export const useRobots = () => {
    const robots = useSelector((state: rootState) => state.robots);
    const dispatcher = useDispatch();
    const apiRobot = useMemo(() => new RobotRepository(), []);

    const handleLoad = useCallback(
        () =>
            apiRobot
                .getAll()
                .then((robots) => dispatcher(ac.loadActionCreator(robots)))
                .catch((error: Error) =>
                    console.log(error.name, error.message)
                ),
        [apiRobot, dispatcher]
    );

    const handleAdd = (newRobot: ProtoRobot) => {
        apiRobot
            .create(newRobot)
            .then((robot: Robot) => dispatcher(ac.addActionCreator(robot)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleUpdate = (updateRobot: Partial<Robot>) => {
        apiRobot
            .update(updateRobot)
            .then((robot: Robot) => dispatcher(ac.updateActionCreator(robot)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    const handleDelete = (id_front: string) => {
        apiRobot
            .delete(id_front)
            .then(() => dispatcher(ac.deleteActionCreator(id_front)))
            .catch((error: Error) => console.log(error.name, error.message));
    };

    return {
        robots,
        handleLoad,
        handleAdd,
        handleUpdate,
        handleDelete,
    };
};
