import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(
  config.db.database,
  config.db.username,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'postgres',
    logging: false
  }
);

// Import models
import createUserModel from './userModel';
const User = createUserModel(sequelize);

export { sequelize, User };
export default sequelize;
