import statusCodes from 'http-codes'
import Base from './base.js'
import { Stores } from '../repositories/index.js'

export default class Store extends Base {
	constructor(){
		super()
		this.stores = new Stores()
	}
	async listStores(req, res){
		const stores = await this.stores.getStores([
			...this.stores.include(['books.category'])
		])
		res.status(statusCodes.OK).send({
			success: true,
			data: this.toJSON(stores)
		})

	}
	async storeDetail(req, res){
		const store = await this.stores.getStore(req.params.id, [
			...this.stores.include(['books.category'])
		])
		res.status(statusCodes.OK).send({
			success: true,
			data: this.toJSON(store)
		})
	}
	createStore(req, res){

	}
	updateStore(req, res){

	}
	async deleteStore(req, res){
		await this.stores.deleteStore(req.params.id)
		res.status(statusCodes.OK).send({
			success: true
		})
	}
}