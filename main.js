class Calculator
{
    constructor(previousOperandText, currentOperandText)
    {
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear()
    {
        this.previousOperand = "";
        this.currentOperand = "";
        this.operation = undefined;
    }

    appendNumber(number)
    {
        if (number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    pickOperation(operation)
    {
        if (this.currentOperand === "") return;
        if (this.previousOperand != "")
        {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
        this.previousOperand = this.previousOperand + operation;
         
    }

    display()
    {
        this.currentOperandText.innerText = this.currentOperand;
        this.previousOperandText.innerText = this.previousOperand;
    }

    delete()
    {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    compute()
    {
        let result;
        const prev = parseFloat(this.previousOperand); // previouseOperand
        const curr = parseFloat(this.currentOperand);  // currentOPerand
        if(isNaN(prev) || isNaN(curr)) return;
        switch (this.operation)
        {
            case "+":
                result = prev + curr;
                break;
            case "-":
                result = prev - curr;
                break;
            case "*":
                result = prev * curr;
                break;
            case "÷":
                result = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = result;
        this.previousOperand = "";            
    }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operand]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandText = document.querySelector("[data-previousOperand]");
const currentOperandText = document.querySelector("[data-currentOperand]");

const calculator = new Calculator(previousOperandText, currentOperandText);

numberButtons.forEach(button => 
    {
        button.addEventListener("click", () =>
        {
            calculator.appendNumber(button.innerText);
            calculator.display();
        })
    })

    operationButtons.forEach(button => 
        {
            button.addEventListener("click", () =>
            {
                calculator.pickOperation(button.innerText);
                calculator.display();
            })
        })

clearButton.addEventListener("click", () => 
{
    calculator.clear();
    calculator.display();
});

equalButton.addEventListener("click", () => 
{
    calculator.compute();
    calculator.display();
})

deleteButton.addEventListener("click", () =>
{
    calculator.delete();
    calculator.display();
})