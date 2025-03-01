const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')
const checkRole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', collectionController.getAll)
router.get('/:id', collectionController.getOne)
router.post('/', checkRole('USER'), authMiddleware, collectionController.create)

module.exports = router