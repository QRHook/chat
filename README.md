QR Hook Chat Experiment
=======================

This project is being utilized to allow me to engage in an appropriate
development process. Thus far it has helped me understand the process of
creating a module and how to form pieces of a project.

## Project Plan ##
The plan for this project is to enable secure peer to peer chat. In the short
term this will be done over socket.io over a server. In the long term this will
be faciliated by WebRTC for pure Peer to Peer chat.

## TODO ##

- Spawn new chats between users
- Write a couchdb view to retrieve conversations from history
- Start stripping things out into separate modules
- Do some kind of sane CSS to prevent eyes from bleeding
- Encrypt conversations (crypto-browserify).
- Setup messages to be passed over a streamlike interface
  [socketstream?][socketstream]. Hopefully it will be my own formulation as this
  process progresses.
- Encryption streams

[socketstream]: https://github.com/socketstream/socketstream-0.4
