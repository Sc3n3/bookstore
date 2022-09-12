import jwt from 'jsonwebtoken'
import statusCodes from 'http-codes'
import { Customer } from '../models/index.js'

export default async (req, res, next) => {
	try {
    const token = req.headers.authorization.split(" ")[1]
    const info = jwt.verify(token, process.env.APP_KEY)
    const user = await Customer.findByPk(info.id)

    if (!user) {
    	throw new Error('Customer not exists.')
    }

		req.user = user	
  	next()

  } catch (err) {
  	res.status(statusCodes.UNAUTHORIZED).send({ message: 'Authentication failed!' })
  }
}