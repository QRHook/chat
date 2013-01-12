// Author: Jarrett Cruger -> QR Hook
// Realization, everything is a module, a module is a function, period.

// Requires
var couch = require('../couch'),
    db = couch.master;

// API endpoint for this module
module.exports = message;
// Handle message Event
function message(data) {
    // Pieces data together and then inserts it into database
    extractData(insert);
    // Get data to be inserted in database
    // How is data passed into this function?
    // Attached to client object or other arguments
    function extractData(cb) {
        var json = {};
        console.log(data.message);
        // Add message and timestamp to message document to be stored
        json.message = data.message;
        json.timestamp = new Date();
        json.room = data.id;
        json.from = data.from;
        json.to = data.name;
        cb(json);
    }
    // Insert message into database
    function insert(json) {
        // Need certain parameters to insert
        // To, From, Room, etc.
        // Room should be a standard uuid
        db.insert(json, function (err, body) {
            if(!err && body) {
                console.log(body);
            } else {
                console.log(err);
            }
        });
    }
}
