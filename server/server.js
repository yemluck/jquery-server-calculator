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
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// Server proper 
// Global array to hold all of our data

let calculatorInput = [];
let outputToSend = []
// POST / endpoint
app.post('/', (req,res) => {
    console.log('in POST /', req.body);

    // Add data from client to the global array
    calculatorInput.push(req.body);

    // Send back a 👍
    res.sendStatus(201);
})

// GET / endpoint
// localhost:5000/
app.get('/', (req, res) => {
    console.log('in GET /')
    res.send(outputToSend)
})

