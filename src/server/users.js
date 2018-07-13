const express = require('express');
const userManagement = express.Router();
const auth =require('./authentication');
const lobbyManagement = require('./lobby');
const _ = require('lodash');



// middleware that is specific to this router
userManagement.use(function log (req, res, next) {
    console.log(`log: ${req.originalUrl}`);
    next()
});


// define the home page route
userManagement.get('/', auth.userAuthentication, (req, res) => {
    const userName = auth.getUserInfo(req.session.id).name;
    res.json({name:userName});
});

userManagement.get('/allUsers', auth.userAuthentication, (req, res) => {
    const usersList = _.cloneDeep(auth.usersList);

    res.json(usersList);
    /*
        // TODO: somewhere show the list of users currently online like this :
        _.map(auth.usersList, user => {
            return (<li>{user.name}</li>);
        });
    */
});

userManagement.post('/addUser', auth.addUserToAuthList, (req, res) => {
    res.sendStatus(200);
});

userManagement.get('/logout', [
    (req, res, next) => {
        const userinfo = auth.getUserInfo(req.session.id);
        lobbyManagement.appendUserLogoutMessage(userinfo);
        next();
    },
    auth.removeUserFromAuthList,
    (req, res) => {
        res.sendStatus(200);
    }]
);

// define the about route
userManagement.get('/about', function (req, res) {
    res.send('About users');
});

module.exports = userManagement;