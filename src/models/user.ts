import { Iuser } from "../interface/userInterface";
import { sequelize } from "../config/dbConnect";
import { DataTypes, Model } from "sequelize";

export interface userInstance extends Model<Iuser>, Iuser {}

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cookieId: {
        type: DataTypes.STRING,
        // unique: true,
        allowNull: false,
    },
},
{
    paranoid: true,
});