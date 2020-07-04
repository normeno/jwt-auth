import express from 'express';
import DB from './config/database';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || '';

DB.defaults({ users: [], count: 0 }).write();

app.get('/version', (req, res) => {
  res.send(`Version: ${VERSION}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
