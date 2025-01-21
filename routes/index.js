const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const collectionRouter = require('./collectionRouter')
const movieRouter = require('./movieRouter')

router.use('/user', userRouter)
router.use('/collections', collectionRouter)
router.use('/movies', movieRouter)

module.exports = router