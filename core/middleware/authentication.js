var jwt = require('jwt-simple'),
    moment = require('moment'),
    config = require('../../config/constants'),
    log4js = require('log4js'),
    logger = log4js.getLogger('index');
    
    
logger.setLevel('INFO');

var middleware = {
    authenticate: ensureAuthenticated
}

function ensureAuthenticated(request, response, next) {
    if (!request.headers.authorization) {
        logger.warn('Request received without authentication header. This has been the request: '+ request);
        return response
            .status(401)
            .send({ message: 'Tu petición no tiene cabecera de autorización' });
    }

    var token = request.headers.authorization.split(' ')[1];
    var payload = jwt.decode(token, config.TOKEN_SECRET);

    if (payload.exp <= moment().unix()) {
        return response
            .status(401)
            .send({ message: 'El token ha expirado' });
    }

    request.user = {
        id: payload.id,
        username: payload.username,
        password: payload.password
    }
    next();
}

module.exports = middleware;