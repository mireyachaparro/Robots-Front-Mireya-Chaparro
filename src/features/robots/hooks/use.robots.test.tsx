import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { renderHook, waitFor } from '@testing-library/react';
import { rootState, rootStore } from '../../../infrastructure/store/store';
import { ProtoRobot, Robot } from '../models/robot';
import { RobotRepository } from '../services/robot.repository';
import { robotReducer } from '../reducer/reducer';
import { useRobots } from './use.robots';

jest.mock('../services/robot.repository');

describe('Given the custom hook userobots', () => {
    let mockProtoRobot: ProtoRobot;
    let mockRobot: Robot;
    let mockAddedRobot: Robot;
    let mockUpdatedRobot: Robot;

    beforeEach(() => {
        mockProtoRobot = {
            name: 'prueba',
            img: '123.jpg',
            speed: 1,
            resistance: 2,
            date: '2000',
        };
        mockRobot = {
            ...mockProtoRobot,
            id_front: 1,
        };
        mockAddedRobot = {
            id_front: 2,
            name: 'add prueba',
            img: '456.jpg',
            speed: 3,
            resistance: 4,
            date: '2001',
        };
        mockUpdatedRobot = {
            id_front: 1,
            name: 'update prueba',
            img: '123.jpg',
            speed: 1,
            resistance: 2,
            date: '2000',
        };
    });
    describe('When we simulate its use in a component', () => {
        interface Current {
            robots: Array<Robot>;
            handleLoad: () => void;
            handleAdd: (newRobot: ProtoRobot) => void;
            handleDelete: (id: Robot['id_front']) => void;
            handleUpdate: (updateRobot: Partial<Robot>) => void;
        }

        let current: Current;
        let mockStore: rootStore;

        beforeEach(async () => {
            RobotRepository.prototype.getAll = jest
                .fn()
                .mockResolvedValue([mockRobot]);
            RobotRepository.prototype.create = jest
                .fn()
                .mockResolvedValue(mockAddedRobot);
            RobotRepository.prototype.update = jest
                .fn()
                .mockResolvedValue(mockUpdatedRobot);
            RobotRepository.prototype.delete = jest
                .fn()
                .mockResolvedValue(undefined);

            const preloadedState: rootState = { robots: [] };
            mockStore = configureStore({
                reducer: {
                    robots: robotReducer,
                },
                preloadedState,
            });

            const wrapper = ({ children }: { children: JSX.Element }) => (
                <Provider store={mockStore}>{children}</Provider>
            );
            ({
                result: { current },
            } = renderHook(() => useRobots(), { wrapper }));
        });

        test(`Then hook call to the repository for the initial data
                and dispatch an action for load the data in the state`, async () => {
            current.handleLoad();
            expect(RobotRepository.prototype.getAll).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to add a new robot 
            and dispatch an action for add the robot to the state`, async () => {
            expect(current.robots).toEqual([]);
            current.handleAdd(mockProtoRobot);
            expect(RobotRepository.prototype.create).toHaveBeenCalled();
        });

        test(`Then the hock call to the repository to update a robot
            and dispatch an action for update the robot in the state`, async () => {
            expect(current.robots).toEqual([]);
            current.handleUpdate(mockUpdatedRobot);
            await waitFor(() => {
                expect(RobotRepository.prototype.update).toHaveBeenCalled();
            });
        });

        test(`Then the hock call to the repository to delete a robot
            and dispatch an action for delete the robot from the state`, async () => {
            expect(current.robots).toEqual([]);
            current.handleDelete(1);
            await waitFor(() => {
                expect(RobotRepository.prototype.delete).toHaveBeenCalled();
            });
        });
    });
});
