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
				middleware: [ auth ],
				group: [
					{
						path: '/',
						method: 'GET',
						action: 'getCurrentTokenCustomer',
						controller: Customer
					},
					{
						path: '/',
						method: 'PUT',
						action: 'updateCurrentCustomer',
						controller: Customer,
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
				group: [
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
				group: [
					{
						path: '/',
						method: 'GET',
						action: 'storeDetail',
						controller: Store
					},
					{
						path: '/',
						method: 'PUT',
						action: 'updateStore',
						controller: Store
					},
					{
						path: '/',
						method: 'DELETE',
						action: 'deleteStore',
						controller: Store
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
				group: [
					{
						path: '/',
						method: 'GET',
						action: 'categoryDetail',
						controller: Category
					},
					{
						path: '/books',
						method: 'GET',
						action: 'categoryBooks',
						controller: Category
					},
					{
						path: '/',
						method: 'PUT',
						action: 'updateCategory',
						controller: Category
					},
					{
						path: '/',
						method: 'DELETE',
						action: 'deleteCategory',
						controller: Category
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
				group:[
					{
						path: '/',
						method: 'GET',
						action: 'bookDetail',
						controller: Book
					},
					{
						path: '/',
						method: 'PUT',
						action: 'updateBook',
						controller: Book
					},
					{
						path: '/',
						method: 'DELETE',
						action: 'deleteBook',
						controller: Book
					}
				]
			}
		]
	}
]