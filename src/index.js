import express, { json, urlencoded } from 'express';
import errorhandler from 'errorhandler';
import { config } from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';

config();

const { PORT = 3000, NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';
const log = debug('dev');
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

if (!isProduction) {
  app.use(errorhandler());
}

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Star Wars API!');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
    log(err.stack);

    if (res.headersSent) {
      return next(err);
    }

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stack traces leaked to user
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message
    }
  });
});

app.listen(PORT, () => log(`App listening on port ${PORT}!`));
