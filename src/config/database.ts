import fs from 'fs';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import uniqid from 'uniqid';
import logger from '../logger';
import { IDatabase } from '../db/interfaces';

require('dotenv').config();

const DB_DIR_PATH: string = path.join(__dirname, '..', process.env.DB_DIR || 'db');
const DB_FILE_PATH: string = path.join(DB_DIR_PATH, process.env.DB_FILE || 'db.json');

if (!fs.existsSync(DB_DIR_PATH)) {
  logger.info('[DATABASE] Writing database directory');
  fs.mkdirSync(DB_DIR_PATH);
} else {
  logger.info('[DATABASE] database directory already exists');
}

const ADAPTER = new FileSync<IDatabase>(DB_FILE_PATH);
const db = lowdb(ADAPTER);

function updateCount() {
  db.update('count', (n: number) => n + 1)
    .write();
}

function getAdmin(username: string, password: string) {
  return db.get('users')
    .find({ username, password, type: 'admin' })
    .value();
}

// Check if model exists
const userExists: boolean = db.has('users').value();

if (!userExists) {
  db.set('users', []).write();
}

// Check if count exists
const countExists: boolean = db.has('count').value();

if (!countExists) {
  db.set('count', 0).write();
}

// Default admin
const admin = {
  id: uniqid().toString(),
  username: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  type: process.env.ADMIN_TYPE,
};

// Check if admin exists
const adminExists = db.get('users').find({ username: admin.username }).value();

if (!adminExists) {
  db.get('users')
    .push(admin)
    .write();

  updateCount();
}

export { db, getAdmin };
