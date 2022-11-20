import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';

export function RobotItem({ item }: { item: Robot }) {
    const { handleDelete } = useRobots();

    const handleClick = () => {
        handleDelete(item.id_front);
    };

    return (
        <li>
            <span>{item.id_front}</span>
            <span>{item.img}</span>
            <span>{item.name}</span>
            <span className="button" onClick={handleClick} role="button">
                🗑️
            </span>
        </li>
    );
}
