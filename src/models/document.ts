import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConnect";
import { Idoc } from "../interface/docInterface";
import { User } from "./user";

export interface docInstance extends Model<Idoc>, Idoc {}

export const Document = sequelize.define<docInstance>("Document",{

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,   
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false,
    },
    docId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        // unique: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull:  true,
        defaultValue: '',
    },
},
{
    paranoid: true,
});

User.hasMany(Document, {foreignKey: 'userId', onDelete: 'CASCADE'});    
Document.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});