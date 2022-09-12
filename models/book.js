import { Sequelize, DataTypes } from 'sequelize'
import database from '../database.js'
import Base from './base.js'

class Book extends Base {
  toJSON(){
    return {
      ...super.toJSON(),
      url: '/books/'+ this.id
    }
  }
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
