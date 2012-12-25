// Author: Jarrett Cruger -> QR Hook
// Require socket related things.
// I want to attempt to do this without socket.io but TBD

var initDefaults = require('./initDefaults'),
    message = require('./message'),
    chat = require('./chat'),
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
        // Set name attribute of the client
        client.on('attr:name', function (data, callback) {
            if(data) {
                client.set('name', data.name, callback);
            }
        });
        // Initiate a chat by sending a message
        client.on('msg', function (data, callback) {
            if(data) {
                // Handles database logic for message asynchronously
                message(client, data);
                // Handle logic with communicating to specified person
                // Join a room with other party and emit message to that room
                chat(io, client, data, callback)
            }
        });
    });
}
