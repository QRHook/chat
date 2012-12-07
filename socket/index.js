
// Require socket related things.
// I want to attempt to do this without socket.io but TBD
var initDefaults = require('./settings');

exports.start = Start;
function Start (server, callback) {
    initDefaults(server)
}

function Listen () {

}
