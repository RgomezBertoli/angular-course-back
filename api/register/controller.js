var User = require('../../models/user'),
    logger = require('log4js'),
    log = logger.getLogger('features'),
    md5 = require('md5'),
    token = require('../../core/services/token');

log.setLevel('INFO');

var data = {
    post: post
}

function post(req, res) {
    User.findOne({
        username: req.body.username.toLowerCase()
    })
        .then(checkUser)
        .catch(error)


    function checkUser(user) {
        if (user && user !== null) {
            return Promise.reject('ERROR USUARIO YA EXISTE');
        } else {
            var user = new User(Object.assign({}, {
                username: req.body.username,
                pass: md5(req.body.pass)
            }));
            return user.save().then(() => savedUser(user));
        }
    }

    function savedUser(user) {
        var userToken = token.createToken(user, user.pass);
        res.send({
            error: 0,
            token: userToken
        });
    }

    function error(err) {
        log.error('ERROR en REGISTER: ' + err);
        res.status(500).send({
            error: 2
        });
    }
}

module.exports = data;