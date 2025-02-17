// This file implements a simple calculator with basic arithmetic operations.
// It provides functions for number entry, operator handling, and display updates.

// Constant declarations
const calculatorDisplay = document.querySelector('h1'); // Main display element
const clearBtn = document.getElementById('clear-btn'); // Button to clear the screen
const inputBtns = document.querySelectorAll('button'); // Collection of all calculator buttons

// Map of operators to their corresponding arithmetic functions.
const calculate = {
	'+': (num1, num2) => num1 + num2, // Addition function
	'-': (num1, num2) => num1 - num2, // Subtraction function
	'*': (num1, num2) => num1 * num2, // Multiplication function
	'/': (num1, num2) => num1 / num2  // Division function
};

// Variable declarations for tracking calculator state
let awaitingNextValue = false;
let firstValue = 0;
let operatorValue = '';

/**
 * Updates the calculator display when a number button is pressed.
 * If awaiting a new value, it appends the number; otherwise, it replaces the initial zero.
 * @param {string} number - The pressed number.
 */
function sendNumberValue(number) {
    if (awaitingNextValue) {
        calculatorDisplay.textContent += number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

/**
 * Resets the calculator state and clears the display.
 * This function sets the display back to '0' and resets stored values.
 */
function clearCalculator() {
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Attach click event to the clear button to invoke clearCalculator.
clearBtn.addEventListener('click', clearCalculator);

/**
 * Appends a decimal point to the current number on the display.
 * Prevents multiple decimals by checking if one already exists.
 */
function addDecimal() {
    if (awaitingNextValue) return;
    if (!calculatorDisplay.textContent.includes('.')) {
        calculatorDisplay.textContent += '.';
    }
}

/**
 * Maps an operator to its display equivalent.
 * Returns 'x' for multiplication and '÷' for division; returns the operator unchanged otherwise.
 * @param {string} operator - The operator symbol.
 * @returns {string} - The display equivalent of the operator.
 */
function getOperatorDisplay(operator) {
    if (operator === '*') {
        return 'x';
    } else if (operator === '/') {
        return '÷';
    } else {
        return operator;
    }
}

/**
 * Processes the operator input, performs calculations if applicable,
 * and updates the display with the operator symbol in its display format.
 * @param {string} operator - The operator pressed.
 */
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);
    
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        // Replace the last operator in the display with the new operator.
        calculatorDisplay.textContent = calculatorDisplay.textContent.slice(0, -1) + getOperatorDisplay(operator);
        return;
    }
    
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        // Include the division display symbol '÷' in the regex for correct parsing.
        const operatorIndex = calculatorDisplay.textContent.search(/[+\-x÷]/);
        if (operatorIndex !== -1) {
            const secondNumber = calculatorDisplay.textContent.slice(operatorIndex + 1);
            if (secondNumber !== '') {
                const calculation = calculate[operatorValue](firstValue, Number(secondNumber));
                calculatorDisplay.textContent = calculation;
                firstValue = calculation;
            }
        }
    }
    
    operatorValue = operator;
    
    // Append the display format of the operator.
    calculatorDisplay.textContent += getOperatorDisplay(operator);
    awaitingNextValue = true;
}

// Attach click events to each calculator button based on type.
inputBtns.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
});

