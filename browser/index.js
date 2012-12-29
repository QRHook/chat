// Author: Jarrett Cruger -> QR Hook

var async = require('async'),
    byId = require('by/id'),
    $ = require('by/queryAll'),
    ever = require('ever');

var socket = io.connect('http://localhost:3000');

// Select button that sets name for the socket client
var setName = byId('set-name');
// listen on click event for setName
ever(setName).on('click', function (ev) {
    ev.stopPropagation();
    var ele = byId('name');
    socket.emit('attr:name', {name: ele.value}, function (err, res) {
        if(!err && res) {
            console.log(res);
        } else {
            console.log(err);
        }
    });
});

var sendMsg = byId('send-message');
ever(sendMsg).on('click', function (ev) {
    ev.stopPropagation();
    var ele = byId('message');
    socket.emit('msg', {message: ele.value}, function (err, res) {
        console.log('returned');
    });
});
/*async.series([
    function setName (callback) {
        socket.emit('attr:name', {name: 'Jarrett'});
        callback();
    },
    function sendMessage (callback) {
        var date = new Date();
        console.log(date);
        socket.emit('msg', {message: "test message for inserting in the database", timestamp:date}, hey);
        callback();
    }
], function (err, res) {
    if(!err && res) {
        console.log('Success');
    }
});

function hey(err, res) {
    console.log(res);
}*/
