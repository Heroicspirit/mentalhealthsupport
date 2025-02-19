import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js"; // Make sure to import sequelize correctly

const AdminLogin = sequelize.define("AdminLogin", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Auto-increment for new records
    allowNull: false, // Ensure this field cannot be null
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "AdminLogin",
  timestamps: false, // Disable createdAt and updatedAt fields if not needed
});

export default AdminLogin;
