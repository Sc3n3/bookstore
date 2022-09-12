import { Sequelize, DataTypes } from 'sequelize'
import database from '../database.js'
import Base from './base.js'

class Customer extends Base {
  toJSON(){
    return {
      ...super.toJSON(),
      url: '/customers/'+ this.id
    }
  }
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