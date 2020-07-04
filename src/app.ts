import express from 'express';
import bodyParser from 'body-parser';
import { db } from './config/database';
import logger from './logger';

require('dotenv').config();

if (!db.getState()) {
  logger.error('Something went wrong with database');
  process.exit();
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('./routes/routes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.success(`[SERVER] listening on port ${PORT}.`);
});
