// Author: Jarrett Cruger -> QR Hook
//
// Module for handling and creating chat box objects

var hyperglue = require('hyperglue');

var html = require('./html/chat');
var messageHtml = require('./html/message');

module.exports = Chat;

function Chat (target) {
    if(!(this instanceof Chat)) return new Chat(target);
    this.target = target;
    this.chats = {};
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
    button.addEventListener('click', function (e){
        e.preventDefault();
        var msg = div.querySelector('.message-input');
        console.log(msg);
        chat['message'] = msg.value;
        console.log(chat);
        socket.emit('msg', chat);
        msg.value = '';
    });
    self.chats[chat.id] = {id: chat.id, name: chat.name, element: div};
    self.target.appendChild(div);
}

Chat.prototype.destroy = Destroy;
function Destroy (chat) {

}

Chat.prototype.message = Message;
function Message (message) {
    var self = this;
    var div = hyperglue(messageHtml, {
        '.message': message.from + ': ' + message.message
    });
    console.log(message);
    console.log(div);
    var chat = self.chats[message.id];
    var textView = chat.element.querySelector('.text-view');
    textView.appendChild(div);
}
