// Author: Jarrett Cruger -> QR Hook

var flatiron = require('flatiron'),
    routes = require('./routes'),
    socket = require('./socket'),
    bootstrap = require('./bootstrapper'),
    app = flatiron.app;

exports.run = Run;
function Run () {
    // Plugins to setup the HTTP functionality
    app.use(flatiron.plugins.http);
    app.use(flatiron.plugins.static, {dir: __dirname + '/public', url: '/'});

    app.router.get('/', routes.root);

    bootstrap.setup(function () {
        app.start(3000, function () {
            console.log('Server Started');
            socket.start(app.server, function () {
                console.log('Sockets set to go');
            });
        });
    });
}

if(require.main === module) {
    Run();
}


