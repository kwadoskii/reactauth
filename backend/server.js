const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
// import routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/profile');


//connect to DB
mongoose.connect(process.env.ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }, () => console.log('DB connection up'));


// Middleware 
app.use(cors());
app.use(express.json());


//Routes Middleware
app.use('/api/user', authRoute);
app.use('/api/profile', postRoute);

app.listen(5000, () => console.log('Server is up and running'));