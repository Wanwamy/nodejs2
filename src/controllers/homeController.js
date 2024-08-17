const mongoose = require('mongoose')
const User = require('../models/model')
require('dotenv').config()


const getHomePage = (req, res) =>{
    res.send('home')
}
const getView = (req, res)=>{
    res.render('new.ejs')
}
const getCheck = (req, res)=>{
    res.send('cunny')
}

 
//get
const getUserList = async(req,res)=>{
    try{
        const test = mongoose.connection.db.collection(process.env.TEST_COLLECTION)
        const testData = await test.find({}).toArray()
        const prettyData = JSON.stringify(testData, null, 2)
        res.setHeader('Content-Type', 'application/json')
        res.send(prettyData)
        console.log('get api done')
    }
    catch(err){
        console.log('get data error')
      res.status(500).json({message:err.message})
    }
}
const getTestApi = async(req,res)=>{
    try{
        const test = mongoose.connection.db.collection(process.env.TEST_COLLECTION)
        const testData = await test.find({}).toArray()
        const prettyData = JSON.stringify(testData, null, 2)
        res.setHeader('Content-Type', 'application/json')
        res.send(prettyData)
        console.log('get api done')
    }
    catch(err){
        console.log('get data error')
      res.status(500).json({message:err.message})
    }
}
//for search data
const getData = async (projection) => {
    const db = mongoose.connection.db;
    const collectionTest = db.collection('test');
    return await collectionTest.find({}, { projection }).toArray()
}

const getName = async (req, res) => {
    const test = mongoose.connection.db.collection(process.env.TEST_COLLECTION)

    try {
        const data = await getData({ _id: 0, name: 1 }); 
        res.json(data);
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: err.message });
        }
    }
}

//post
const postNewUser = async ( req,res)=>{
    console.log(req.body)
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getHomePage,getView,getCheck,getTestApi,getName,getUserList,
    postNewUser
}