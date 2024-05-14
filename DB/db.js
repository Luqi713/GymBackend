require('dotenv').config()
const mongoose = require("mongoose")

const uri = process.env.DB_URI || "Add uri";
module.exports.ConnectDB = async ()=>{
    try {
        await mongoose.connect(uri, {})
        console.log("DB Connected!");
        
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}