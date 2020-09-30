import Sketch from "react-p5";
import React, { useState } from 'react';
import Board from './BattleShipModules/board'

export default (props) => {

    const [Menu, setMenu] = useState(0)

    let MakeGame = () => {

    }
    let JoinGames = (event) => {
        console.log(event)
        if (event === undefined) { return }
        setMenu(1)
    }
    let Homepage = (event) => {
        if (event === undefined) { return }
        setMenu(0)
    }
    let formsubmitted = (event) => {
        event.preventDefault();
        if (event === undefined) { return }
        setMenu(3)
    }


    function Menus() {
        if (Menu === 0) {
            return (<div style={{ float: "left", display: "inline", height: "100%" }} className="innerDiv">
                <h1>Welcome to BattleShips</h1>
                <h2>Do you want to create or join a game?</h2>
                <input className="buttonMain" type="button" onClick={e => MakeGame(e)} value="Create Game"></input>
                <input className="buttonMain" type="button" onClick={e => JoinGames(e)} value="Join Game"></input>
            </div>)
        } else if (Menu === 1) {
            return (<div style={{ float: "left", display: "inline", height: "100%" }} className="innerDiv">
                <h1>Enter the game code below:</h1>
                <form onSubmit={e => formsubmitted(e)}>
                    <input className="buttonMain" type="text" placeholder="Create Game"></input>
                    <input className="buttonMain" type="submit" value="Submit"></input>
                </form>
                <br></br>
                <input className="buttonMain" type="button" onClick={e => Homepage(e)} value="Go back"></input>
            </div>)
        }else if (Menu === 3){
            return (<Board type="aiming" />)
        }
    }


    return (
        <div className="MaimnBattleShip">
            <div style={{ margin: "auto", width: "fit-content" }}>
                <Menus />
            </div>
        </div>
    )
};

