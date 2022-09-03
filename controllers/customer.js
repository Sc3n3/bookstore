import jwt from 'jsonwebtoken'
import { Customer as Model } from '../models/index.js'

export default class Customer {
	getCurrentTokenCustomer(req, res){
		res.status(200).send({
			success: true,
			data: {
				id: req.user.id,
				email: req.user.email,
				name: req.user.name
			}
		})
	}
	async getTokenByCredentials(req, res){
		const customer = await Model.findOne({
			where: {
				email: req.body.email,
				password: req.body.password	
			}
		})

		if (customer) {
			const token = jwt.sign({
				id: customer.id,
				email: customer.email,
				name: customer.name
			}, process.env.APP_KEY, { expiresIn: '24h' })

			res.status(200).send({
				success: true,
				data: {
					id: customer.id,
					email: customer.email,
					name: customer.name,
					token: token,	
				}
			})
		} else {
			res.status(404).send()
		}
	}
	async updateCurrentCustomer(req, res){
		const customer = await Model.findOne({
			where: {
				id: req.user.id
			}
		})

		customer.name = req.body.name
		customer.password = req.body.password
		await customer.save()

		req.body.email = customer.email
		req.body.password = customer.password

		this.getTokenByCredentials(req, res)
	}
	async createCustomer(req, res){
		const customer = await Model.create({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		})

		res.status(200).send({
			status: true,
			data: {
				id: customer.id,
				name: customer.name,
				email: customer.email
			}
		})
	}
}