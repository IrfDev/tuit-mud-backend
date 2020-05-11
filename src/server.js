const logger = require('./Lib/winston')
const error = require('./Middlewares/error')


const cors = require('cors')

const morgan = require('morgan');

const express = require('express');
const app = express();
require('./Lib/routes')(app)


process.on('uncaughtException', (ex) => {
    logger.logger.error(ex.message, ex)
    process.exit
})
process.on('unhandledRejection', (ex) => {
    logger.logger.error(ex.message, ex)
    process.exit
})

app.use(express.urlencoded({ extended: true }))

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

// Process it's a node object that return some information
console.log(`app:${app.get('env')}`)


// Aquí es dónde puedes aplicar algo de código dependiendo del entorno de programación que estés utilizando.
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}
module.exports = app