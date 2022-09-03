import './config.js'
import express from 'express'
import Validator from 'validatorjs';
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
				return {
					...group,
					middleware: [...middleware, ...(group.middleware || [])],
					path: route.path + (groupPath ? '/'+ groupPath : '')
				}
			}))
		} else {
			const method = route.method.toLowerCase()
			router[method](route.path, [...middleware, (req, res, next) => {
				if (route.validation) {
					const validation = new Validator(req.body, route.validation)
					if (validation.fails()) {
						return res.status(422).send({
							success: false,
							message: 'Failed!',
							...validation.errors
						})
					}
				}

				if (typeof route.action === 'function') {
					route.action(req, res, next)
				} else {
					const controller = new route.controller()
					controller[route.action](req, res, next)
				}	
			}])
		}
	})
})(routes)

export default router