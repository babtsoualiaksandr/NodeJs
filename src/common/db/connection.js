const logger = require('../logger');
const { MONGO_CONNECTION_STRING } = require('../config');
const mongoose = require('mongoose');
const url = MONGO_CONNECTION_STRING;

const connectToDb = cb => {
  try {
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = mongoose.connection;
    db.on('error', logger.log('error', `database Not connected! ${db.host}`));
    db.once('open', () => {
      logger.log('info', `database connected! ${db.host} ${db}`);
      cb();
    });
  } catch (err) {
    logger.log('error', `database Not connected! ${err}`);
  }
};

module.exports = { connectToDb };
