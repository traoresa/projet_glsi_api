const Joi = require('joi');


/**
 * VALIDATION of student (schema of data)
 */
const StudentSchema = Joi.object().keys({
    nom: Joi.string(),
    classe: Joi.string(),
    modules: Joi.array(),
    moyenne: Joi.number()
});

module.exports = StudentSchema;