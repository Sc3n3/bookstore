import './config.js'
import jwt from 'jsonwebtoken'
import express from 'express'
import routes from './routes.js'

const router = express()
router.use(express.json())
router.use(express.urlencoded({ extended: false }))

routes.forEach((route) => {
	route.middleware = route.middleware || []
	if (typeof route.action === 'function') {
		route.middleware.push((req, res, next) => route.action(req, res, next))
	} else {
		route.middleware.push((req, res, next) => {
			const controller = new route.controller()
			controller[route.action](req, res)
			next()
		})	
	}
	
	router[route.method.toLowerCase()](route.path, ...route.middleware)
})

export default router