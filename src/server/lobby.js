const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function log (req, res, next) {
    console.log(`log: ${req.originalUrl}`);
    next()
});

// define the home page route
router.get('/', function (req, res) {
    res.send('Lobby Main page');
});

// define the about route
router.get('/about', function (req, res) {
    res.send('About Lobby');
});

module.exports = router;