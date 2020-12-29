const {Schema, model} = require('mongoose')

const schema = new Schema({
    id: {type: String, required: true, unique: true},
    firstName: {type: String, required: true},
    lastName:{type: String, required: true},
    tel:{type:String},
    address:{type:String},
    dateOfBirth:{type:String}
})

module.exports = model('Employees', schema)