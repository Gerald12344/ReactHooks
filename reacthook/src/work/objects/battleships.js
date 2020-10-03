import Sketch from "react-p5";
import React, { useState } from 'react';
import Board from './BattleShipModules/board'
import {SocketIOContext} from '../../SocketIOContext';
import useInterval from '../../useInterval';

export default (props) => {

    const [Menu, setMenu] = useState(0)
    const [EnemyPoints, setEnemyPoints] = useState([])
    const [GameCode, setGameCode] = useState("")
    const [Name, setName] = useState({})
    const [setup, setSetup] = useState(false)

    // JMS: Pull the socket in from the context
    // Way better than drilling a hole through all the components via props
    const socket = React.useContext(SocketIOContext);

    // JMS: useCallback prevents these functions being redeclared constantly
    let MakeGame = React.useCallback((event) => {

    }, []);
    
    let JoinGames = React.useCallback((event) => {
        if (event === undefined) { return }
        setMenu(1)
    }, [setMenu])

    let Homepage = React.useCallback((event) => {
        if (event === undefined) { return }
        setMenu(0)
    }, [setMenu])

    let formsubmitted = React.useCallback((event) => {
        event.preventDefault();
        if (event === undefined) { return }
        socket.emit('JoinGame', GameCode)
    }, [socket])

    // JMS: Only redo this if the things in the dependency array change, not every render
    React.useEffect(() => {
        socket.on('GameAccepted', (info) => {
            console.log(info)
            setName(info)
            setMenu(3)
            setSetup(false)
        })
    }, [socket, setName, setMenu, setSetup])

    // JMS: There is a major impedence mismatch between setInterval and the React model
    // Replace this with 'useInterval' which I have borrowed from another project and pasted into yours...
    useInterval(function () {
        let array = EnemyPoints
        array.push({ X: (Math.round(Math.random() * 9)) + 1, Y: (Math.round(Math.random() * 9)) + 1 })
        setEnemyPoints(array)
    }, 100000000)

    const onClicks = React.useCallback((e) => {
        e.target.focus()
        e.preventDefault()
        setGameCode(e.target.value)
    }, [setGameCode])

    // JMS: I would be tempted to 
    function Menus() {
        if (Menu === 0) {
            return (<div style={{ float: "left", display: "inline", height: "100%" }} className="innerDiv">
                <h1>Welcome to BattleShips</h1>
                <h2>Do you want to create or join a game?</h2>
                {/* JMS: Don't pass anonymouse function in as onClick, otherwise they get regenerated for every render (React beartrap)*/}
                <input className="buttonMain" type="button" onClick={MakeGame} value="Create Game"></input>
                <input className="buttonMain" type="button" onClick={JoinGames} value="Join Game"></input>
            </div>)
        } else if (Menu === 1) {
            return (<div style={{ float: "left", display: "inline", height: "100%" }} className="innerDiv">
                <h1>Enter the game code below:</h1>
                <form onSubmit={e => formsubmitted(e)}>
                    {/* JMS: What is the key attribute doing on this input? */}
                    <input className="buttonMain" type="number" placeholder="Create Game" key={Math.random} value={GameCode} onChange={onClicks} autofocus ref={input => input && input.focus()}></input>
                    <input className="buttonMain" type="submit" value="Submit"></input>
                </form>
                <br></br>
                <input className="buttonMain" type="button" onClick={Homepage} value="Go back"></input>
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

