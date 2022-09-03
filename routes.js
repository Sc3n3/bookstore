import auth from './middlewares/auth.js'
import { Customer, Store, Category, Book } from './controllers/index.js'

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
				method: 'GET',
				action: 'getCurrentTokenCustomer',
				controller: Customer,
				middleware: [ auth ]
			},
			{
				path: '/me',
				method: 'PUT',
				action: 'updateCurrentCustomer',
				controller: Customer,
				middleware: [ auth ],
				validation: {
					name: 'required',
					password: 'required'
				}
			},
			{
				path: '/token',
				method: 'POST',
				action: 'getTokenByCredentials',
				controller: Customer,
				validation: {
					email: 'required',
					password: 'required'
				}
			},
			{
				path: '/register',
				method: 'POST',
				action: 'createCustomer',
				controller: Customer,
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
				controller: Customer
			},
			{
				path: '/',
				method: 'POST',
				action: 'createCustomer',
				controller: Customer,
				validation: {
					name: 'required',
					email: 'required',
					password: 'required'
				}
			},
			{
				path: '/:id',
				method: 'PUT',
				action: 'updateCustomer',
				controller: Customer	
			},
			{
				path: '/:id',
				method: 'DELETE',
				action: 'deleteCustomer',
				controller: Customer	
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
				controller: Store
			},
			{
				path: '/',
				method: 'POST',
				action: 'createStore',
				controller: Store
			},
			{
				path: '/:id',
				method: 'PUT',
				action: 'updateStore',
				controller: Store
			},
			{
				path: '/:id',
				method: 'DELETE',
				action: 'deleteStore',
				controller: Store
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
				controller: Category
			},
			{
				path: '/',
				method: 'POST',
				action: 'createCategory',
				controller: Category
			},
			{
				path: '/:id',
				method: 'PUT',
				action: 'updateCategory',
				controller: Category
			},
			{
				path: '/:id',
				method: 'DELETE',
				action: 'deleteCategory',
				controller: Category
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
				controller: Book
			},
			{
				path: '/',
				method: 'POST',
				action: 'createBook',
				controller: Book
			},
			{
				path: '/:id',
				method: 'PUT',
				action: 'updateBook',
				controller: Book
			},
			{
				path: '/:id',
				method: 'DELETE',
				action: 'deleteBook',
				controller: Book
			}
		]
	}
]