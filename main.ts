// initalize
init(Servos.S2);

let size = 1;

// remote control
IR.IR_callbackUser((message) => {
    music.playTone(Note.C, 500);
    switch (message) {
        case 16: // button 1
            draw(Shape.SQUARE);
            break;
        case 17: // button 2
            draw(Shape.CIRCLE);
            break;
        case 18: // button 3
            draw(Shape.RECTANGLE);
            break;
        case 8: // down arrow
            setPenState(PenState.DOWN);
            break;
        case 10: // up arrow
            setPenState(PenState.UP);
            break;
        case 0: // power button
            demoMode();
            break;
    }
});

// shapes
enum Shape {
    CIRCLE,
    SQUARE,
    RECTANGLE
}

function draw(shape: Shape) {
    setPenState(PenState.DOWN);
    switch (shape) {
        case Shape.CIRCLE:
            runMotor(Motors.M1, Dir.CW, 200, 1950);
            break;
        case Shape.SQUARE:
            for (let i = 0; i < 4; i++) {
                setPenState(PenState.DOWN);
                runMotor(Motors.ALL, Dir.CW, 200, 200);
                setPenState(PenState.UP);
                runMotor(Motors.ALL, Dir.CW, 200, 200);
                turn(Direct.RIGHT, 200, 175);
                runMotor(Motors.ALL, Dir.CCW, 200, 250);
            }
            break;
        case Shape.RECTANGLE:
            for (let i = 0; i < 4; i++) {
                setPenState(PenState.DOWN);
                // if i is even then 200ms, else 400ms
                runMotor(Motors.ALL, Dir.CW, 200, i % 2 == 0 ? 200 : 400);
                setPenState(PenState.UP);
                runMotor(Motors.ALL, Dir.CW, 200, 200);
                turn(Direct.RIGHT, 200, 175);
                runMotor(Motors.ALL, Dir.CCW, 200, 250);
            }
    }
    setPenState(PenState.UP);
}

function demoMode() {
    while (true) {
        draw(Shape.CIRCLE);
        basic.pause(1000);
        draw(Shape.SQUARE);
        basic.pause(1000);
        draw(Shape.RECTANGLE);
        basic.pause(1000);
    }
}