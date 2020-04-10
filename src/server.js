/* eslint-disable no-process-exit */
/* eslint-disable no-unused-vars */
const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./common/logger');
app.listen(PORT, () =>
  logger.log('info', `App is running on http://localhost:${PORT}`)
);

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
