var express = require('express');
const palindrome = require('../palindrome');
var palindromeRoute = express.Router();


palindromeRoute.get('/palindrome/:word', function(req,res){
    //counter.inc();
    var reponse=palindrome(req.params.word);
    if (reponse == true){
       res.send(req.params.word+' is a palindrome');
     }
    else{
       res.send(req.params.word+' is not a palindrome'); 
     }
   
 })

 module.exports=palindromeRoute;