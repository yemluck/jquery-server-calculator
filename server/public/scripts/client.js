$(document).ready(onReady);

function onReady() {

    console.log('jQuery loaded');
    $('.operation').on('click', getOperator)
    $('#inputData').on('submit', sendInstruction)
    $('#clearBtn').on('click', clearInputs)
    //refresh()
};

function getOperator(evt) {
    evt.preventDefault()
    operation = $(this).data('math');
    return operation
} // end function operator

function sendInstruction(event) {
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


function refresh() {
    // this function contains AJAX get
    // this function renders response from server kinda
    $.ajax({
        method: 'GET',
        url: '/calculator'
    })
        .then((response) => {
            console.log('AJAX request complete in GET', response);
            console.log('is result in response', response[response.length - 1].result)
            // need a function to render response
            render(response)
        })

} // end function refresh




function render(arg) {
    // Do some jQuery to render data sent from server to DOM
    $('#result').empty();
    $('#history').empty();


    //for(let calculation of abc)
     $('#result').append(`
     <h2> Answer: ${arg[arg.length -1].result}</h2>
    `)
    
    // add history
    for(let history of arg){
        $('#history').append(`
        <ul>
            <li>${history.number1} ${history.operation}
        ${history.number2}</li>
        </ul>
        
        `)
    }
  

}// end function render

function clearInputs(){
    $('#result').empty();
    $('#history').empty()
}