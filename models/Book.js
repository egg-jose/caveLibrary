const mongoose = require('mongoose');
const Joi = require('joi');
//MongoDB Schema for the books
const bookSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    datePublished: Date,
    authorName: {
        type: String,
        required: [true, 'Author name is required'],
    },
    amountPages: {
        type: Number,
        min: [1, 'The number of pages must be greater than 0'],
    },
    genres: [
        {
            type: String,
        },
    ],
    isBestSeller: Boolean,
});

bookSchema.pre('save', function (next) {
    const { error } = joiValidate.call(this);
    if (!error) {
        throw new Error(error);
    }
    next();
});

function joiValidate() {
    //Setting maximum validation date for datePublished
    let validationDate = new Date();
    validationDate.setMonth(validationDate.getMonth() + 3);
    //Function to determine that the elements of the array are unique
    const areArrayItemsUnique = (value, helpers) => {
        if (value.length == [...new Set(value)].length) {
            return value;
        }
        throw new Error('Genres must be unique');
    };

    let schema = Joi.object({
        name: Joi.string().required(),
        datePublished: Joi.date().max(validationDate),
        authorName: Joi.string()
            .regex(/^[A-Za-z0-9]+$/)
            .required(),
        amountPages: Joi.number().integer().min(1),
        genres: Joi.array()
            .items(Joi.string())
            .custom(areArrayItemsUnique, 'Unique items validation'),
        isBestSeller: Joi.boolean(),
    });
    return schema.validate(this);
}

let Book = mongoose.model('Book', bookSchema);

module.exports = Book;
