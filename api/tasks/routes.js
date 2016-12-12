var express = require('express'),
    controller = require('./controller'),
    router = express.Router();

router.route('/tasks')
    .get(controller.get)
    .post(controller.post);

router.route('/tasks/:id')
    .put(controller.put)
    .delete(controller.delete);

module.exports = router;