const express = require('express');
const bodyParser = require('body-parser');
const palindrome = require('./palindrome');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));

app.get('/palindrome/:word', function(req,res){
    
   var reponse=palindrome(req.params.word);
   if (reponse == true){
      res.send(req.params.word+' is a palindrome');
    }
   else{
      res.send(req.params.word+' is not a palindrome'); 
    }
  

})


app.get('/metrics',function(req,res){
    res.send('Metrics');
});


app.get('/todo', (req, res) => {
    ToDo.find()
      .then((toDos) => res.status(200).send(toDos))
      .catch((err) => res.status(400).send(err));
  });

  app.post('/todo', (req, res) => {
    const body = req.body;
    const toDo = new ToDo({
      text: body.text,
    });
    toDo.save(toDo)
      .then((savedToDo) => res.status(201).send(savedToDo))
      .catch((err) => res.status(400).send(err));
  });

  app.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    ToDo.findOneAndUpdate({ _id: id }, { done: true })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
  });

  app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    ToDo.findOneAndRemove({ _id: id })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
  });

  
const ToDo = require('./models/toDo.js').ToDo;
const DB_URI = 'mongodb://mongo:27017/toDoApp';

mongoose.connect(DB_URI).then(() => {
    app.listen(3000);
    console.log('Listening on port 3000...');
});


