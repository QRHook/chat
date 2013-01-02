// Author: Jarrett Cruger -> QR Hook
//
// Module that handles the chat list UI, adding and removing names as people
// connect and disconnect

var EventEmitter = require('events').EventEmitter;
var hyperglue = require('hyperglue');

var html = require('./html/listElement');

module.exports = ChatList;

function ChatList (target) {
    if(!(this instanceof ChatList)) return new ChatList(target);
    this.target = target;
    this.users = [];
    this.name = 'chatList';
}

ChatList.prototype = new EventEmitter;

// Add event to append a new user to the chatList object
ChatList.prototype.add = Add;
function Add (user) {
    var self = this;

}

ChatList.prototype.remove = Remove;
function Remove (user) {
    var self = this;

}
