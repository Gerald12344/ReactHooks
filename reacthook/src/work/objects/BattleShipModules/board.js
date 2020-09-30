import Sketch from "react-p5";
import React from 'react';
import '../../../App.css'

export default (props) => {

    var grid = 66;
    var gridOffset = (grid / 2);

    let shipsArray = [
        {
            positionX: 6,
            positionY: 10,
            width: 4,
            height: 1,
        },
        {
            positionX: 4,
            positionY: 3,
            width: 1,
            height: 2,
        }
    ]

    let bg

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(744, 764).parent(canvasParentRef);
        bg = p5.loadImage('https://raw.githubusercontent.com/farhathfaisal/battleship/master/Wiki/Image/game-board-assets.png?token=AC33YIWEDPH7PTFFSP6RJC25M6QJS')
    };

    const draw = (p5) => {
        p5.background(bg)
        let color = p5.color(0,255,0)
        p5.fill(color)
        let x = snap(p5.mouseX)-8.5
        let y = snap(p5.mouseY)+12
        p5.textSize(32)
        p5.text(props.type,30,30)
        

        if(props.type === "Ships"){
            let colors = p5.color(200,200,200)
            p5.fill(colors)
            shipsArray.forEach(element => {
                p5.rect(((element.positionX)*grid-4),((element.positionY)*grid)+18,(grid)*element.width-(10+(element.width-1)*3),(grid)*element.height-(10+(element.height-1)*5), 2, 2, 2, 2)
            })
            let color = p5.color(255,0,0)
            p5.fill(color)
            props.points.forEach(element => {
                p5.ellipse(((element.X+0.5)*grid)-8.5, ((element.Y+0.5)*grid)+12, 50, 50);
            });
        }else{
            if(!(x < 40 ||  y < 80)){
                p5.ellipse(x, y, 50, 50);
            }
        }
    };

    const mouseClicked = (p5) => {
        let x = snap(p5.mouseX)-8.5
        let y = snap(p5.mouseY)+12s
        // prevent default
        return false;
    }

    function snap(op) {
        var cell = Math.round((op - gridOffset) / grid);
        return cell * grid + gridOffset;
    }

    return <Sketch setup={setup} draw={draw} mouseClicked={mouseClicked}/>;
};
