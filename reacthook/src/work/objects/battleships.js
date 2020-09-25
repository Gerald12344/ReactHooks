import Sketch from "react-p5";
import React from 'react';
import Board from './BattleShipModules/board'
import syles from '../../App.css'

export default (props) => {
    
    
    
    return(
        <div className="MaimnBattleShip">
        <div style={{float:"left",display:"inline"}}>
        <h1>Players</h1>
        <Board />
        </div>
        <div style={{float:"left",display:"inline",height:"100%"}} className="innerDiv">
        <h1>Welcome to BattleShips</h1>
        <h2>Do you want to create or join a game?</h2>
        <input></input>
        </div>
        </div>
    ) 
};