// This file implements a simple calculator with basic arithmetic operations.
// It handles number entry, operator functions, and display updates.

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
 * Appends or replaces the number shown on the display.
 * @param {string} number - The number pressed.
 */
function sendNumberValue(number) {
    if (awaitingNextValue) {
        // If awaiting the next value, replace the display content.
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        // Otherwise, append the new number to the existing display content.
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
}

/**
 * Resets the calculator to its initial state.
 */
function clearCalculator() {
    // Reset stored values and refresh display to '0'.
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Attach click event to the clear button to reset the display.
clearBtn.addEventListener('click', clearCalculator);

/**
 * Adds a decimal point to the current number if needed.
 */
function addDecimal() {
    if (awaitingNextValue) return; // Prevent adding a decimal if waiting for new input.
    if (!calculatorDisplay.textContent.includes('.')) {
        // Append a decimal if one does not already exist.
        calculatorDisplay.textContent += '.';
    }
}

/**
 * Handles the operator input and calculates the result if needed.
 * @param {string} operator - The operator pressed.
 */
function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent); // Obtain current value from display.
    if (operatorValue && awaitingNextValue) {
        // Update operator if user changes their selection.
        operatorValue = operator;
        return;
    }
    if (!firstValue) {
        // Store the first value if none exists.
        firstValue = currentValue;
    } else {
        // Compute the result using the selected operator.
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
}

// Attach click events to each button based on its type.
inputBtns.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        // Number button: update display with the pressed number.
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        // Operator button: perform corresponding operation.
        inputButton.addEventListener('click', () => useOperator(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        // Decimal button: add a decimal point.
        inputButton.addEventListener('click', () => addDecimal());
    }
});

