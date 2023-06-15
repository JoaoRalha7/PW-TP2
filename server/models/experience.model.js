// experience.model.js

import { INTEGER, STRING } from "sequelize";
import { database } from "../config/context/database.js";

const ExperienceModel = database.define("experience", {
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
  companyName: {
    type: STRING,
    allowNull: false,
  },
  position: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: false,
  },
});

export { ExperienceModel };
