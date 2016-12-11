var Task = require('../../models/tasks'),
    logger = require('log4js'),
    log = logger.getLogger('features'),
    md5 = require('md5');

log.setLevel('INFO');

var data = {
    get: get,
    post: post,
    put: put
}

function get(req, res) {
    var skip = parseInt(req.query.skip ? req.query.skip : 0, 10);
    var limit = parseInt(req.query.limit ? req.query.limit : 10, 10);

    Task.find({
        ownerId: req.user.id
    })
        .skip(skip)
        .limit(limit)
        .then(checkTasks)


    function checkTasks(tasks) {
        if (tasks && tasks !== null) {
            return res.send({
                error: 0,
                tasks: tasks
            });
        } else {
            return Promise.reject('[GET] NO HAY TASKS');
        }
    }

    function error(err) {
        log.error('ERROR en TASK: ' + err);
        res.status(500).send({
            error: 2
        });
    }
}

function post(req, res) {

    var task = new Task(Object.assign({}, { ownerId: req.user.id }, req.body));
    task.save()
        .then(() => savedTask(task))
        .catch(error);

    function savedTask(task) {
        if (task && task !== null) {
            return res.send({
                error: 0,
                task: task
            });
        } else {
            return Promise.reject('[POST] ERROR AL GUARDAR TASK');
        }
    }

    function error(err) {
        log.error('ERROR en TASK: ' + err);
        res.status(500).send({
            error: 2
        });
    }
}

function put(req, res) {

    Task.findOneAndUpdate({
        _id: req.params.id
    },
    Object.assign({},req.body),
    {
        new: true
    })
    .then(editedTask)
    .catch(error);

    function editedTask(task) {
        if (task && task !== null) {
            return res.send({
                error: 0,
                task: task
            });
        } else {
            return Promise.reject('[POST] ERROR NO EXISTE TASK');
        }
    }

    function error(err) {
        log.error('ERROR en TASK: ' + err);
        res.status(500).send({
            error: 2
        });
    }
}

module.exports = data;