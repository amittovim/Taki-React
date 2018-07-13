const usersList= {};

function userAuthentication(req, res, next) {
    debugger;
    if (usersList[req.session.id] === undefined) {
        res.sendStatus(401);
    } else {
        next();
    }
}

function addUserToAuthList(req, res, next) {
    debugger;
    if (usersList[req.session.id] !== undefined) {
        res.status(403).send('user already exist');
    } else {
/*        for (sessionid in userList) {
            debugger;
            console.log('test1');
            const name = usersList[sessionid];
            if (name === req.body) {
                res.status(403).send('user name already exist');
                return;
            }
        }*/
        usersList[req.session.id] = req.body;
        next();
    }
}

function removeUserFromAuthList(req, res, next) {
    debugger;
    if (usersList[req.session.id] === undefined) {
        res.status(403).send('user does not exist');
    } else {
        delete usersList[req.session.id];
        next();
    }
}

function getUserInfo(id)  {
    debugger;
    return {name: usersList[id]};
}
module.exports = {userAuthentication, addUserToAuthList, removeUserFromAuthList, getUserInfo, usersList}