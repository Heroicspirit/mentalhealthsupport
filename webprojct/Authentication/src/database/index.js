import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',// other example mysql,oracle,h2
  }
);

export const db = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true }); // Ensures the tables are created/updated based on models
    console.log("Database connected and synchronized successfully");
  } catch (e) {
    console.error("Failed to connect and synchronize database", e);
  }
};






