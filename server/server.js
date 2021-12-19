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



// Server proper 
// Global array to hold all of our data

let calculatorInput = [];
let calculatorOutput = [];
let calcResult = '';

// POST / endpoint
app.post('/calculator', (req,res) => {
    console.log('in POST /', req.body);
    // Add data from client to the global array
    calculation(req.body);
    calculatorInput.push(req.body);
    // Send back a 👍
    res.sendStatus(201);
    console.log('this is calculator input',calculatorInput)
    console.log(typeof calculatorInput[0].operation )
    console.log(typeof calculatorInput[0].number1)
    console.log(typeof calculatorInput[0].number2)
    console.log(calculatorInput[0].operation)
})

function calculation(object){
    console.log('in calculation')
    if (object.operation === "+"){
        calcResult = Number(object.number1) + Number(object.number2)
    } else if (object.operation === "-"){
        calcResult = Number(object.number1) - Number(object.number2)
    } else if (object.operation === "*"){
        calcResult = Number(object.number1) * Number(object.number2)
    } else if (object.operation === "/") {
        calcResult = Number(object.number1) / Number(object.number2)
    }
} // end function calculation

// GET / endpoint
// localhost:5000/
app.get('/calculator', (req, res) => {
    console.log('in GET /', calculatorInput)
    res.send({result: calcResult})
})

// function to do calculations for app.get which
// sends data back to the client side

