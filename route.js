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
	return res.render('./public/index.html');
});

// GET /list
router.get('/list', function(req, res) {
    core.geturllist(req, function(err, respond) {
        if (err) return next(err);
        return res.send(respond);
    });
});

// GET /{id} for page redirect
router.get('/:id', function (req, res) {
    core.getfullurl(req, function(err, respond) {
        if (err) return next(err);
        return res.redirect(respond);
    });
});

// GET /error/404
router.get('/error/404', function (req, res) {
    core.notfound(req, function(err, respond) {
        if (err) return next(err);
        return res.send(respond);
    });
});

// POST /shorten
router.post('/shorten', function (req, res) {
    core.shortenurl(req, function(err, respond) {
        if (err) return next(err);
        return res.send(respond);
    });
});

module.exports = router;
