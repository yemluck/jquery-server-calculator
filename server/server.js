const express = require('express');
const bodyParser = require('body-parser')
const app = express();
// listen on port 5000
const port = 5000;
// start up our server
app.listen(port, () => {
    console.log('Server ready to listen on port', port)
});

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

// Do not forget your bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



// Server proper 
// Global array to hold all of our data

let calculatorInput = [];
let calcResult = '';

// POST / endpoint
app.post('/calculator', (req, res) => {
    console.log('in POST line 28/', req.body);
    // Add data from client to the global array
    calculation(req.body);
    req.body.result = calcResult
    calculatorInput.push(req.body);
    //calculatorInput.result = calcResult
    // Send back a 👍
    res.sendStatus(201);
    console.log('this is calculator input line 35', calculatorInput)
    console.log('this is calculator input result line 36', calculatorInput[calculatorInput.length - 1].result)
})

function calculation(object) {
    //console.log('in calculation')
    if (object.operation === "+") {
        calcResult = Number(object.number1) + Number(object.number2)
    } else if (object.operation === "-") {
        calcResult = Number(object.number1) - Number(object.number2)
    } else if (object.operation === "*") {
        calcResult = Number(object.number1) * Number(object.number2)
    } else if (object.operation === "/") {
        calcResult = Number(object.number1) / Number(object.number2)
    }
} // end function calculation

// GET / endpoint
// localhost:5000/
app.get('/calculator', (req, res) => {
    console.log('this is calculatorInput', calculatorInput)
   // console.log('in GET  line 55/', calculatorInput[calculatorInput.length - 1].result);
    res.send(calculatorInput)
})

// function to do calculations for app.get which
// sends data back to the client side
