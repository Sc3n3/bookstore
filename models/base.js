import { Model } from 'sequelize'

export default class Base extends Model {
  static include(relations = '*') {
    relations = ( 
        ! Array.isArray(relations) && relations === '*' 
        ? Object.keys(this.associations)
        : relations
      ).map((r) => r.split('.'))

    const associations = []

    relations.forEach((relation) => {
      const depth = relation[0].split(':')[1] || 0
      const association = relation[0].split(':')[0]
      const subAssociations = [ ...relation.slice(1) ]

      if (this.associations[association]) {
        const includes = []
        const _model = this.associations[association].target

        for (let i = 1; i < depth; i++ ) {
          subAssociations.unshift(association)
        }

        if (subAssociations.length) {
          includes.push(..._model.include([ 
            subAssociations.filter(s => s !== association).join('.'),
            subAssociations.join('.')
          ])) 
        }

        const related = {
          model: _model,
          as: association,
          include: includes
        }

        associations.push(related)
      }
    })

    return associations
  }
  toJSON(){
    const map = (item) => {
      if (Array.isArray(item)) {
        return item.map((i) => map(i))
      } else if (item instanceof Model) {
        const replica = { ...item.toJSON() }
        Object.keys(item.toJSON()).forEach((key) => {
          if (item[key] instanceof Model) {
            replica[key] = { ...map(item[key]) }
          } else if (Array.isArray(item[key])) {
            replica[key] = [ ...map(item[key]) ]
          }
        })

        return replica
      }

      return item
    }

    return map(this.get())
  }
}