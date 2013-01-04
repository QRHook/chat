// Author: Jarrett Cruger -> QR Hook
// Module for handling and creating chat box objects

var html = require('./html/chat');

module.exports = Chat;

function Chat (target) {
    if(!(this instanceof Chat)) return new Chat(target);

}
