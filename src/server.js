const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
const mongoose = require('mongoose');

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
    initDb();
  } catch (err) {
    logger.log('error', `database Not connected! ${err}`);
  }
}
start();

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (reason, promise) => {
  logger.log('error', `Unhandled rejection detected: ${reason.message}`);
});

// eslint-disable-next-line no-unused-vars
process.on('uncaughtException', (error, origin) => {
  logger.log(
    'error',
    `uncaughtExceptionMonitor rejection detected: ${error.message}`
  );
  // eslint-disable-next-line no-process-exit
  process.exit(1);
});
