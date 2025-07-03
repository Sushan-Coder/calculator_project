/*class Calculator {
  // ... (unchanged code)

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }
}

const numberButtons = document.querySelectorAll('.numButton');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equal-button');
const deleteButton = document.querySelector('.S-button');
const allClearButton = document.querySelector('.all-clear-button');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener('click', () => {
  calculator.compute();
  calculator.updateDisplay();
});

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});
*/

class Calculator {
  constructor(currentOperandTextElement) {
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.updateDisplay();
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }

  toggleSign() {
    if (this.currentOperand !== '') {
      this.currentOperand = (parseFloat(this.currentOperand) * -1).toString();
      this.updateDisplay();
    }
  }

  updateDisplay() {
    if (this.operation != null && this.previousOperand !== '') {
      this.currentOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation} ${this.currentOperand}`;
    } else {
      this.currentOperandTextElement.innerText = this.currentOperand;
    }
  }
}

// ✅ Only use currentOperandTextElement now
const currentOperandTextElement = document.querySelector('.current-operand');
const calculator = new Calculator(currentOperandTextElement);

// Number buttons
document.querySelectorAll('.numButton').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
  });
});

// Operation buttons
document.querySelectorAll('.operation').forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
  });
});

// Equals
document.querySelector('.equal-button').addEventListener('click', () => {
  calculator.compute();
});

// Clear
document.querySelector('.all-clear-button').addEventListener('click', () => {
  calculator.clear();
});

// Delete
document.querySelector('.S-button').addEventListener('click', () => {
  calculator.delete();
});

// +/- toggle
document.querySelector('.answer-button').addEventListener('click', () => {
  calculator.toggleSign();
});
