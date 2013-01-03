// Author: Jarrett Cruger -> QR Hook
//
// Main Router to handle the client side events
// Hands off control to UI controller objects

var ever = require('ever');

var socket = io.connect('http://localhost:3000');

socket.on('connect', function () {
    console.log('user:connect');
    socket.emit('user:connect');
});

var divs = {
    chatBox: document.querySelector('#chat-boxes'),
    chats: document.querySelector('#chats'),
    chatList: document.querySelector('#chat-list')
};

var chatList = require('./chatList')(divs.chatList);
var chatBox = require('./chatBox')(divs.chats);

// Calls add on UI to create a new user in the list
socket.on('user:connected', function (data) {
    chatList.add(data);
});

// Calls remove on Chat list to remove user who has disconnected
socket.on('user:disconnected', function (data) {
    chatList.remove(data);
});

// See how initialization works as a single page app with the loading of the UI
var singlePage = require('single-page');
var showPage = singlePage(function (href) {
    // Display initial elements on the page (only elements for time being)
    show(divs.chatBox);
    show(divs.chatList);


    function show (e) { e.style.display = 'block'; }
    function hide (e) { e.style.display = 'none'; }
});

// Will be useful when UI becomes more dynamic by catching a link to pushState
// change the UI using singlePage module
var catchLinks = require('catch-links');
catchLinks(document, showPage);
