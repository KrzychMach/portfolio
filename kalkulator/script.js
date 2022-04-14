document.addEventListener("DOMContentLoaded", function() {
    class Calculator {
    constructor(prevOperandText, currOperandText){
        this.prevOperandText = prevOperandText;
        this.currOperandText = currOperandText;
        this.clear();
    }

    clear(){
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    appendNumber(number){
        if (resetCurrOperand){
            this.currOperand = '';
            resetCurrOperand = 0;
        }
        if (number === '.' && this.currOperand.includes('.')) return;
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if (this.currOperand === '') return;
        if (this.prevOperand !== '') this.compute();
        this.operation = operation
        this.prevOperand = this.currOperand.toString();
        this.currOperand = '';
        
    }

    compute(){
        let result;
        let prev = parseFloat(this.prevOperand);
        let curr = parseFloat(this.currOperand);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (this.operation){
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default: return;
        }
        this.currOperand = result;
        this.prevOperand = '';
        this.operation = undefined;
        resetCurrOperand = 1;
    }

    updateDisplay(){
        this.currOperandText.innerText = this.currOperand;
        if (this.operation != undefined){
            this.prevOperandText.innerText = 
                this.prevOperand + ' ' + this.operation;
        } else {
            this.prevOperandText.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevOperandText = document.querySelector('[data-prev-operand]');
const currOperandText = document.querySelector('[data-curr-operand]');
let resetCurrOperand = 0;

const calculator = new Calculator(prevOperandText, currOperandText);

numberButtons.forEach(button =>{
   button.addEventListener('click', () =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationButtons.forEach(button =>{
    button.addEventListener('click', () =>{
         calculator.chooseOperation(button.innerText);
         calculator.updateDisplay();
     })
});

equalsButton.addEventListener('click', () =>{
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

});