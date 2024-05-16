require("dotenv").config();
const express = require("express");
const { ConnectDB } = require("./DB/db");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json({extended: false}))
const userRouts = require("./Routes/User.Routes.js");
const itemRoutes = require("./Routes/Item.Routes.js");
const requestRoutes = require('./Routes/Request.Routes.js');
const cartRoutes = require("./Routes/Cart.Routes.js");
const orderRoutes = require("./Routes/Orders.Routes.js");
ConnectDB();
const PORT = process.env.Port || 3001


app.use("/api/users", userRouts);
app.use('/api/items', itemRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/order', orderRoutes);

app.listen(PORT,()=>{
    console.log(`App is running at port :${PORT}`);
});
