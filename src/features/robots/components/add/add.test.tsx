import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { Add } from './add';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { appStore } from '../../../../infrastructure/store/store';
import { useRobots } from '../../hooks/use.robots';

jest.mock('../../hooks/use.robots');

describe('Given Add component and render it', () => {
    let formElements: Array<{ role: string; name: string }>;
    beforeEach(() => {
        formElements = [
            { role: 'textbox', name: 'Name' },
            { role: 'textbox', name: 'Image' },
            { role: 'textbox', name: 'Speed' },
            { role: 'textbox', name: 'Resistance' },
            { role: 'textbox', name: 'Date' },
            { role: 'button', name: 'Guardar' },
        ];
        (useRobots as jest.Mock).mockReturnValue({
            handleAdd: jest.fn(),
        });
        render(
            <Provider store={appStore}>
                <Router>
                    <Add />
                </Router>
            </Provider>
        );
    });
    describe('When the component has been render', () => {
        test('Then it should display the title', () => {
            const title = /Añadir/i;
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
        test('Then it should display a form with 5 inputs and a button', () => {
            formElements.forEach((item) => {
                const element: HTMLFormElement = screen.getByRole(item.role, {
                    name: item.name,
                });
                expect(element).toBeInTheDocument();
            });
        });
    });
    describe('When the user type in the inputs', () => {
        test('Then typed text in first input should be in the screen', () => {
            const mockTyped = 'prueba';
            const input = screen.getByRole(formElements[0].role, {
                name: formElements[0].name,
            });
            userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
        test('Then typed text in second input should be in the screen', () => {
            const mockTyped = '123.jpg';
            const input = screen.getByRole(formElements[1].role, {
                name: formElements[0].name,
            });
            userEvent.type(input, mockTyped);
            expect(input).toHaveValue(mockTyped);
        });
    });
    describe('When the user clicks the button', () => {
        test('A method from the custom hook should be call', () => {
            const button = screen.getByRole(formElements[5].role);
            userEvent.click(button);
            expect(useRobots().handleAdd).toHaveBeenCalled();
        });
    });
});
