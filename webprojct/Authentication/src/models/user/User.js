import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

export const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensures no duplicate emails
    validate: {
      isEmail: { msg: "Please provide a valid email address" }, // Simple email validation
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user", // Default role is user; admins will be set manually
  },
});

(async () => {
  try {
    await User.sync(); // Sync table with the database
    console.log("User table created successfully");
  } catch (error) {
    console.error("Unable to create User table:", error);
  }
})();

export default User;
