import './config.js'
import express from 'express'
import routes from './routes.js'

const router = express()
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

;(function parseRoutes(routes){
	routes.forEach((route) => {
		const middleware = route.middleware ? [...route.middleware] : []

		if (route.group) {
			parseRoutes(route.group.map((group) => {
				const groupPath = group.path.split('/').filter(n => n).join('/')

				if (group.middleware) {
					middleware.push(...group.middleware)
				}
				
				return { 
					...group,
					middleware: middleware,
					path: route.path + (groupPath ? '/'+ groupPath : '')
				}
			}))
		} else {
			middleware.push((req, res, next) => {
				if (typeof route.action === 'function') {
					route.action(req, res, next)
				} else {
					const controller = new route.controller()
					controller[route.action](req, res, next)
				}	
			})
			
			const method = route.method.toLowerCase()
			router[method](route.path, ...middleware)
		}
	})
})(routes)

export default router