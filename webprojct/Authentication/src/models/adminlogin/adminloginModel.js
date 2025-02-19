import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

const AdminLogin = sequelize.define("AdminLogin", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default AdminLogin;
