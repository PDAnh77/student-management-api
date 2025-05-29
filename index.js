require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const signupRoute = require('./routes/signup.route.js');
const loginRoute = require('./routes/login.route.js');

const dbURL = process.env.DB_URL
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hello from api server");
});

app.use('/api', signupRoute);
app.use('/api', loginRoute);

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