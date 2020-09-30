var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

let games = {
    1: {
        players: 1,
        code: 57582,
        socketsListening: [],
        PlayerASoc: "",
        PlayerBSoc: "",
        PlayerA: {
            shots: [{ 
                X: 5, 
                Y: 6 
            },
            { 
                X: 2, 
                Y: 3 
            }],
            ships: [{
                positionX: 6,
                positionY: 10,
                width: 4,
                height: 1,
            }],
        },
        PlayerB: {
            shots: [{ 
                X: 5, 
                Y: 6 
            }],
            ships: [{
                positionX: 6,
                positionY: 10,
                width: 4,
                height: 1,
            }],
        }
    }
}

function CreateCode(){
    let pin = Math.random()
    pin = pin*10000
    let exists = false
    Object.keys(games).forEach(element => {
        if(element === pin){
            exists = true
        }
    });
    if(exists === true){
        CreateCode()
    }else{
        return pin
    }
}


io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('CreateGame', (data) => {
        let newpin = CreateCode()
        games[newpin] = {
            players: 1,
            code: newpin,
            socketsListening: [],
            PlayerASoc: `${socket.id}`,
            PlayerBSoc: "",
            PlayerA: {
                shots: [],
                ships: [],
            },
            PlayerB: {
                shots: [],
                ships: [],
            }
        }
        socket.emit('YourData',games[newpin])
    })


    socket.on('JoinGame',(data) => {
        console.log(data)
        if(games[data] === undefined){
            socket.emit('NoGame',false)
        }else{
            if(games[data].players == 2){
                socket.emit('Full',false) 
            }else{
                let Packet = games[data]
                Packet.player = "PlayerB"
                Packet.Enemyplayer = "PlayerA"
                socket.emit('GameAccepted',Packet)
                let newData = games[data]
                newData.players = 2
                newData.PlayerBSoc = socket.id 
                games[data] = newData
            }
        }
    })
});



http.listen(4001, () => {
    console.log('listening on *:3000');
});