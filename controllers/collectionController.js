const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError')
const { Collection } = require('../models/models')

class CollectionController {
    async create(req, res, next) {
        try {
            let { published, name, description, userId } = req.body
            const {img} = req.files

            let fileName = uuid.v4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const collection = await Collection.create({ name, description, published, img: fileName, userId })
            return res.json(collection)

        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest('Ошибка заполнения формы'))
        }
    }

    async getAll(req, res){
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit

        let collections = await Collection.findAndCountAll({limit, offset})
        
        return res.json(collections)
    }

    async getOne(req, res) {
        const {id} = req.params
        const collection = await Collection.findOne({where: {id}})
        return res.json(collection)
    }
}

module.exports = new CollectionController()
