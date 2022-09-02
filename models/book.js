import { Sequelize, DataTypes, Model } from 'sequelize'
import database from '../database.js'
import Category from './category.js'
import Store from './store.js'

class Book extends Model {

}

export default Book.init({
	id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
  	type: DataTypes.STRING
  },
  categoryId: {
  	type: DataTypes.INTEGER
  },
  storeId: {
  	type: DataTypes.INTEGER
  }
}, {
	sequelize: database,
	tableName: 'books',
	timestamps: false
})
