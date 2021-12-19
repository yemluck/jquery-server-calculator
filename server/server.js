const express = require('express');
const bodyParser = require('body-parser')
const app = express();
// listen on port 5000
const port = 5000;
// start up our server
app.listen (port, () => {
    console.log('Server ready to listen on port', port)
});

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Do not forget your bodyParser
app.use(bodyParser.urlencoded({extended:true}))

// Global array to hold all of our data

let calculatorInput = [];