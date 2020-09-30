import Sketch from "react-p5";
import React, { useState } from 'react';
import Board from './BattleShipModules/board'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";


export default (props) => {

    const [Menu, setMenu] = useState(0)
    const [EnemyPoints, setEnemyPoints] = useState([])
    const [GameCode, setGameCode] = useState("")
    const [Name, setName] = useState({})
    const [setup, setSetup] = useState(false)

    const socket = socketIOClient(ENDPOINT);

    let MakeGame = () => {

    }
    let JoinGames = (event) => {
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
        socket.emit('JoinGame', GameCode)
    }
    socket.on('GameAccepted', (info) => {
        console.log(info)
        setName(info)
        setMenu(3)
        setSetup(false)
    })

    setInterval(function () {
        let array = EnemyPoints
        array.push({ X: (Math.round(Math.random() * 9)) + 1, Y: (Math.round(Math.random() * 9)) + 1 })
        setEnemyPoints(array)
    }, 100000000)

    function onClicks(e) {
        e.target.focus()
        e.preventDefault()
        setGameCode(e.target.value)
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
                    <input className="buttonMain" type="number" placeholder="Create Game" key={Math.random} value={GameCode} onChange={onClicks} autofocus ref={input => input && input.focus()}></input>
                    <input className="buttonMain" type="submit" value="Submit"></input>
                </form>
                <br></br>
                <input className="buttonMain" type="button" onClick={e => Homepage(e)} value="Go back"></input>
            </div>)
        } else if (Menu === 3) {
            return (
                <div>
                    <h1>You are player {Name.player} it is currently  turn. </h1>
                    <div className="boards">
                        <Board type="Ships" points={Name[Name.Enemyplayer].shots} data={Name} />
                        <Board type="aiming" data={Name} />
                    </div>
                    <Setup />
                </div>
            )
        }
    }
    function Setup(){
        if(setup === false){
            return(<input className="buttonMain" type="button" value="Finish Setup" onClick={e => ready(e)}></input>)
        }else{
            return(<h1></h1>)
        }
    }

    function ready(e){
        e.preventDefault()
        setSetup(true)
    }


    return (
        <div className="MaimnBattleShip">
            <div style={{ margin: "auto", width: "fit-content" }}>
                <Menus />
            </div>
        </div>
    )
};

