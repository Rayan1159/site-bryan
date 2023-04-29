import {Model, Optional, DataTypes} from "sequelize";
import {sequelize} from "../database";
export interface IUserAttributes {
    id?: number;
    username?: string;
    email?: string;
    password?: string;
    rank?: number;
    rTitle?: string;
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
}

User.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
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
        allowNull: false,
    },
    rTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: 'users',
    freezeTableName: true,
    timestamps: false
})