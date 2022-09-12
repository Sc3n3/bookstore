import Base from './base.js'
import { Books } from './index.js'
import sequelize from '../database.js'
import { Category } from '../models/index.js'

export default class Categories extends Base {

  model = Category

  constructor(){
    super()
    this.books = new Books()
  }
  async getCategories(includes = [], where = {}, order = []){
    const categories = await this.model.findAll({
      order: [[ 'name', 'asc' ]],
      include: includes,
      where: where
    })

    return categories
  }
  async getCategory(id, includes = []){
    const category = await this.model.findByPk(id, {
      include: includes
    })

    return category
  }
  async deleteCategory(id){
    return sequelize.transaction(async () => {
      await this.books.model.destroy({ where: { categoryId: id } })
      await this.model.destroy({ where: { id: id } })

      return true
    })
  }
  async getCategoriesWithRelatedCategories(){
    return await this.getCategories([
      ...this.include(['subs:5.books.store', 'subs:5.parent', 'books.store', 'parent']),
    ], { parentId: 0 })
  }
  async getCategoryWithRelatedCategoriesAndBooks(id){
    return await this.getCategory(id, [
      ...this.include(['subs:5.books.store', 'subs:5.parent', 'books.store', 'parent'])
    ]);
  }
  async getSubCategoryIds(categoryIds){
    const subCategoryIds = []
    for (const categoryId of categoryIds) {
      const category = await this.getCategory(categoryId, [ ...this.include(['subs']) ])
      if (category) {
        if (category.subs.length) {
          subCategoryIds.push(...await this.getSubCategoryIds(category.subs.map(s => s.id)))  
        }

        subCategoryIds.push(category.id)  
      }
    }
    return subCategoryIds
  }
  async getAllBooksOfCategory(id, includes = []){
    return await this.books.getBooks([ 
      ...includes, ...this.books.include(['store', 'category']) 
      ], { 
        id: await this.getSubCategoryIds([ id ])
      }, [[ 'name', 'asc' ]])
  }
}