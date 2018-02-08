const mongoose = require('mongoose')

let userCodeSchema = mongoose.Schema({
  title :String,
  body : String,
  tag : String
})

let code = mongoose.model('Code' ,userCodeSchema)

module.exports = code
