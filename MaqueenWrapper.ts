const RACE_CONDITION = 500;

enum Direct {
    LEFT,
    RIGHT
}

enum PenState {
    DOWN,
    UP
}

let servo: Servos;
let penState = PenState.UP;

function init(servo1: Servos) {
    DFRobotMaqueenPlus.I2CInit();
    servo = servo1;
    DFRobotMaqueenPlus.servoRun(servo, UP_ANGLE);
}

// mototRun function with time param
function runMotor(motor: Motors, direction: Dir, speed: number, time: number) {
    DFRobotMaqueenPlus.mototRun(motor, direction, speed);
    basic.pause(time);
    DFRobotMaqueenPlus.mototStop(motor);
    // race condition
    basic.pause(RACE_CONDITION);
}

// turn function
function turn(direction: Direct, speed: number, time: number) {
    if (direction == Direct.LEFT) {
        // turn left
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, speed);
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed);
    } else {
        // turn right
        DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed);
        DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed);
    }
    // pause
    basic.pause(time);
    DFRobotMaqueenPlus.mototStop(Motors.ALL);
    // race condition
    basic.pause(RACE_CONDITION);
}

// magic numbers for pen up/down
const UP_ANGLE = 130;
const DOWN_ANGLE = 150;

// set the pen state
function setPenState(state: PenState) {
    if (state == penState) return; // only set angle if the pen state is different
    penState = state;
    if (state == PenState.DOWN) {
        DFRobotMaqueenPlus.servoRun(servo, DOWN_ANGLE);
    } else {
        DFRobotMaqueenPlus.servoRun(servo, UP_ANGLE);
    }
    // race condition
    basic.pause(RACE_CONDITION);
}