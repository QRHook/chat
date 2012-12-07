// Author: Jarrett Cruger -> QR Hook

var filed = require('filed'),
    oppressor = require('oppressor');

exports.root = Root;
function Root () {
    filed('views/index.html')
        .pipe(oppressor(this.req))
        .pipe(this.res);
}
