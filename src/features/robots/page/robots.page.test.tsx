import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from '../../../infrastructure/store/store';
import RobotsPage from './robots.page';

describe('Given Todo component', () => {
    describe('When we render the component', () => {
        beforeEach(() => {
            render(
                <Provider store={appStore}>
                    <Router>
                        <RobotsPage />
                    </Router>
                </Provider>
            );
        });
        test('Then it should display the title', () => {
            const title = /page/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
