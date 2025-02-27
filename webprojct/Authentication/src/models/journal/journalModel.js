import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

const Journal = sequelize.define('Journal', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    mood: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    symptoms: {
        type: DataTypes.JSON,
        defaultValue: [] 
    },
    entry: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

export default Journal;
