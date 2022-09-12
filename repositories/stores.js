import Base from './base.js'
import { Books } from './index.js'
import { Store } from '../models/index.js'

export default class Stores extends Base {

	model = Store

	constructor(){
		super()
		this.books = new Books()
	}

	async getStores(includes = []){
		const stores = await this.model.findAll({
			order: [[ 'name', 'asc' ]],
			include: includes
		})

		return stores
	}
	async getStore(id, includes = []){
		const store = await this.model.findByPk(id, {
			include: includes
		})

		return store
	}
	async deleteStore(id){
		await this.books.model.destroy({ where: { storeId: id } })
		await this.model.destroy({ where: { id: id } })

		return true
	}
}