let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

let firstOperand;
let secondOperand;
let operation = 0;  
let lastButton; 
let firstNumberAssigned = false;

/*  1. User clicks number
        - firstOperand equals that number
    2. User clicks operation
        - assign it to the operation variable
    3. User click second number
        - assign it to the secondOperand variable
    4. User clicks another operation
        - Call operate with those 3 variables (firstOperand, secondOperand, operation)
        - need to parse the numbers
        - change the operation variable to the new operation
    6. Change display with the result
    7. Asign the result to the first operand
    When to call the operate function?
    When the second operand is given
    */
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
    display.textContent = "DivError";
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
    if (isNaN(parseInt(newDisplay))) return;

    const display = document.querySelector(".display");

    if (typeof newDisplay === "number") {
        display.textContent = String(newDisplay);
        displayVal = newDisplay;
        return;
    }

    displayVal = !isNaN(parseInt(lastButton)) ? displayVal * 10 + parseInt(newDisplay) : parseInt(newDisplay);
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
/* 
1
+
2
* => 3
4
- => 12
2
/ => 10
5
+ => 2
*/