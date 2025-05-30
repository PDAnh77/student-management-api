require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const signupRoute = require('./routes/signup.route.js');
const loginRoute = require('./routes/login.route.js');
const userRoute = require('./routes/user.route.js');
const classRoute = require('./routes/class.route.js');
const gradeRoute = require('./routes/grade.route.js');
const notificationRoute = require('./routes/notification.route.js');

const dbURL = process.env.DB_URL
const PORT = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send("Hello from Node API");
});

app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', userRoute);
app.use('/api', classRoute);
app.use('/api', gradeRoute);
app.use('/api', notificationRoute);

mongoose.connect(dbURL)
    .then(() => {
        console.log("Connected to the database!");
        app.listen(PORT, () => {
            console.log('Server is running on port 3030');
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    })