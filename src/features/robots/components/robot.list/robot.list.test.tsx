import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { rootState, rootStore } from '../../../../infrastructure/store/store';
import { RobotModel } from '../../models/robot';
import { robotReducer } from '../../reducer/reducer';
import { RobotsList } from './robot.list';

describe('Given RobotList component', () => {
    const preloadedState: rootState = {
        robots: [
            {
                ...new RobotModel('prueba', '123.jpg', 1, 2, '2000'),
                id_front: 1,
            },
        ],
    };
    const mockStore: rootStore = configureStore({
        reducer: {
            robots: robotReducer,
        },
        preloadedState,
    });

    describe('When we render the component', () => {
        beforeEach(() => {
            render(
                <Router>
                    <Provider store={mockStore}>
                        <RobotsList />
                    </Provider>
                    ;
                </Router>
            );
        });
        test('Then it should display the title', () => {
            const title = new RegExp(/prueba/i);
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
