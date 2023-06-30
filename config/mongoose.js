const mongoose = require('mongoose');

const  mongoAtlasUri ="mongodb+srv://root:root@cluster0.aako87d.mongodb.net/";

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false)
        mongoose.connect(mongoAtlasUri,{
        }) 
        console.log('Mongo connected')
        
    }
    catch(error) {
        console.log(error)
        process.exit()
    }
    }
    module.exports = connectToMongo;