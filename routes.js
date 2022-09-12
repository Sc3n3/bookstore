import auth from './middlewares/auth.js'
import * as Controllers from './controllers/index.js'
import { Category, Book, Store, Customer } from './models/index.js'

export default [
  {
    path: '/',
    method: 'GET',
    action: (req, res) => res.send(new Date().toString())
  },
  {
    path: '/auth',
    group: [
      {
        path: '/me',
        middleware: [ auth ],
        group: [
          {
            path: '/',
            method: 'GET',
            action: 'getCurrentTokenCustomer',
            controller: Controllers.Customer
          },
          {
            path: '/',
            method: 'PUT',
            action: 'updateCurrentCustomer',
            controller: Controllers.Customer,
            validation: {
              name: 'required',
              password: 'required'
            }
          }
        ]
      },
      {
        path: '/token',
        method: 'POST',
        action: 'getTokenByCredentials',
        controller: Controllers.Customer,
        validation: {
          email: 'required',
          password: 'required'
        }
      },
      {
        path: '/register',
        method: 'POST',
        action: 'createCustomer',
        controller: Controllers.Customer,
        validation: {
          name: 'required',
          password: 'required'
        }
      },
    ]
  },
  {
    path: '/customers',
    middleware: [ auth ],
    group: [
      {
        path: '/',
        method: 'GET',
        action: 'listCustomers',
        controller: Controllers.Customer
      },
      {
        path: '/',
        method: 'POST',
        action: 'createCustomer',
        controller: Controllers.Customer,
        validation: {
          name: 'required',
          email: 'required',
          password: 'required'
        }
      },
      {
        path: '/:customer',
        bindings: {
          customer: Customer
        },
        group: [
          {
            path: '/',
            method: 'PUT',
            action: 'updateCustomer',
            controller: Controllers.Customer  
          },
          {
            path: '/',
            method: 'DELETE',
            action: 'deleteCustomer',
            controller: Controllers.Customer  
          }
        ]
      }
    ]
  },
  {
    path: '/stores',
    middleware: [ auth ],
    group: [
      {
        path: '/',
        method: 'GET',
        action: 'listStores',
        controller: Controllers.Store
      },
      {
        path: '/',
        method: 'POST',
        action: 'createStore',
        controller: Controllers.Store
      },
      {
        path: '/:store',
        bindings: {
          store: Store
        },
        group: [
          {
            path: '/',
            method: 'GET',
            action: 'storeDetail',
            controller: Controllers.Store
          },
          {
            path: '/',
            method: 'PUT',
            action: 'updateStore',
            controller: Controllers.Store
          },
          {
            path: '/',
            method: 'DELETE',
            action: 'deleteStore',
            controller: Controllers.Store
          }
        ]
      }
    ]
  },
  {
    path: '/categories',
    middleware: [ auth ],
    group: [
      {
        path: '/',
        method: 'GET',
        action: 'listCategories',
        controller: Controllers.Category
      },
      {
        path: '/',
        method: 'POST',
        action: 'createCategory',
        controller: Controllers.Category
      },
      {
        path: '/:category',
        bindings: {
          category: Category
        },
        group: [
          {
            path: '/',
            method: 'GET',
            action: 'categoryDetail',
            controller: Controllers.Category
          },
          {
            path: '/books',
            method: 'GET',
            action: 'categoryBooks',
            controller: Controllers.Category
          },
          {
            path: '/',
            method: 'PUT',
            action: 'updateCategory',
            controller: Controllers.Category
          },
          {
            path: '/',
            method: 'DELETE',
            action: 'deleteCategory',
            controller: Controllers.Category
          }
        ]
      }
    ]
  },
  {
    path: '/books',
    middleware: [ auth ],
    group: [
      {
        path: '/',
        method: 'GET',
        action: 'listBooks',
        controller: Controllers.Book
      },
      {
        path: '/',
        method: 'POST',
        action: 'createBook',
        controller: Controllers.Book
      },
      {
        path: '/:book',
        bindings: {
          book: Book
        },
        group:[
          {
            path: '/',
            method: 'GET',
            action: 'bookDetail',
            controller: Controllers.Book
          },
          {
            path: '/',
            method: 'PUT',
            action: 'updateBook',
            controller: Controllers.Book
          },
          {
            path: '/',
            method: 'DELETE',
            action: 'deleteBook',
            controller: Controllers.Book
          }
        ]
      }
    ]
  }
]