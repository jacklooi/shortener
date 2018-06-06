require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route');

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use('/', route);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('Shortener service listening on port ' + port);
});
