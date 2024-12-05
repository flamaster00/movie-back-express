const Router = require('express')
const router = new Router()
const collectionController = require('../controllers/collectionController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', collectionController.getAll)
router.get('/:id', collectionController.getOne)
router.post('/create', checkRole('USER'), collectionController.create)

module.exports = router