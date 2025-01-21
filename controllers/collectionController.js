const uuid = require('uuid')
const path = require('path');
const ApiError = require('../error/ApiError')
const { Collection, Movie } = require('../models/models')

class CollectionController {
    async create(req, res, next) {
        try {
            const { user } = req
            const { published, title, description, movies } = req.body
            console.log(user);
            let fileName = null
            if (req.files) {
                const { image } = req.files
                fileName = uuid.v4() + '.jpg'
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
            }

            let publishedValue = published ? published : false

            const collection = await Collection.create({ title, description, image: fileName, userId: user.id, published: publishedValue })

            if (movies) {
                movies = JSON.parse(movies)
                movies.forEach((i, ind) => {
                    Movie.create({
                        kinopoiskId: i,
                        orderId: ind,
                        collectionId: collection.id
                    })
                }
                )
            }

            return res.json(collection)

        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest('Ошибка заполнения формы'))
        }
    }

    async getAll(req, res) {
        try {
            let { page, limit } = req.query
            page = req.page || 1
            limit = limit || 10
            let offset = page * limit - limit

            let collections = await Collection.findAndCountAll({ limit, offset })

            return res.json(collections)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(`Ошибка запроса всех коллекций: ${error}`))
        }

    }

    async getOne(req, res) {
        try {
            const { id } = req.params
            const collection = await Collection.findOne({ where: { id } })
            return res.json(collection)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(`Ошибка запроса коллекции: ${error}`))
        }

    }
}

module.exports = new CollectionController()
