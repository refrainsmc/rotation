enum Shape {
    CIRCLE,
    SQUARE
}

const pauseBot = (time: number) => {
    DFRobotMaqueenPlus.mototStop(Motors.ALL);
    basic.pause(1000);
}

const turnRight = () => {
    setPenState(PenState.DOWN);
    // main turn
    DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 200);
    DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, 200);
    basic.pause(160);
    pauseBot(1000);
    setPenState(PenState.UP);
    // go back a few mm
    DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CCW, 200);
    basic.pause(160);
    DFRobotMaqueenPlus.mototStop(Motors.ALL);
}

enum PenState {
    DOWN,
    UP
}

let penState = PenState.UP;
DFRobotMaqueenPlus.servoRun(Servos.S3, 20);

const setPenState = (state: PenState) => {
    if (state == penState)
        return;
    penState = state;
    if (state == PenState.DOWN) {
        DFRobotMaqueenPlus.servoRun(Servos.S3, 80);
    } else {
        DFRobotMaqueenPlus.servoRun(Servos.S3, 20);
    }
}

const draw = (shape: Shape) => {
    switch (shape) {
        case Shape.CIRCLE:
            setPenState(PenState.DOWN);
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 200);
            basic.pause(1850);
            DFRobotMaqueenPlus.mototStop(Motors.ALL);
            setPenState(PenState.UP);
            break;
        case Shape.SQUARE:
            for (let i = 0; i < 4; i++) {
                setPenState(PenState.DOWN);
                DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CW, 200);
                basic.pause(600);
                turnRight();
                basic.pause(1000);
            }
            setPenState(PenState.UP);
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL);
}

try {
    DFRobotMaqueenPlus.I2CInit();
} catch {
    basic.showString("Please insert into Maqueen Plus.")
}

draw(Shape.SQUARE);