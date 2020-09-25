import Sketch from "react-p5";
import React from 'react';
import '../../../App.css'

export default (props) => {
    

    let bg

    const setup = (p5, canvasParentRef) => {
        p5.createCanvas(744,744).parent(canvasParentRef);
        bg = p5.loadImage('https://raw.githubusercontent.com/farhathfaisal/battleship/master/Wiki/Image/game-board-assets.png?token=AC33YIWEDPH7PTFFSP6RJC25M6QJS')
    };
 
    const draw = (p5) => {
        p5.background(bg)
        let x = Math.round(p5.mouseX)
        let y = Math.round(p5.mouseY)
        p5.ellipse(x,y, 70, 70);
    };
    
    
    return <Sketch setup={setup} draw={draw} />;
};