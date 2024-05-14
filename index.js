require("dotenv").config();
const express = require("express");
const { ConnectDB } = require("./DB/db");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json({extended: false}))
const userRouts = require("./Routes/User.Routes.js");
//const { createUser } = require("./Controller/User.Controller");
ConnectDB();
const PORT = process.env.Port || 3001


app.use("/api/users", userRouts);


app.listen(PORT,()=>{
    console.log(`App is running at port :${PORT}`);
});
