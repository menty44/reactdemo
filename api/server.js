
const express = require('express');
const app = express();
// const router = app.Router();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./DB.js');
const businessRoute = require('./business.route');
const genderRoute = require('./gender.route');
const db = require('./pgqueries.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//endpoints for use by mongodb
app.use('/business', businessRoute);
app.use('/gender', genderRoute);

//endpoints for use by postgres db
app.get('/users', db.getUsers)
// router.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});