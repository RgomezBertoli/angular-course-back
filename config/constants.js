var config = {
    express: {
        //port: 6380,
        port: process.env.PORT || 5000 
    },
    mongodb: {
        url: 'mongodb://',
        user: 'altran.developer',
        password: 'Altran-2014',
        port: '@ds127928.mlab.com:27928/',
        db: 'to-do-course',
        tasks: 'to-do',
        users: 'users'
    },
    tokenExpire : {
        ammount : 1,
        unit : 'day'
    },
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'tokenultrasecreto',
}

module.exports = config;