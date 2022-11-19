export type ProtoRobot = {
    name: string;
    img: string;
    speed: number;
    resistance: number;
    date: string;
};

export type Robot = {
    id: number;
    name: string;
    img: string;
    speed: number;
    resistance: number;
    date: string;
};

// export class RobotModel implements ProtoRobot {
//     isComplete: boolean;
//     constructor(public title: string, public responsible: string) {
//         this.isComplete = false;
//     }
// }
