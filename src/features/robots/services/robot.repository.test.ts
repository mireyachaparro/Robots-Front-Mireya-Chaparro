import { RobotModel } from '../models/robot';
import { RobotRepository } from './robot.repository';

describe('Given an instance of RobotApi Service', () => {
    let service: RobotRepository;
    beforeEach(() => {
        service = new RobotRepository('https://prueba');
        service = new RobotRepository();
    });

    describe('When we use service.getRobot()', () => {
        test(`Then if all are OK, it should return a Promise of an Array of Robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue([]),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.getAll();
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual([]);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(async () => await service.getAll()).rejects.toThrow();
        });
    });

    describe('When we use service.createRobot()', () => {
        const mockRobot = new RobotModel('', '', 1, 1, '');
        test(`Then if all are OK,
                it should return a Promise of the crated robot`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockRobot),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.create(mockRobot);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockRobot);
        });

        test(`Then if there are problems, it should throw an error`, async () => {
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.create(mockRobot)
            ).rejects.toThrow();
        });
    });

    describe('When we use service.delete', () => {
        test(`Then if id are OK (1), it should return a Promise void`, async () => {
            const itemId = '1';
            const response = {
                ok: true,
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.delete(itemId);
            expect(fetch).toHaveBeenCalled();
            expect(result).toBeUndefined();
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const itemId = '0';
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.delete(itemId)
            ).rejects.toThrowError();
        });
    });

    describe('When we use service.update()', () => {
        const mockUpdateRobot = { id_front: '1', speed: 3 };
        const mockFinalRobot = {
            ...new RobotModel('', '', 1, 1, ''),
            id: '1',
        };

        test(`Then if all are OK, it should return a Promise of ...`, async () => {
            const response = {
                ok: true,
                json: jest.fn().mockResolvedValue(mockFinalRobot),
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            const result = await service.update(mockUpdateRobot);
            expect(fetch).toHaveBeenCalled();
            expect(result).toEqual(mockFinalRobot);
        });
        test(`Then if there are problems, it should throw an error`, async () => {
            const mockUpdateRobot = { id: '0' };
            const response = {
                ok: false,
                status: 500,
                statusText: 'Server Error',
            };
            global.fetch = jest.fn().mockResolvedValue(response);
            await expect(
                async () => await service.update(mockUpdateRobot)
            ).rejects.toThrow();
        });
    });
});
