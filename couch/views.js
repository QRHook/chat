// Author: Jarrett Cruger -> QR Hook
//
// Create Views to be used for particular querys

var cradle = require('cradle');
var db = new(cradle.connection)().database('chat');

db.save('_design/chat', {
    generalHistory: {
        map: function (doc) {
            if (doc.room === 'general' && doc.from && doc.to) {
                emit(doc.timestamp, doc);
            }
        }
    },
    chatHistory: {
        map: function (doc) {
            if(doc.from && doc.to) {
                var key = [doc.from, doc.to].sort(function (a, b) {
                    return a.localeCompare(b);
                });
                emit(key.concat(doc.timestamp), doc);
            }
        }
    }
});
