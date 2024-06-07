import { body } from 'express-validator'

export const registrationValidationRules = [
    body('username').isLength({ min: 4, max: 20}),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
]