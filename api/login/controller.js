var User = require('../../models/user'),
    logger = require('log4js'),
    log = logger.getLogger('features'),
    md5 = require('md5'),
    token = require('../../core/services/token');

log.setLevel('INFO');

var data = {
    post: post
}

function post(req, res){
    User.findOne({
        username: req.body.username.toLowerCase()
    })
    .then(checkUser)
    .catch(error)


    function checkUser(user){
        if(user && user !== null && user.pass === md5(req.body.pass)){
            return res.send({
                error: 0,
                token: token.createToken(user, user.pass)
            });
        } else {
            return Promise.reject('ERROR USUARIO NO EXISTE');
        }
    }

    function error(err){
        log.error('ERROR en LOGIN: ' + err);
        res.status(500).send({
            error: 1
        });
    }
}

module.exports = data;