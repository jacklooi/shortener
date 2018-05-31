var shorten = function (req, callback) {
    let url = req.body.url;
    let short = generateId(6);

    // TODO: store data
    let json = prettifyJSON( { url: url, shorturl: short } );

    return callback(null, json);
};

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

exports.shorten = shorten;