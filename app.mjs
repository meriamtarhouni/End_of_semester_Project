import { palindrome } from './palindromeFunction.mjs';
import express from 'express';

var app = express();

app.get('/',function(req,res){
    res.send('this is the homepage');
});

app.get('/palindrome/:word',function(req,res){
    
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



app.listen(3000);
console.log('Listening on port 3000...');