import express from 'express';

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const VERSION = process.env.APP_VERSION || '';

app.get('/version', (req, res) => {
  res.send(`Version: ${VERSION}`);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
