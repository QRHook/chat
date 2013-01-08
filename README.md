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

- Add General Chat for anyone who is connected to chat
- Abstract out the chat methods to its own module (chat:init etc.)
- Object actions on UI trigger socket actions on backend to handle logic of
  establishing chats (ex: adding a new chat)
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
