import './config.js'
import express from 'express'
import statusCodes from 'http-codes'
import Validator from 'validatorjs'
import routes from './routes.js'

const router = express()
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

;(function parseRoutes(routes){
	routes.forEach((route) => {
		const bindings = route.bindings ? {...route.bindings} : {}
		const middleware = route.middleware ? [...route.middleware] : []

		if (route.group) {
			parseRoutes(route.group.map((group) => {
				const groupPath = group.path.split('/').filter(n => n).join('/')
				return {
					...group,
					bindings: {...bindings, ...(group.bindings || {})},
					middleware: [...middleware, ...(group.middleware || [])],
					path: route.path + (groupPath ? '/'+ groupPath : '')
				}
			}))
		} else {
			const method = route.method.toLowerCase()
			router[method](route.path, ...[...middleware, async (req, res, next) => {
				if (route.validation) {
					const validation = new Validator(req.body, route.validation)

					if (validation.fails()) {
						return res.status(statusCodes.UNPROCESSABLE_ENTITY).send({
							success: false,
							message: 'Failed!',
							...validation.errors
						})
					}
				}

				req.bindings = { ...route.bindings }
				for (const param of Object.keys(req.params)) {
					const binding = route.bindings[param]
					if (binding) {
						try {
							if (binding.hasOwnProperty('sequelize')) {
								req.bindings[param] = await binding.findByPk(req.params[param])
								if (!req.bindings[param]) throw new Error('Not found')		
							} else if (typeof(binding) === 'function') {
								req.bindings[param] = await binding(req.params[param])
							}
						} catch(err) {
							return res.status(statusCodes.NOT_FOUND).send()
						}
					}
				}
				
				if (typeof(route.action) === 'function') {
					return route.action(req, res, next)
				}
				
				const controller = new route.controller()
				controller._set(req, res, next)
				controller[route.action](req, res, next)

			}])
		}
	})
})(routes)

router.use((err, req, res, next) => {
  res.status(statusCodes.INTERNAL_SERVER_ERROR).send({ 
  	success: false,
  	message: err.message,
  	...(process.env.APP_DEBUG ? { stack: err.stack } : {})
  })
})

export default router