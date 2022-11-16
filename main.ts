init();
basic.showIcon(IconNames.Happy);
DFRobotMaqueenPlus.setRGBLight(RGBLight.RGBA, Color.YELLOW);

IR.IR_callbackUser((message) => {
    switch (message) {
        case 16: // button 1
            draw(Shape.SQUARE);
            break;
        case 17: // button 2
            draw(Shape.CIRCLE);
            break;
        case 18: // button 3
            basic.showNumber(1);
            turn(Direct.RIGHT, 200, 120);
            basic.pause(1000);
            basic.showNumber(2);
            turn(Direct.RIGHT, 200, 140);
            basic.pause(1000);
            basic.showNumber(3);
            turn(Direct.RIGHT, 200, 160);
            basic.pause(1000);
            basic.showNumber(4);
            turn(Direct.RIGHT, 200, 180);
            basic.pause(1000);
            basic.showString("DONE");
        case 8: // down arrow
            setPenState(PenState.DOWN);
            break;
        case 10: // up arrow
            setPenState(PenState.UP);
            break;
    }
});