// Author: Jarrett Cruger -> QR Hook
// Realization, everything is a module, a module is a function, period.

// Requires
var couch = require('../couch'),
    db = couch.master;

// API endpoint for this module
module.exports = message;
// Handle message Event
function message(client, message, callback) {

    // Get data to be inserted in database
    // How is data passed into this function?
    // Attached to client object or other arguments
    function extractData() {

    }
    // Insert message into database
    function insert(callback) {
        // Need certain parameters to insert
        // To, From, Room, etc.
        // Room should be a standard uuid
        db.insert()
    }
}
