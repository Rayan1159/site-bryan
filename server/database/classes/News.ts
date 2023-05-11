import {Model, Optional, DataTypes} from "sequelize";
import {sequelize} from "../database";

export interface INewsAttributes {
    id?: number;
    title?: string;
    content?: string;
    author?: string;
    date?: Date;
    profile?: string;
}

export interface NewsInput extends Optional<INewsAttributes, "id"> {}
export interface NewsOutput extends Required<INewsAttributes> {}

export class News extends Model<INewsAttributes, NewsInput> {
    declare id: number;
    declare title: string;
    declare content: string;
    declare author: string;
    declare date: Date;
    declare profile: string;
}

News.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    profile: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'news',
    freezeTableName: true,
    timestamps: false
})

News.sync({force: false})
    .then(() => console.log("News table synced"))
    .catch(err => console.log(err));