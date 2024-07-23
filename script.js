let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let firstOperand;
let secondOperand;
let operation;

function operate(num1, num2, op) {
    switch (op) {
        case "+":
            add(num1, num2);
            break;
        case "-":
            subtract(num1, num2);
            break;
        case "*":
            multiply(num1, num2);
            break;
        case "/":
            divide(num1, num2);
            break;
    }
}

let displayVal = 0;

function changeDisplay(newDisplay) {
    if (isNaN(parseInt(newDisplay))) return;

    console.log(parseInt(newDisplay))
    const display = document.querySelector(".display");
    display.textContent = newDisplay;
    displayVal = newDisplay;
}

const buttons = document.querySelectorAll("button");
buttons.forEach((button) => button.addEventListener("click", (e) => changeDisplay(e.target.textContent)));
