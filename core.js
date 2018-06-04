var UrlModel = require('./models');

var geturllist = function (req, callback) {
    var Url = UrlModel.Url;
    Url.find({ }, function(err, data) {
        if(data.length) console.log(data.length + ' records found');
        else console.log('no record found');

        let json = prettifyJSON(data);
        
        return callback(null, json);
    });
};

var getfullurl = function (req, callback) {
    var shorturl = req.protocol + '://' + req.get('host') + '/' + req.params.id;
    var Url = UrlModel.Url;
    Url.findOne({ shorturl: shorturl }, function(err, data) {
        var json = '';
        if (data) {
            data.clickcnt++;
            data.lastused = Date.now();

            data.save(function (err) {
                console.log('counter updated');
                if (err) console.error(err);
            });

            json = prettifyJSON( { url: data.url } );
        }
        else
            json = prettifyJSON(data);
        
        return callback(null, json);
    });
};

var shortenurl = function (req, callback) {
    var requesturl = req.body.url;
    var short = generateId(6);
    var shorturl = req.protocol + '://' + req.get('host') + '/' + short;

    var Url = new UrlModel.Url({
        url: requesturl,
        shorturl: shorturl,
        code: short,
        clickcnt: 0,
        createdate: Date.now()
    });

    Url.save(function(err) {
        console.log(requesturl + ' saved');
        if (err) console.error(err);
    });

    let json = prettifyJSON( { url: requesturl, shorturl: shorturl } );

    return callback(null, json);
};

// Common functions
var prettifyJSON = function (json) {
    return JSON.stringify(json, null, 4);
}

var generateId = function(length) {
    var text = "";
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++)
        text += chars.charAt(Math.floor(Math.random() * chars.length));
    
    return text;
}

exports.geturllist = geturllist;
exports.getfullurl = getfullurl;
exports.shortenurl = shortenurl;