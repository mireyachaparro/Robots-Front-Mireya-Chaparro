import { RobotModel } from './robot';

describe('Given the class RobotModel', () => {
    describe('When we instantiate it', () => {
        const robot = new RobotModel('', '', 1, 1, '');
        test('Then we should have an object ot the class', () => {
            expect(robot).toBeInstanceOf(RobotModel);
        });
    });
});
