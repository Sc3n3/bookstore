import Book from './book.js'
import Store from './store.js'
import Category from './category.js'
import Customer from './customer.js'

Book.belongsTo(Category, { as: 'category', foreignKey: 'categoryId' })
Book.belongsTo(Store, { as: 'store', foreignKey: 'storeId' })

Category.hasMany(Book, { as: 'books', foreignKey: 'categoryId' })
Category.hasMany(Category, { as: 'subs', foreignKey: 'parentId' })
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId' })

Store.hasMany(Book, { as: 'books', foreignKey: 'storeId' })

export {
  Book, Store, Category, Customer
}