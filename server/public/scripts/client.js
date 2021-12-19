$(document).ready( onReady );

function onReady(){
    
    console.log('jQuery loaded');
    $('.operation').on('click', getOperator)
    $('#inputData').on('submit', sendInstruction)
    refresh()
};

function getOperator(evt){
    evt.preventDefault()
    operation = $(this).data('math');
return operation
} // end function operator

function sendInstruction(event){
    event.preventDefault();

    // Collect data input
    let calculatorData = {
        number1: $('#num1').val(),
        operation: operation,
        number2: $('#num2').val()
    } // end data

    // use AJAX to send data to server to add to database
    $.ajax({
        method: 'POST',
        url: '/calculator',
        data: calculatorData // turn to req.body on server
    })
        .then((response) => {
            console.log('POST response', response);
        })
        .catch((err) => {
            console.log('Post failed');
            alert('Something went wrong. Try again later')
        }) // failure on server.js
    $('#num1').val('');
    $('#num2').val('');
    $('#num1').focus();
    refresh()
} // end function sendInstruction


function refresh(){
    // this function contains AJAX get
    // this function renders response from server kinda
    $.ajax({
        method: 'GET',
        url: '/calculator'
    })
        .then((response) => {
           console.log('AJAX request complete in GET', response);
            // need a function to render response
            render(response)
        })

} // end function refresh




function render(calcResult){
    // Do some jQuery to render data sent from server to DOM
    $('#result').empty();
    //for(let item of calcResult)
    $('#result').append(`<h2> Answer: ${calcResult.result}</h2>`)

}// end function render
