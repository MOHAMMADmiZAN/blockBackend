const Joi = require('joi');



/**
 * @description Joi validation rules for the user model
 * @type {Joi.ObjectSchema<any>}
 */
const registerSchema = Joi.object().keys({
    name: Joi.string()
        .trim()
        .alphanum()
        .min(3)
        .max(30).required(),
    email: Joi.string()
        .trim()
        .email({minDomainSegments: 2, tlds: {allow: ['com', 'net', 'org']}})
        .normalize()
        .required(),
    password: Joi.string()
        .trim()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/)
        .required().messages(
            {
                'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character minimum 8 characters and maximum 30 characters long'
            }
        )
});
/**
 *
 * @param {Joi.ObjectSchema} schema
 * @returns {(function(*, *, *))|*}
 */

const schemaError = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body, {abortEarly:false})
            next();
        }catch (e) {
            const errorMsg =  e.details.reduce((acc, curr) => {
                acc[curr.path] = curr.message.replace(/\"/g, '');
                return acc;
            }, {});
            res.status(400).json({messages: errorMsg});


        }
    }
}

module.exports = {
    registerSchema,
    schemaError
};