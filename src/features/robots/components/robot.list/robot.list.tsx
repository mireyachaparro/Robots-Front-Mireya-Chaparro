import { useEffect } from 'react';
import { useRobots } from '../../hooks/use.robots';
import { Robot } from '../../models/robot';
import { Add } from '../add/add';
import { RobotItem } from '../robot.item/robot.item';

export function RobotsList() {
    const title = 'Robots';
    const { robots, handleLoad } = useRobots();

    useEffect(() => {
        handleLoad();
    }, [handleLoad]);

    return (
        <section>
            <h2>{title}</h2>
            <Add></Add>
            <ul>
                {robots.map((item: Robot) => (
                    <RobotItem key={item.name} item={item}></RobotItem>
                ))}
            </ul>
        </section>
    );
}
