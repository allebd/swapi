import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import { config } from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import cors from 'cors';
import YAML from 'yamljs';
import path from 'path';
import swaggerUI from 'swagger-ui-express';
import helpers from './helpers';
import routes from './routes';

config();

const { PORT = 3000, NODE_ENV, SERVER_URL } = process.env;
const { errorHelper: { error404, developmentError, productionError } } = helpers;
const isProduction = NODE_ENV === 'production';
const log = debug('dev');
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

app.get('/', (request, response) => {
  response.status(200).send('Welcome to the Star Wars API!');
});

const documentation = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));
documentation.servers[0].url = SERVER_URL;

// setup swagger documentation
app.use('/docs', swaggerUI.serve, swaggerUI.setup(documentation));

app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(error404);

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(developmentError);
}

// production error handler
// no stack traces leaked to user
app.use(productionError);

app.listen(PORT, () => log(`App listening on port ${PORT}!`));

export default app;
