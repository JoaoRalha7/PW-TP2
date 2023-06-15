import { INTEGER, STRING } from 'sequelize';
import { database } from '../config/context/database.js';

const EducationModel = database.define('education', {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  startDate: {
    type: STRING,
    allowNull: false,
  },
  endDate: {
    type: STRING,
    allowNull: false,
  },
  degree: {
    type: STRING,
    allowNull: false,
  },
  institution: {
    type: STRING,
    allowNull: false,
  },
});

export { EducationModel };
