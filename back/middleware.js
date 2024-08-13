const { param, body, validationResult } = require('express-validator')

const validateLogin = [
    body('email').notEmpty().withMessage('Debería usar un email').isEmail().withMessage('Debería usar un formato correcto'),
    body('password').notEmpty().withMessage('Debería usar una contraseña'),
    (req, res, next) => {

        const errors = validationResult(req).mapped()

        if (Object.keys(errors).length) {
            res.send(errors)
        } else {
            next()
        }

    }
]


const validateRegsiter = [
    body('email').notEmpty().withMessage('Debería usar un email').isEmail().withMessage('Debería usar un formato correcto'),
    body('password').notEmpty().withMessage('Debería usar una contraseña'),
    (req, res, next) => {
        const errors = validationResult(req).mapped()

        if (Object.keys(errors).length) {
            res.status(400).send(errors)
        } else {
            next()
        }
    }
]



module.exports = {
    validateLogin,
    validateRegsiter
}