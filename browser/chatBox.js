// Author: Jarrett Cruger -> QR Hook
// Module for handling and creating chat box objects

var html = require('./html/chatBox');

module.exports = ChatBox;

function ChatBox (target) {
    if(!(this instanceof ChatBox)) return new ChatBox(target);

}
