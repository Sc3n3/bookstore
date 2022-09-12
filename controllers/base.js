import { Model } from 'sequelize'

export default class Base {
	_set(req, res, next){
		this.request = req
		this.response = res
		this.next = next
	}
	toJSON(obj){
		if (obj instanceof Model) {
			return obj.toJSON()
		} else if (Array.isArray(obj)) {
			return obj.map(o => this.toJSON(o))
		}
		return obj
	}
}