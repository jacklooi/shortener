require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route');

const app = express();

app.use(bodyParser.json());
app.use('/', route);

var port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Shortener service listening on port ' + port);
});