import {DataTypes, Model, Optional} from "sequelize";

export interface IServerAttributes {
    id?: number;
    name?: string;
    picture?: string
}

export interface IServerIn extends Optional<any, "id">{}
export interface IServerOut extends Required<IServerAttributes>{}

export class Server extends Model<IServerAttributes, IServerIn> {
    declare id: number;
    declare name: string;
    declare picture: string;
}

Server.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
}, {
    sequelize: require("../database").sequelize,
    tableName: "servers",
    freezeTableName: true,
    timestamps: false
})

Server.sync().then(() => {
    console.log("Servers table synced")
}).catch(err => {
    console.error(err)
});