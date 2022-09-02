import './config.js'
import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORK,
	{
	  host: process.env.DB_HOST,
	  port: process.env.DB_PORT,
	  dialect: process.env.DB_CONNECTION,
	  logging: (msg) => !JSON.parse(process.env.APP_DEBUG) || console.log(msg)
	}
)

export default sequelize