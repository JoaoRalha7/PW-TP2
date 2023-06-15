import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const IdiomaModel = database.define('language', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  percent: {
    type: INTEGER,
    allowNull: false,
  },
});

export { IdiomaModel };
