// src/models/User.ts
import { Model, DataTypes } from 'sequelize';
import db from './index'; // Assuming you export sequelize from config
const sequelize = db.sequelize
class User extends Model {
  public id!: number;
  public first_name!: string;
}

User.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    first_name: {
      type: DataTypes.STRING
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
