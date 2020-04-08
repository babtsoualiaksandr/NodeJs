const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const morgan = require('morgan');
const { createWriteStream } = require('fs');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(morgan('combined', { stream: createWriteStream('access.log') }));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);

app.use((error, req, res, next) => {
  console.error(error);
  switch (error.statusCode) {
    case 400:
      res
        .status(400)
        .send(`Ошибка ${error.body} statusCode: ${error.statusCode}`);
      break;

    default:
      res
        .status(500)
        .send(
          `Internal Server Error !!!!!!! ${error.body} statusCode: ${error.statusCode}`
        );
      break;
  }
  next();
});

module.exports = app;
