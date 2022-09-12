import Base from './base.js'
import { Book } from '../models/index.js'

export default class Books extends Base {

	model = Book

	async getBooks(includes = [], where = {}, order = []){
		const books = await this.model.findAll({
			where: where,
			order: order,
			include: includes
		})

		return books
	}
	async getBook(id, includes = []){
		const book = await this.model.findByPk(id, {
			include: includes
		})

		return book
	}
	async deleteBook(id){
		await this.model.destroy({ where: { id: id } })
		return true
	}
}