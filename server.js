var express = require('express');

var app = express();
var server = app.listen(5000);
app.use(express.static('public'));

console.log("My socket server is running");
