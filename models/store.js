import { Sequelize, DataTypes } from 'sequelize'
import database from '../database.js'
import Base from './base.js'

class Store extends Base {
  toJSON(){
    return {
      ...super.toJSON(),
      url: '/stores/'+ this.id
    }
  }
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