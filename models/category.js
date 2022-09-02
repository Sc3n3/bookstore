import { Sequelize, DataTypes, Model } from 'sequelize'
import database from '../database.js'
import Book from './book.js'

class Category extends Model {

}

export default Category.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  parentId: {
    type: DataTypes.INTEGER
  }
}, {
  sequelize: database,
  tableName: 'categories',
  timestamps: false
})
