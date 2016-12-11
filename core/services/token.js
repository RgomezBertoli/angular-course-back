var jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('../../config/constants');

var tokenizer = {
    createToken: createToken
}

function createToken(user, password) {
    var payload = {
        id: user._id,
        username: user.username.toLowerCase(),
        password: password,
        iat: moment().unix(),
        exp: moment().add(config.tokenExpire.ammount, config.tokenExpire.unit).unix()
    };

    return jwt.encode(payload, config.TOKEN_SECRET);
}

module.exports = tokenizer;