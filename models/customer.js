import { Sequelize, DataTypes, Model } from 'sequelize'
import database from '../database.js'

class Customer extends Model {

}

export default Customer.init({
	id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
  	type: DataTypes.STRING
  },
  email: {
  	type: DataTypes.STRING
  },
  password: {
  	type: DataTypes.STRING
  },
}, {
	sequelize: database,
	tableName: 'customers',
	timestamps: false
})