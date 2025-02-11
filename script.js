const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

function sendNumberValue(number) {
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}

function clearCalculator() {
    calculatorDisplay.textContent = '';
}

inputBtns.forEach((inputButton) => {
    if (inputButton.classList.length === 0) {
        inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
    } else if (inputButton.classList.contains('operator')) {
        inputButton.addEventListener('click', () => sendOperatorValue(inputButton.value));
    } else if (inputButton.classList.contains('decimal')) {
        inputButton.addEventListener('click', () => addDecimal());
    }
});

