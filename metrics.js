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

const completedTasksCounter = new client.Counter({
  name: 'node_request_complete_Tasks_total',
  help: 'The total number of completed tasks'});

const histogram = new client.Histogram({
    name: 'node_request_duration_seconds',
    help: 'Histogram for the duration in seconds.',
    buckets: [1, 2, 5, 6, 10]
  });
  

function incrementTotalRequests(){
    counter.inc();
}

function incrementAddedTasks(){
    addedTasksCounter.inc();
}
function incrementDeletedTasks(){
    deletedTasksCounter.inc();
}
function incrementCompletedTasks(){
    completedTasksCounter.inc();
}

register.registerMetric(counter);
register.registerMetric(addedTasksCounter);
register.registerMetric(deletedTasksCounter);
register.registerMetric(completedTasksCounter);
register.registerMetric(histogram);


module.exports={register,incrementTotalRequests,incrementAddedTasks,incrementDeletedTasks,incrementCompletedTasks}