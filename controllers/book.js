import { Op } from 'sequelize'
import statusCodes from 'http-codes'
import Base from './base.js'
import { Books } from '../repositories/index.js'

export default class Book extends Base {
  constructor(){
    super()
    this.books = new Books()
  }
  async listBooks(req, res){
    const where = {}

    if (req.query.q && req.query.q.length > 2) {
      where.name = {
        [Op.like]: '%'+ req.query.q +'%'
      }
    }

    const books = await this.books.getBooks([
      ...this.books.include(['store', 'category'])
    ], where)

    res.status(statusCodes.OK).send({ 
      success: true,
      data: this.toJSON(books)
    })
  }
  async bookDetail(req, res){
    const book = await this.books.getBook(req.bindinds.book.id, [
      ...this.books.include(['store', 'category'])
    ])
    res.status(statusCodes.OK).send({
      success: true,
      data: this.toJSON(book)
    })
  }
  createBook(req, res){

  }
  updateBook(req, res){

  }
  deleteBook(req, res){

  }
}