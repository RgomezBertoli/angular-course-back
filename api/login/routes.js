var express = require('express'),
    controller = require('./controller'),
    router = express.Router();

router.route('/login')
    .post(controller.post);

module.exports = router;