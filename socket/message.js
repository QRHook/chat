// Author: Jarrett Cruger -> QR Hook
// Realization, everything is a module, a module is a function, period.

// Requires
var couch = require('../couch'),
    db = couch.master;

// API endpoint for this module
module.exports = message;
// Handle message Event
function message(client, data) {
    extractData(insert);
    // Get data to be inserted in database
    // How is data passed into this function?
    // Attached to client object or other arguments
    function extractData(cb) {
        var json = {};
        console.log(data.message);
        // Add message and timestamp to message document to be stored
        json.message = data.message;
        json.timestamp = data.timestamp;
        client.get('name', name);
        function name (err, name) {
            if(!err && name) {
                json.from = name;
                cb(null, json);
            } else {
                cb(err, null);
            }
        }
    }
    // Insert message into database
    function insert(err, json) {
        // Need certain parameters to insert
        // To, From, Room, etc.
        // Room should be a standard uuid
        if(!err && json) {
            db.insert(json, function (err, body) {
                if(!err && body) {
                    console.log(body);
                } else {
                    console.log(err);
                }
            });
        } else {
            console.log(err);
        }
    }
}
