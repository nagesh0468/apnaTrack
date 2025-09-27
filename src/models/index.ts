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
import createOrderModel from './userOrderModel';
const User = createUserModel(sequelize);
const Order = createOrderModel(sequelize);

export { sequelize, User,Order };
export default sequelize;
