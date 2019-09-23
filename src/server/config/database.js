import Sequelize from 'sequelize';
import path from 'path';

const sequelize = new Sequelize('graphql_sequelize_test', 'root', '', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite')
});

export default sequelize;
