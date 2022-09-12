import { Sequelize, DataTypes } from 'sequelize'
import database from '../database.js'
import Base from './base.js'

class Category extends Base {
  toJSON(){
    return {
      ...super.toJSON(),
      url: '/categories/'+ this.id
    }
  }
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
