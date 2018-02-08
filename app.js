const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

const mongoose = require('mongoose')

const Code = require('./schemas/userCodeSchema')

const mustacheExpress = require('mustache-express');
app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

mongoose.connect('mongodb://localhost/codeorganizer')

let db = mongoose.connection
db.once('open',function(){
  console.log('connected')
})

app.get('/',function(req,res){

  Code.find(function(error,code){
    res.render("home",{ "codes" : code })
  })

})


// adding a new user
app.post('/code',function(req,res){

    let title = req.body.title
    let body = req.body.body
    let tag = req.body.tag

    // save the user in the mongodb database
    let code = new Code({ title : title, body : body, tag : tag })

    code.save(function(error,newUser){
      res.redirect('/')
    })

})

app.get('/code/json',function(req,res){

  Code.find(function(error,code){
    res.json(code)
  })

})







app.listen(3000, () => {
  console.log('running')
})
