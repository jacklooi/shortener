var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// define Schema
var UrlSchema = new Schema(
    {
        url: {type: String, required: true, max: 255},
        shorturl: {type: String, required: true, max: 100},
        code: {type: String, required: true, max: 50},
        clickcnt: {type: Number},
        lastused: {type: Date},
        createdate: {type: Date}
    }
);

module.exports.UrlSchema = UrlSchema;