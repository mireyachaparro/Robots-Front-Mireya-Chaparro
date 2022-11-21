import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';

export function RobotItem({ item }: { item: Robot }) {
    const { handleDelete } = useRobots();

    const handleClick = () => {
        handleDelete(item.id_front);
    };

    return (
        <li>
            <div>{item.id_front}</div>
            <div>
                <img src={item.img} alt={item.name} width="300px" />
            </div>
            <div>{item.name}</div>
            <div className="button" onClick={handleClick} role="button">
                🗑️
            </div>
        </li>
    );
}
