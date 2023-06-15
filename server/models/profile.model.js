// perfil.model.js

import { INTEGER, STRING } from "sequelize";
import { database } from "../config/context/database.js";

const ProfileModel = database.define("profile", {
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome:{
    type: STRING,
    allowNull: false,
  },
  profissao:{
    type: STRING,
    allowNull:false,

  },
  description: {
    type: STRING,
    allowNull: false,
  },
});

export { ProfileModel };
