import { DataSource } from 'typeorm';

import User from './Entities/User';

require('dotenv').config();

const { DB_NAME, DB_PASS, DB_USER } = process.env;

const dataSource = new DataSource({
  type: 'mysql',
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASS,
  logging: true,
  synchronize: false,
  entities: [User],
});

export default dataSource;
