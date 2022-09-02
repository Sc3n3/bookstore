import { Sequelize, DataTypes, Model } from 'sequelize'
import database from '../database.js'

class Store extends Model {

}

export default Store.init({
	id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
  	type: DataTypes.STRING
  }
}, {
	sequelize: database,
	tableName: 'stores',
  timestamps: false
})