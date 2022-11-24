// import { RobotRepository } from '../../../features/robots/services/robot.repository';
import { AppRoutes } from '../routes/app.routes';
import './app.css';

export function App() {
    (async () => {
        //esto nos consolea le array de robots que nos trae
        // const services = new RobotRepository();
        // const test = await services.getAll();
        // console.log(test);
    })();
    return (
        <>
            <AppRoutes></AppRoutes>
        </>
    );
}
