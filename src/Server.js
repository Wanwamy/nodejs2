const express = require('express')
const app = express()
const path = require('path')
const configViewEngine = require('./config/viewEngine')
const webRouter = require('./routes/web')
require('dotenv').config()
const mongoose = require('mongoose')

var port = process.env.PORT ||8081
var url = process.env.URL
console.log('Static directory:', path.join(__dirname, 'public'));
configViewEngine(app)

app.use('/',webRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port} : http://localhost:${port}`)
})

mongoose.connect(url)
.then(()=> {
  console.log("connected to Mongodb")
  
})
.catch((error)=>{
  console.log("failed")
  console.log(error)
})

app.get('/api',async(req,res)=>{
  try{
      const test = mongoose.connection.db.collection('test')
      const testData = await test.find({}).toArray()
      res.json(testData)
  }
  catch(err){
    res.status(500).json({message:err.message})
  }
})
