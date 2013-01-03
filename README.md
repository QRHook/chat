QR Hook Chat Experiment
-----------------------

THis project is being utilized to allow me to engage in an appropriate
development process. Thus far it has helped me understand the process of
creating a module and how to form pieces of a project.

## Project Plan

The plan for this project is to enable secure peer to peer chat. In the short
term this will be done over socket.io over a server. In the long term this will
be faciliated by WebRTC for pure Peer to Peer chat.

## TODO:

- Add a list of people that can be messaged (Active Chat only currently)
- Connect socket event to load names of chat list to event emitter on chat-list
  object
- Load General chat and chat list on hit of root URL
- Object actions on UI trigger socket actions on backend to handle logic of
  establishing chats (ex: adding a new chat)
- Figure out how data is conveyed to specify the individual chats
- Add ability to create new chat box for a conversation to begin
- Create controller object for chat boxes.
- Write the logic to properly place a new chat "group" together when a chat is
  initiated.
- Insert messages correctly timestamped into database
- Write a couchdb view to retrieve conversations from history
- Start stripping things out into separate modules
- Encrypt conversations (crypto-browserify).
- Setup messages to be passed over a streamlike interface
  [socketstream?][socketstream]. Hopefully it will be my own formulation as this
  process progresses.
- Encryption streams


[socketstream]: https://github.com/socketstream/socketstream-0.4
