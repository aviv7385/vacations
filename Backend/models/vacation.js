const Joi = require("joi");

class Vacation {

    constructor(existingVacation){
        this.vacationId = existingVacation.vacationId;
        this.destination = existingVacation.destination;
        this.description = existingVacation.description;
        this.fromDate = existingVacation.fromDate;
        this.toDate = existingVacation.toDate;
        this.price = existingVacation.price;
        this.imageFileName = existingVacation.imageFileName;
    }

    // define rules regarding product properties - validation schema:
    static #postValidationSchema = Joi.object({
        vacationId: Joi.number().optional(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(5000).max(5000),
        fromDate: Joi.date().required().iso().min('now'),
        toDate: Joi.date().required().iso().min('now'),
        price: Joi.number().required().min(50),
        imageFileName: Joi.string().required().min(4)
    });
    static #putValidationSchema = Joi.object({
        vacationId: Joi.number().required().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(5).max(5000).max(5000),
        fromDate: Joi.date().required().iso().min('now'),
        toDate: Joi.date().required().iso().min('now'),
        price: Joi.number().required().min(50),
        imageFileName: Joi.string().required().min(4)
    });
    static #patchValidationSchema = Joi.object({
        vacationId: Joi.number().required().positive().integer(),
        destination: Joi.string().min(2).max(50),
        description: Joi.string().min(5).max(5000).max(5000),
        fromDate: Joi.date().iso().min('now'),
        toDate: Joi.date().iso().min('now'),
        price: Joi.number().min(50),
        imageFileName: Joi.string().min(4)
    });

     // Second - perform the validation on Vacation:
     validatePost() {
        const result = Vacation.#postValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; // Return one string of the errors. for returning array of string errors: return result.error ? result.error.message.split(". ") : null;
    }
    validatePut() {
        const result = Vacation.#putValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; // Return one string of the errors.
    }
    validatePatch() {
        const result = Vacation.#patchValidationSchema.validate(this, { abortEarly: false });
        return result.error ? result.error.message : null; // Return one string of the errors.
    }
}

module.exports = Vacation;