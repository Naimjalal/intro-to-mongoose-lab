const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const Customers = mongoose.model('Customers', customerSchema)

module.exports=  Customers;
