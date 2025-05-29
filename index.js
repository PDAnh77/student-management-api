require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const dbURL = process.env.DB_URL
const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send("Hello from api server");
});

mongoose.connect(dbURL)
.then(() => {
    console.log("Connected to the database!");
    app.listen(PORT, () => {
        console.log('Server is running on port 3030');
    });
})
.catch(()=>{
    console.log("Connection failed!");
})