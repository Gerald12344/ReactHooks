import Sketch from "react-p5";
import React from 'react';
import '../../../App.css'

export default (props) => {

    var grid = 66;
    var gridOffset = (grid / 2);



    let bg

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(744, 764).parent(canvasParentRef);
        bg = p5.loadImage('https://raw.githubusercontent.com/farhathfaisal/battleship/master/Wiki/Image/game-board-assets.png?token=AC33YIWEDPH7PTFFSP6RJC25M6QJS')
    };

    const draw = (p5) => {
        p5.background(bg)
        let color = p5.color(255,0,0)
        p5.fill(color)
        let x = snap(p5.mouseX)-8.5
        let y = snap(p5.mouseY)+12
        p5.textSize(32)
        p5.text(props.type,30,30)
        if(x < 40 ||  y < 80) return;
        p5.ellipse(x, y, 50, 50);
    };

    function snap(op) {
        var cell = Math.round((op - gridOffset) / grid);
        return cell * grid + gridOffset;
    }

    return <Sketch setup={setup} draw={draw} />;
};
