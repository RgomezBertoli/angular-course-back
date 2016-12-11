var express = require('express'),
    controller = require('./controller'),
    router = express.Router();

router.route('/register')
    .post(controller.post);

module.exports = router;