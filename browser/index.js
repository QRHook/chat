// Author: Jarrett Cruger -> QR Hook

var async = require('async');

var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {

});

async.series([
    function setName (callback) {
        socket.emit('attr:name', {name: 'Jarrett'});
        callback();
    },
    function sendMessage (callback) {
        socket.send({message: "test message for inserting in the database"});
        callback();
    }
], function (err, res) {
    if(!err && res) {
        console.log('Success');
    }
});
