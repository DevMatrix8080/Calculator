document.addEventListener("DOMContentLoaded", function () {
  const resultDisplay = document.querySelector(".result-display");
  const operationDisplay = document.querySelector(".operation-display");
  let currentInput = "";
  let firstOperand = null;
  let operator = null;
  let waitingForSecondOperand = false;
  
  // Resetta il display dell'operazione all'avvio
  operationDisplay.textContent = "";

  // Funzione per aggiornare il display del risultato
  function updateResultDisplay() {
    resultDisplay.textContent = currentInput || "0";
  }

  // Funzione per aggiornare il display dell'operazione
  function updateOperationDisplay() {
    if (firstOperand !== null && operator) {
      operationDisplay.textContent = `${firstOperand} ${getOperatorSymbol(operator)}`;
      if (currentInput && !waitingForSecondOperand) {
        operationDisplay.textContent += ` ${currentInput}`;
      }
    } else {
      operationDisplay.textContent = "";
    }
  }

  // Funzione per ottenere il simbolo dell'operatore
  function getOperatorSymbol(op) {
    switch (op) {
      case "+":
        return "+";
      case "-":
        return "-";
      case "*":
        return "×";
      case "/":
        return "/";
      case "%":
        return "%";
      default:
        return op;
    }
  }

  // Gestione dei clic sui pulsanti
  document
    .querySelector(".calculator-keys")
    .addEventListener("click", function (event) {
      const target = event.target;

      if (!target.matches("button")) {
        return;
      }

      // Gestione dei numeri
      if (target.classList.contains("number")) {
        if (waitingForSecondOperand) {
          currentInput = target.value;
          waitingForSecondOperand = false;
        } else {
          currentInput =
            currentInput === "0" ? target.value : currentInput + target.value;
        }
        updateResultDisplay();
        updateOperationDisplay();
      }

      // Gestione del punto decimale
      if (target.classList.contains("decimal")) {
        if (waitingForSecondOperand) {
          currentInput = "0.";
          waitingForSecondOperand = false;
        } else if (!currentInput.includes(".")) {
          currentInput += ".";
        }
        updateResultDisplay();
        updateOperationDisplay();
      }

      // Gestione degli operatori
      if (target.classList.contains("operator")) {
        const nextOperator = target.value;

        if (currentInput && !waitingForSecondOperand) {
          if (firstOperand === null) {
            firstOperand = parseFloat(currentInput);
          } else if (operator) {
            const result = calculate(
              firstOperand,
              parseFloat(currentInput),
              operator
            );
            currentInput = String(result);
            firstOperand = result;
          }

          waitingForSecondOperand = true;
          operator = nextOperator;
          updateResultDisplay();
          updateOperationDisplay();
        }
      }

      // Gestione del pulsante uguale
      if (target.classList.contains("equal-sign")) {
        if (currentInput && operator && firstOperand !== null) {
          const secondOperand = parseFloat(currentInput);
          const result = calculate(firstOperand, secondOperand, operator);

          // Aggiorna il display dell'operazione con l'operazione completa
          operationDisplay.textContent = `${firstOperand} ${getOperatorSymbol(
            operator
          )} ${secondOperand}`;

          currentInput = String(result);
          firstOperand = null;
          operator = null;
          waitingForSecondOperand = true;

          updateResultDisplay();
        }
      }

      // Gestione del pulsante percentuale
      if (target.classList.contains("percent")) {
        if (currentInput) {
          const result = parseFloat(currentInput) / 100;
          currentInput = String(result);
          updateResultDisplay();
          updateOperationDisplay();
        }
      }

      // Gestione del pulsante backspace
      if (target.classList.contains("backspace")) {
        if (currentInput.length > 1) {
          currentInput = currentInput.slice(0, -1);
        } else {
          currentInput = "0";
        }
        updateResultDisplay();
        updateOperationDisplay();
      }

      // Gestione del pulsante AC (All Clear)
      if (target.classList.contains("all-clear")) {
        currentInput = "0";
        firstOperand = null;
        operator = null;
        waitingForSecondOperand = false;
        operationDisplay.textContent = "";
        updateResultDisplay();
      }
    });

  // Funzione per eseguire i calcoli
  function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
      case "+":
        return firstOperand + secondOperand;
      case "-":
        return firstOperand - secondOperand;
      case "*":
        return firstOperand * secondOperand;
      case "/":
        return firstOperand / secondOperand;
      default:
        return secondOperand;
    }
  }

  // Inizializza il display
  updateResultDisplay();
});
