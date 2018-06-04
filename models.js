var mongoose = require('mongoose');
var Url = require('./models/url');

// make a connection
mongoose.connect('mongodb://admin:password123@ds016068.mlab.com:16068/shorten');

// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log('connection succeeded');
});

var Url = mongoose.model('Url', Url.UrlSchema);

module.exports.Url = Url;