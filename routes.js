import auth from './middlewares/auth.js'
import { Customer, Store } from './controllers/index.js'

export default [
	{
		path: '/',
		method: 'GET',
		action: (req, res) => res.send(new Date().toString()),
	},
	{
		path: '/auth/me',
		method: 'GET',
		action: 'getCurrentTokenCustomer',
		controller: Customer,
		middleware: [ auth ]	
	},
	{
		path: '/auth/token',
		method: 'POST',
		action: 'getTokenByCredentials',
		controller: Customer
	},
	{
		path: '/customers',
		method: 'POST',
		action: 'createCustomer',
		controller: Customer
	},
	{
		path: '/customers/:id',
		method: 'PUT',
		action: 'updateCustomer',
		controller: Customer,
		middleware: [ auth ]	
	},
	{
		path: '/stores',
		method: 'GET',
		action: 'index',
		controller: Store,
		middleware: [ auth ]
	}
]