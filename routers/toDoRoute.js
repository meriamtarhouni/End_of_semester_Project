var express = require('express');
var toDoRoute = express.Router();


const {incrementTotalRequests,incrementAddedTasks,incrementDeletedTasks,incrementCompletedTasks}=require('../metrics');

toDoRoute.get('/todo', (req, res) => {
    ToDo.find()
      .then((toDos) => res.status(200).send(toDos))
      .catch((err) => res.status(400).send(err));
      incrementTotalRequests();
  });

toDoRoute.post('/todo', (req, res) => {
    const body = req.body;
    const toDo = new ToDo({
      text: body.text,
    });
    toDo.save(toDo)
      .then((savedToDo) => res.status(201).send(savedToDo))
      .catch((err) => res.status(400).send(err));
      incrementTotalRequests();
      incrementAddedTasks();
  
  });

toDoRoute.patch('/todo/:id', (req, res) => {
    const { id } = req.params;
    ToDo.findOneAndUpdate({ _id: id }, { done: true })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
      incrementTotalRequests();
      incrementCompletedTasks();

  });

toDoRoute.delete('/todo/:id', (req, res) => {
    const { id } = req.params;
    ToDo.findOneAndRemove({ _id: id })
      .then((toDo) => res.status(200).send(toDo))
      .catch((err) => res.status(400).send(err));
      incrementTotalRequests();
      incrementDeletedTasks();
    
  });

  
const ToDo = require('../models/toDo.js').ToDo;

module.exports=toDoRoute;