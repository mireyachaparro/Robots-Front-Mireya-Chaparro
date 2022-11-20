import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';

export function RobotItem({ item }: { item: Robot }) {
    const { handleDelete /*, handleUpdate*/ } = useRobots();

    const handleClick = () => {
        handleDelete(item.id);
    };

    // const handleChange = () => {
    //     consoleDebug('Handle change');
    //     handleUpdate({ ...item });
    // };

    return (
        <li className="">
            <span>{item.id}</span>
            <span>{item.img}</span>
            <span>{item.name}</span>
            <span className="button" onClick={handleClick} role="button">
                🗑️
            </span>
        </li>
    );
}
