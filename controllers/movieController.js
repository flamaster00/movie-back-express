const { Movie } = require("../models/models")

class MovieController {
    async getMoviesByCollectionId(req, res, next) {
        try {
            const { id } = req.params
            const movies = await Movie.findAndCountAll({ where: { collectionId: id } })
            return res.json(movies)
        } catch (error) {
            console.log(error)
            return next(ApiError.badRequest(`Ошибка запроса кино в коллекциях: ${error}`))
        }

    }
}

module.exports = new MovieController()