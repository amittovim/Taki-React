const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const session = require('express-session');

//router files
const userManagement = require('./server/users');
const lobbyManagement= require('./server/lobby');
const gameManagement = require('./server/game');

const app = express();

// Session middleware
app.use(session({secret: `Who's The Man Now... Mother $ucker!`, cookie: {maxAge:269999999999}}));

//bodyParser middleware
app.use(bodyParser.text());

// static
app.use(express.static(path.resolve(__dirname, "..", "public")));

//routing
app.use('/users',  userManagement);
app.use('/lobby', lobbyManagement);
app.use('/game' ,  gameManagement);

app.listen (3010, () => {
    console.log('TAKI server ON. Listening on port 3010!');
});