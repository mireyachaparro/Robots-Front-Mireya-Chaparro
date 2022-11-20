import { act, render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { AppRoutes } from './app.routes';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../../../features/robots/page/robots.page', () => {
    return () => <div>robot r2d2</div>;
});

describe('Given AppRoutes component', () => {
    let paths: Array<string>;
    beforeEach(() => {
        paths = ['/'];
    });
    describe(`When we render the component 
                And the route is home`, () => {
        beforeEach(async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                render(
                    <Router initialEntries={paths} initialIndex={0}>
                        <AppRoutes />
                    </Router>
                );
            });
        });
        test('Then it should display the HomePage', async () => {
            const title = /robot r2d2/i;
            const element = await screen.findByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
