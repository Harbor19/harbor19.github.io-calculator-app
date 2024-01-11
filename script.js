const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number){
    if(awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
         //If current display value is 0, replace it , if not add the values
        const displayValue =  calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

function addDecimal() {
    //if operator is active, no more decimal
    if (awaitingNextValue) return;
    //if no decimal, add one
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

//Calculate first and second values based on the operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
} 

function useOperator (operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    //Do not use multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return;
    };

    if (!firstValue) {
        firstValue = currentValue;
    }else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

// Add event listeners for numbers, operators and decimal buttons
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

//reset 
function resetAll() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}
clearBtn.addEventListener('click', resetAll);

