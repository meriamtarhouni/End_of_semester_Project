const express = require('express');
const bodyParser = require('body-parser');
const palindrome = require('./palindrome');
const mongoose = require('mongoose');

const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/views'));



/* **** Metrics **** */

const client = require('prom-client');
const Registry = client.Registry;
const register = new Registry();

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ register });

const counter = new client.Counter({
    name: 'node_request_operations_total',
    help: 'The total number of processed requests'});

const addedTasksCounter = new client.Counter({
  name: 'node_request_add_Tasks_total',
  help: 'The total number of added tasks'});

const deletedTasksCounter = new client.Counter({
  name: 'node_request_delete_Tasks_total',
  help: 'The total number of deleted tasks'});

const histogram = new client.Histogram({
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    buckets: [1, 2, 5, 6, 10]
  });
  

register.registerMetric(counter);
register.registerMetric(addedTasksCounter);
register.registerMetric(deletedTasksCounter);
register.registerMetric(histogram);
  
app.get('/metrics', async (req, res) => {
  counter.inc()
  res.set('Content-Type', register.contentType)
  console.log(register.metrics())
  res.end(await register.metrics())
})


/* **** Palindrome **** */
app.get('/palindrome/:word', function(req,res){
    counter.inc();
    var reponse=palindrome(req.params.word);
    if (reponse == true){
       res.send(req.params.word+' is a palindrome');
     }
    else{
       res.send(req.params.word+' is not a palindrome'); 
     }
   
 })
 

/* **** ToDo App**** */
app.get('/todo', (req, res) => {
    ToDo.find()
      .then((toDos) => res.status(200).send(toDos))
      .catch((err) => res.status(400).send(err));
    counter.inc();
  });

  app.post('/todo', (req, res) => {
    const body = req.body;
    const toDo = new ToDo({
      text: body.text,
    });
    toDo.save(toDo)
      .then((savedToDo) => res.status(201).send(savedToDo))
      .catch((err) => res.status(400).send(err));
    counter.inc();
    addedTasksCounter.inc();
  });

  app.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    ToDo.findOneAndUpdate({ _id: id }, { done: true })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
    counter.inc();
  });

  app.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    ToDo.findOneAndRemove({ _id: id })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
    counter.inc();
    deletedTasksCounter.inc();
  });

  
const ToDo = require('./models/toDo.js').ToDo;
const DB_URI = 'mongodb://mongo:27017/toDoApp';

mongoose.connect(DB_URI).then(() => {
    app.listen(3000);
    console.log('Listening on port 3000...');
});


