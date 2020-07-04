import express from 'express';
import jwt from 'jsonwebtoken';
import { getAdmin } from '../config/database';
import logger from '../logger';
import { responses, IResponse } from './responses';

const router = express.Router();

const JWT_KEY = process.env.JWT_KEY || null;
const JWT_EXPIRED = process.env.JWT_EXPIRED || '6h';
const VERSION = process.env.APP_VERSION || '';

if (JWT_KEY == null) {
  logger.error('Something went wrong with the JWT configuration');
  process.exit();
}

function checkJWT(token: string) {
  return jwt.verify(token, JWT_KEY, (err, decoded) => {
    if (err) {
      return false;
    }

    logger.debug(`User ${decoded.username} authenticated`);
    return true;
  });
}

router.get('/version', (req, res) => {
  res.send(`Version: ${VERSION}`);
});

router.post('/auth', (req, res) => {
  const username = req.body.username || null;
  const password = req.body.password || null;

  let resp: IResponse;

  if (!username || !password) {
    resp = responses(40001);
    return res.status(resp.status).json(resp);
  }

  // Check user
  const admin = getAdmin(username, password);
  if (!admin) {
    resp = responses(40002);
    return res.status(resp.status).json(resp);
  }

  const payload = {
    username,
  };

  // Create JWT
  const token = jwt.sign(payload, JWT_KEY, {
    expiresIn: JWT_EXPIRED,
  });

  resp = responses(20001, { token });
  return res.status(resp.status).json(resp);
});

router.get('/auth', (req, res) => {
  const token: string = req.query.token.toString() || null;
  let resp: IResponse;

  if (!token) {
    resp = responses(40001);
    return res.status(resp.status).json(resp);
  }

  const check = checkJWT(token);

  if (!check) {
    resp = responses(40003);
    return res.status(resp.status).json(resp);
  }

  resp = responses(20001);
  return res.status(resp.status).json(resp);
});

module.exports = router;
