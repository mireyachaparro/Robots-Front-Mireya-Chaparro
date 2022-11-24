import { Robot } from '../models/robot';
import { actionTypes } from './action.types';
import { robotReducer } from './reducer';

describe('Given the function robotReducer', () => {
    const robotMock: Robot = {
        id: '1',
        name: 'prueba',
        img: '123.jpg',
        speed: 1,
        resistance: 2,
        date: '2000',
    };

    let action: { type: string; payload: unknown };
    let state: Array<Robot>;

    describe('When the action is load', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.load,
                payload: [robotMock],
            };
            state = [];
        });
        test('Then the returned state should be the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(action.payload);
        });
    });

    describe('When the action is add', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.add,
                payload: robotMock,
            };
            state = [];
        });
        test('Then the returned state should include the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toContainEqual(action.payload);
        });
    });

    describe('When the action is update', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update,
                payload: { ...robotMock, title: 'Update robot' },
            };
            state = [robotMock];
        });
        test('Then the returned state should include the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toContainEqual(action.payload);
        });
    });

    describe('When the action is update and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.update,
                payload: { ...robotMock, id: '2', title: 'Update robot' },
            };
            state = [robotMock];
        });
        test('Then the returned state should be the original state', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is delete', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete,
                payload: robotMock.id,
            };
            state = [robotMock];
        });
        test('Then the returned state should not include the action payload', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual([]);
        });
    });

    describe('When the action is delete and the id is not valid', () => {
        beforeEach(() => {
            action = {
                type: actionTypes.delete,
                payload: { ...robotMock, id: '2' },
            };
            state = [robotMock];
        });
        test('Then the returned state should should be the original state', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(state);
        });
    });

    describe('When the action is any other', () => {
        beforeEach(() => {
            action = {
                type: '',
                payload: null,
            };
            state = [robotMock];
        });
        test('Then the returned state should be ...', () => {
            const result = robotReducer(state, action);
            expect(result).toEqual(state);
        });
    });
});
