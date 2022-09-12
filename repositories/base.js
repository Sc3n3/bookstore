export default class Base {
	include(relations = '*', model = null){
  	model = model || this.model
  	return model.include(relations)
	}

}