// Author: Jarrett Cruger -> QR Hook
// Require socket related things.
// I want to attempt to do this without socket.io but TBD

var initDefaults = require('./initDefaults'),
    message = require('./message'),
    chat = require('./chat'),
    socket = require('socket.io'),
    uuid = require('node-uuid');

var users = {};

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
                client.set('name', data.name);
                client.get('name', callback);
            }
        });
        client.on('user:connect', function () {
            // Add user to the list and create guest name for time being
            client.get('id', set);
            function set (err, res) {
                if(!res) {
                    var id = uuid();
                    var name = 'guest' + id;
                    client.set('id', id);
                    client.set('name', name);
                    var user = {name: name, id: id};
                    users[id] = user;
                    console.log(name);
                    client.broadcast.emit('user:connected', user);
                }
            }
        });
        // Sends back list of users currently connected (not including self)
        client.on('user:load', function (callback) {
            var count = 0;
            var keys = Object.keys(users);
            var newUsers = {};
            client.get('id', check);
            function check(err, id) {
                function end () {
                    ++count;
                    if(count === keys.length) {
                        console.log('users returned not including self')
                        callback(newUsers);
                    }
                }

                if(id) {
                    keys.forEach(function (key) {
                        if(key !== id) {
                            newUsers[key] = users[key];
                            end();
                        }
                    });
                } else {
                    console.log('User that connected does not have ID set yet');
                    callback(users);
                }
            }
        });
        client.on('disconnect', function () {
            console.log('user disconnected');
            client.get('id', kill);
            function kill (err, id) {
                if(!err && id) {
                    client.broadcast.emit('user:disconnected', users[id]);
                    delete users[id];
                }
            }
        });
        // Initiate a chat by sending a message
        client.on('show:sockets', function () {
            console.log(io.sockets);
        });
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
