import { DataTypes } from "sequelize";
import { sequelize } from "../../database/index.js";

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    time: {
        type: DataTypes.STRING,
        allowNull: false
    },
    problem: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING
    }
});

export default Appointment;
