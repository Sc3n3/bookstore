import statusCodes from 'http-codes'
import Base from './base.js'
import { Categories } from '../repositories/index.js'

export default class Category extends Base {
	constructor(){
		super()
		this.categories = new Categories() 
	}
	async listCategories(req, res){
		const categories = await this.categories.getCategoriesWithRelatedCategories()
		res.status(statusCodes.OK).send({
			success: true,
			data: this.toJSON(categories)
		})
	}
	async categoryDetail(req, res){
		const category = await this.categories.getCategoryWithRelatedCategoriesAndBooks(req.params.id)
		res.status(statusCodes.OK).send({
			success: true,
			data: this.toJSON(category)
		})

	}
	async categoryBooks(req, res){
		const books = await this.categories.getAllBooksOfCategory(req.params.id)
		res.status(statusCodes.OK).send({
			success: true,
			data: this.toJSON(books)
		})
	}
	createCategory(req, res){

	}
	updateCategory(req, res){

	}
	async deleteCategory(req, res){
		await this.categories.deleteCategory(req.params.id)
		res.status(statusCodes.OK).send({
			success: true
		})
	}
}