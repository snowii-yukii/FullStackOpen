const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    number: {
        type: String,
        required: true,
        validate: {
        validator: function(v) {
            return /^\d{2,3}-\d+$/.test(v) && v.length >= 8
        },
        message: props => `${props.value} is not valid phone number! (Must be 8+ characters, structured like XX-XXXXXXX or XXX-XXXXXXX)`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)