/* eslint-disable no-process-exit */
/* eslint-disable no-unused-vars */
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const mongoose = require('mongoose');
const cathErrors = require('./common/catchErrors');
const initDb = require('./common/db/initDb');
async function start() {
  const url = MONGO_CONNECTION_STRING;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () =>
      logger.log('info', `App is running on http://localhost:${PORT}`)
    );
    logger.log(
      'info',
      `database connected! url ${mongoose.connection.host} nameBD: ${mongoose.connection.name} port: ${mongoose.connection.port}`
    );
  } catch (err) {
    logger.log('error', `database Not connected! ${err}`);
  }
}
start();

initDb();

// TODO: для проверки unhandledRejection uncaughtException
/* setTimeout(() => {
  Promise.reject(new Error('Promise Oops!'));
}, 1500);

setTimeout(() => {
  throw new Error('Oops!');
}, 2500); */

process.on('unhandledRejection', (reason, promise) => {
  logger.log('error', `@@@@ Unhandled rejection detected: ${reason.message}`);
});

process.on('uncaughtException', (error, origin) => {
  logger.log(
    'error',
    `##uncaughtExceptionMonitor rejection detected: ${error.message}`
  );
  process.exit(1);
});
