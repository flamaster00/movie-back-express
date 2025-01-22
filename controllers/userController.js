const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, username, role) => {
    return jwt.sign(
        {id, email, username, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {
    async registration(req, res, next) {
        const {email, password, username, role} = req.body
        if (!email || !password || !username) {
            return next(ApiError.badRequest('Не заполнены все необходимые данные'))
        }
        const candidateWithEmail = await User.findOne({where: {email}})
        if (candidateWithEmail) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const candidateWithUsername = await User.findOne({where: {username}})
        if (candidateWithUsername) {
            return next(ApiError.badRequest('Пользователь с таким username уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email,password: hashPassword, username, role})
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.notFound('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.forbidden('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.username, user.role)
        return res.json({token})
    }

    async auth(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.username, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()