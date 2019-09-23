import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import sequelize from '../config/database';

// 格式化数据库
const db = {
  sequelize,
  Sequelize,
};
// 利用fs读取所有modeles，不用每个都自己引入
fs
  .readdirSync(__dirname)
  .filter(file =>
    path.extname(file) === '.js' &&
    file !== 'index.js',
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

export default db;
