enum Shape {
    CIRCLE
}

const draw = (shape: Shape) => {
    switch (shape) {
        case Shape.CIRCLE:
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, 200);
            basic.pause(1850);
            break;
    }
    DFRobotMaqueenPlus.mototStop(Motors.ALL);
}

basic.forever(() => {
    draw(Shape.CIRCLE);
    basic.pause(1000);
})