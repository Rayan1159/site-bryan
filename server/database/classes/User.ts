import {Model, Optional, DataTypes} from "sequelize";
import {sequelize} from "../database";
export interface IUserAttributes {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    rank?: number;
    rTitle?: string;
    sessionId?: string;
}

export interface UserIn extends Optional<IUserAttributes, "id">{}
export interface UserOut extends Required<IUserAttributes>{}

export class User extends Model<IUserAttributes, UserIn> {
    declare id: number;
    declare username: string;
    declare email: string;
    declare password: string;
    declare rank: number;
    declare rTitle: string;
    declare sessionId: string;
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    rank: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
    },
    rTitle: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sessionId: {
        type: DataTypes.STRING(35),
    }
}, {
    sequelize,
    tableName: 'users',
    freezeTableName: true,
    timestamps: false
})