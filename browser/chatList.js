// Author: Jarrett Cruger -> QR Hook
//
// Module that handles the chat list UI, adding and removing names as people
// connect and disconnect

module.exports = ChatList;

function ChatList (target) {
    if(!(this instanceof ChatList)) return new ChatList(target);
}
