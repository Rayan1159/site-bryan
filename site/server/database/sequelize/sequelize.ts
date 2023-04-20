import {Sequelize} from "sequelize";
import * as path from "path";
import * as dotenv from "dotenv";
import * as process from "process";

const db_path = process.env['DB_PATH '] ? process.env['DB_PATH '] : path.join(__dirname, '/database.sqlite');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  logging: false,
  storage: db_path
});

export default sequelize;
