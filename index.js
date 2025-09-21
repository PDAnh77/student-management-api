require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const authMiddleware = require('./middleware/authenticate.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/redoc', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redoc - Student Management API</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { margin: 0; padding: 0; }
        </style>
      </head>
      <body>
        <redoc spec-url='/swagger.json'></redoc>
        <script src="https://cdn.redoc.ly/redoc/latest/bundles/redoc.standalone.js"></script>
      </body>
    </html>
  `);
});

const signupRoute = require('./routes/signup.route.js');
const loginRoute = require('./routes/login.route.js');
const refreshRoute = require('./routes/refresh.route.js');
const logoutRoute = require('./routes/logout.route.js');
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
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', refreshRoute);
app.use('/api', logoutRoute);
app.use('/api', authMiddleware, userRoute);
app.use('/api', authMiddleware, classRoute);
app.use('/api', authMiddleware, gradeRoute);
app.use('/api', authMiddleware, notificationRoute);

mongoose.connect(dbURL)
    .then(() => {
        console.log("Connected to the database!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(() => {
        console.log("Connection failed!");
    })