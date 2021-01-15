const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


const palindromeRoute=require('./routers/palindromeRoute');
const toDORoute=require('./routers/toDoRoute');

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));


/* **** Metrics **** */

const {register}=require('./metrics');

app.get('/metrics',async (req, res) => {
  res.set('Content-Type', register.contentType)
  console.log(register.metrics())
  res.end(await register.metrics())
})


/* **** Palindrome **** */
app.use(palindromeRoute);
 

/* **** ToDo App**** */
app.use(toDORoute);


const DB_URI = 'mongodb://mongo:27017/toDoApp';

mongoose.connect(DB_URI).then(() => {
    app.listen(5000);
    console.log('Listening on port 5000...');
});


