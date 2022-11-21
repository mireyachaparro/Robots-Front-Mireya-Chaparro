import { RobotRepository } from '../../../features/robots/services/robot.repository';
import { AppRoutes } from '../routes/app.routes';

export function App() {
    (async () => {
        const services = new RobotRepository();
        const test = await services.getAll();
        console.log(test);
    })();
    return (
        <>
            <AppRoutes></AppRoutes>
        </>
    );
}
