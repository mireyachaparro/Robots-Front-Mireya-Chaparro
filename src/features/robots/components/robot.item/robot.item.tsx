import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';

export function RobotItem({ item }: { item: Robot }) {
    const { handleDelete } = useRobots();

    const handleClick = () => {
        handleDelete(item.id_front);
    };

    return (
        <li className="listrobots--item">
            <div className="listrobots--img">
                <img src={item.img} alt={item.name} width="300px" />
            </div>
            <div className="listrobots--name">{item.name}</div>
            <div
                className="listrobots--delete"
                onClick={handleClick}
                role="button"
            >
                🗑️
            </div>
        </li>
    );
}
