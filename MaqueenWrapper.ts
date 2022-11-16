enum Shape {
    CIRCLE,
    SQUARE
}

enum Direct {
    LEFT,
    RIGHT
}

enum PenState {
    DOWN,
    UP
}

let penState = PenState.UP;

const init = () => {
    DFRobotMaqueenPlus.I2CInit();
    DFRobotMaqueenPlus.servoRun(Servos.S3, UP_ANGLE);
}

// custom runMotor function
const runMotor = (motor: Motors, direction: Dir, speed: number, time: number) => {
    DFRobotMaqueenPlus.mototRun(motor, direction, speed);
    basic.pause(time);
    DFRobotMaqueenPlus.mototStop(motor);
    basic.pause(500);
}

// custom turn function
const turn = (direction: Direct, speed: number, time: number) => {
    if (direction === Direct.LEFT) {
        // turn left
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed);
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed);
    } else {
        // turn left
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, speed);
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed);
    }
    basic.pause(time);
    DFRobotMaqueenPlus.mototStop(Motors.ALL);
    basic.pause(500);
}

// magic numbers for pen up/down
const UP_ANGLE = 90;
const DOWN_ANGLE = 120;

// set the pen state
const setPenState = (state: PenState) => {
    if (state == penState) return; // only set angle if the pen state is different
    penState = state;
    if (state == PenState.DOWN) {
        DFRobotMaqueenPlus.servoRun(Servos.S3, DOWN_ANGLE);
    } else {
        DFRobotMaqueenPlus.servoRun(Servos.S3, UP_ANGLE);
    }
    basic.pause(500);
}

// draw a shape
const draw = (shape: Shape) => {
    switch (shape) {
        case Shape.CIRCLE:
            setPenState(PenState.DOWN);
            runMotor(Motors.M1, Dir.CW, 200, 1850);
            break;
        case Shape.SQUARE:
            for (let i = 0; i < 4; i++) {
                setPenState(PenState.DOWN);
                runMotor(Motors.ALL, Dir.CW, 200, 300);
                setPenState(PenState.UP);
                turn(Direct.RIGHT, 200, 150);
                runMotor(Motors.ALL, Dir.CCW, 200, 100);
            }
    }
    setPenState(PenState.UP);
}