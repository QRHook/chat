// Author: Jarrett Cruger -> QR Hook
// Require socket related things.
// I want to attempt to do this without socket.io but TBD

var initDefaults = require('./initDefaults'),
    message = require('./message'),
    chat = require('./chat'),
    socket = require('socket.io'),
    async = require('async'),
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
        // Broadcasts to other clients that this new user has connected
        client.on('user:connect', function (callback) {
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
                    callback();
                }
            }
        });
        // Sends back list of users currently connected (not including self)
        // Used to load the user list on new client connect
        client.on('user:load', function (callback) {
            console.log('User:Load');
            var keys = Object.keys(users);
            var newUsers = {};
            client.get('id', check);
            function check(err, id) {
                if(id) {
                    console.log('User has id');
                    async.forEach(keys, function (key, cb) {
                        if (key !== id) {
                            newUsers[key] = users[key];
                        }
                        cb();
                    }, function end (err) {
                        if (!err) {
                            console.log('users returned');
                            callback(newUsers);
                        }
                    });
                } else {
                    console.log('User that connected does not have ID set yet');
                    callback(users);
                }
            }
        });
        // Send a message of the user that disconnected to be removed from the
        // list
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
        // Abstract this out into the actual chat module
        // Initializes any saved chats (<---TODO) and Passes object to init
        // General Chat
        var general = {id: 'general', name: 'General'};
        client.on('chat:init', function (callback) {
            client.get('id', get);
            function get (err, id) {
                if(!err && id) {
                    joinChats(id);
                }
            }
            function joinChats (id) {
                var user = users[id];
                if (!user.chats) {
                    user.chats = {};
                }
                user.chats[general.id] = general;
                client.join(general.id);
                callback(user.chats);
            }
        });
        // Handles message logic and relays it correct chat
        client.on('msg', function (data) {
            if(data) {
                client.get('name', get);
                function get (err, res) {
                    if(!err && res) {
                        data['from'] = res;
                        // Insert message into database
                        message(data);
                        // Send message to clients
                        io.sockets.in(data.id).emit('chat:msged', data);
                    }
                }
            }
        });
    });
}
