import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter as Router } from 'react-router-dom';
import { appStore } from '../../store/store';
import { App } from './app';

describe('Given App component', () => {
    describe('When we render the component', () => {
        beforeEach(async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Router>
                        <Provider store={appStore}>
                            <App />
                        </Provider>
                    </Router>
                );
            });
        });
        test('Then it should display the title', () => {
            const title = new RegExp(/page/i);
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
