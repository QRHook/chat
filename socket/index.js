// Author: Jarrett Cruger -> QR Hook
// Require socket related things.
// I want to attempt to do this without socket.io but TBD
var initDefaults = require('./initDefaults'),
    socket = require('socket.io');

exports.start = Start;
function Start (server, callback) {
    var io = socket.listen(server);
    // Initialize the normal default settings for sockets
    initDefaults(io, Listen);

    callback();

}

// After initialized this is the callback that sets up all the listeners
function Listen (io) {
    // Listen for connection
    io.sockets.on('connection', function (client) {

    });
}
