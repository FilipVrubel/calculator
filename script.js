let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let firstOperand;
let secondOperand;
let operation = 0;  
let lastButton; 
let firstNumberAssigned = false;

function operate(num1, num2, op) {
    let result;
    switch (op) {
        case "+":
            result = add(num1, num2);
            break;
        case "−":
            result = subtract(num1, num2);
            break;
        case "×":
            result = multiply(num1, num2);
            break;
        case "÷":
            if (num2 === 0) {
                clearCalculator();
                divError();
            }
            result = divide(num1, num2);
            break;
    }
 
    firstOperand = result;
    secondOperand = null;
    changeDisplay(result);
}

function divError() {
    const display = document.querySelector(".display");
    display.textContent = "LOL";
}

function changeOperand(num) {   
    if (!firstNumberAssigned) {
        firstOperand = num;

    } else {
        secondOperand = num;
    }
}

let displayVal = 0;

function changeDisplay(newDisplay) {
    const display = document.querySelector(".display");

    if (isNaN(parseInt(newDisplay))) return;

    if (typeof newDisplay === "number") {
        display.textContent = String(newDisplay);
        displayVal = newDisplay;
        changeOperand(displayVal);
        return;
    }

    displayVal = (!isNaN(parseInt(lastButton)) || lastButton == "⌫") ? displayVal * 10 + parseInt(newDisplay) : parseInt(newDisplay);
    display.textContent = String(displayVal);
    changeOperand(displayVal);
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", (e) => {
    changeDisplay(e.target.textContent);
    lastButton = e.target.textContent;
}));

const operations = document.querySelectorAll(".operation");
operations.forEach((op) => op.addEventListener("click", (e) => {
    lastButton = e.target.textContent;
    firstNumberAssigned = true;
    if (operation !== 0) {
        operate(firstOperand, secondOperand, operation);
    }
    operation = e.target.textContent;
}));

const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => clearCalculator());

function clearCalculator() {
    changeDisplay(0);
    firstOperand = undefined;
    secondOperand = undefined;
    operation = 0;
    lastButton = undefined;
    firstNumberAssigned = false;
}

const equalSign = document.querySelector(".equal");
equalSign.addEventListener("click", () => {
    if (firstOperand === undefined) return;

    if (secondOperand === null || secondOperand === undefined) {
        secondOperand = firstOperand;
    } 
    operate(firstOperand, secondOperand, operation);
    operation = 0;
})

const percent = document.querySelector(".percent");
percent.addEventListener("click", () => changeDisplay(displayVal / 100));

const backspace = document.querySelector(".backspace");
backspace.addEventListener("click", () => changeDisplay(Math.trunc(displayVal / 10)));
