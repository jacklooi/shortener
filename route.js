var express = require('express');
var router = express.Router();
var core = require('./core');

// Log time when use this router
router.use(function timeLog (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Method', 'GET,POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    res.setHeader('Content-Type', 'application/json');

    console.log('Time: ', Date.now());
    next();
});

// GET /
router.get('/', function(req, res) {
    res.send('Hello World');
});

// GET /{id}
router.get('/:id', function (req, res) {
    var id = req.params.id;
    res.send('Hey ' + id);
});

// POST /shorten
router.post('/shorten', function (req, res) {
    core.shorten(req, function(err, respond){
        if (err) return next(err);
        return res.send(respond);
    });
});

module.exports = router;