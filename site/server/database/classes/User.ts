import {
  Model,
  Optional,
  Sequelize,
  DataTypes
} from 'sequelize';
import sequelize from "../sequelize/sequelize";

export interface IUserAttributes {
  id?: number;
  username?: string;
  password?: string;
  email?: string;
  rank?: number;
  rTitle?: string;
}

export interface UserIn extends Optional<IUserAttributes, 'id'> {}
export interface UserOut extends Required<IUserAttributes> {}

export class User extends Model<IUserAttributes> {
  declare id: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare rank: string;
  declare rTitle: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  rTitle: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'User',
  tableName: 'users'
})

User.sync({force: true}).then(() => {
  console.log('Users table created');
});
