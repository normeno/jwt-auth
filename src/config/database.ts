import fs from 'fs';
import lowdb from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';

const DB_DIR_PATH = path.join(__dirname, '..', process.env.DB_DIR || 'db');
const DB_FILE_PATH = path.join(DB_DIR_PATH, process.env.DB_FILE || 'db.json');

if (!fs.existsSync(DB_DIR_PATH)) {
  console.info('Writing database directory');
  fs.mkdirSync(DB_DIR_PATH);
}

const ADAPTER = new FileSync(DB_FILE_PATH);
const DB = lowdb(ADAPTER);

export default DB;
