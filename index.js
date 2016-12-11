var express = require('express'),
    bodyParser = require('body-parser'),
    config = require('./config/constants'),
    middleware = require('./core/middleware/authentication')
    cors = require('cors'),
    log4js = require('log4js'),
    odm = require('mongoose');

log4js.configure({
    appenders: [
        { type: 'console', category: 'index' },
        { type: 'console', category: 'features' },
        { type: 'console', category: 'core' },
        { type: 'console', category: 'config' }
    ],
    replaceConsole: true
});

var logger = log4js.getLogger('index');
logger.setLevel('INFO');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('./api'));

app.use('/public',
    require('./api/login/routes'),
    require('./api/register/routes'));


app.all('/private/*', middleware.authenticate)

app.use('/private',
    require('./api/tasks/routes'));

odm.connect(config.mongodb.url + config.mongodb.user + ':' + config.mongodb.password +
    config.mongodb.port + config.mongodb.db, function (err) {
        app.listen(config.express.port, function () {
            logger.info('2 - Server listenning on port ' + config.express.port);
        });
    });