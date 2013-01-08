// Author: Jarrett Cruger -> QR Hook
//
// Module for handling and creating chat box objects

var hyperglue = require('hyperglue');

var html = require('./html/chat');

module.exports = Chat;

function Chat (target) {
    if(!(this instanceof Chat)) return new Chat(target);
    this.target = target;
    this.chats = [];
}

Chat.prototype.create = Create;
function Create (socket, chat) {
    var self = this;
    var div = hyperglue(html, {
        '.chat-title': chat.name
    });
    // Add correct event for sending messages
    var button = div.querySelector('.send-message');
    console.log(button);
    button.addEventListener('onclick', function (e){
        e.preventDefault();
        var msg = div.querySelector('.message');
        chat['message'] = msg.value;
        console.log(chat);
        socket.emit('msg', chat);
        msg.value = '';
    });
    self.chats.push({id: chat.id, name: chat.name, element: div});
    self.target.appendChild(div);
}
