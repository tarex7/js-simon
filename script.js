const numbers = document.querySelectorAll(".number");
const timerUI = document.getElementById("timer");
const info = document.getElementById("info");
const message = document.getElementById("message");
const userInput = document.getElementById("userInput");
const guessed = document.getElementById("guessed");
const numbersDiv = document.querySelector(".numbers");
const rndNumbers = [];
let count = 30;
let userInputNumbers = [];
let guessedNumbers = [];

//!Countdown
const counter = () => {
  --count;
  if (count === 0) {
    clearInterval(timer);
    numbersDiv.classList.add("hidden");
  }
  timerUI.innerText = count;
};

//!Funzione per creare tot numeri casuali tutti diversi
const createRndNumbers = (min, max, howManyNumbers) => {
  //Genera numeri casuali finchè l'array non raggiunge la lunghezza richiesta
  while (rndNumbers.length < howManyNumbers) {
    const rnd = Math.floor(Math.random() * (max - min)) + min;
    //se il numero casuale non è nell'array lo mette
    if (rndNumbers.indexOf(rnd) === -1) rndNumbers.push(rnd);

    for (let i = 0; i < rndNumbers.length; i++) {
      numbers[i].innerText = rndNumbers[i];
    }
  }
  console.log(rndNumbers);
};

//! Chiede all'utente di inserire tot numeri
const askNumbers = () => {
  for (let i = 0; i < rndNumbers.length; i++) {
    //Richiede input all'utente
    let userNumber = parseInt(prompt("Inserisci i numeri che ricordi"));

    //Validazione input
    while (userInputNumbers.includes(userNumber)) {
      alert("Hai già inserito questo numero!");
      userNumber = parseInt(prompt("Inserisci i numeri che ricordi"));
    }
    while (isNaN(userNumber)) {
      alert("Devi inserire un numero...");
      userNumber = parseInt(prompt("Inserisci i numeri che ricordi"));
    }

    //Array numeri inseriti dall'utente
    userInputNumbers.push(userNumber);

    //Array numeri indovinati
    if (userInputNumbers.includes(rndNumbers[i]))
      guessedNumbers.push(rndNumbers[i]);
  }

  for (let i = 0; i < rndNumbers.length; i++) {
    //Aggiunge sfondo verde ai numeri indovinati
    if (guessedNumbers.includes(parseInt(numbers[i].innerHTML))) {
      numbers[i].classList.add("guessed");
      //o rosso a quelli non indovinati
    } else {
      numbers[i].classList.add("not-guessed");
    }
  }
  //Mostra  nuovamente i numeri
  numbersDiv.classList.remove("hidden");
  info.classList.remove("hidden");
  //Mostra quanti e quali numeri sono stati indovinati
  message.innerText = `Hai indovinato ${guessedNumbers.length} numeri su ${rndNumbers.length}.`;
  guessed.innerText = `Numeri indovinati: ${guessedNumbers}`;
  userInput.innerText = `Numeri inseriti: ${userInputNumbers}`;
};

createRndNumbers(1, 100, 5);
setTimeout(askNumbers, count * 100 + 500);

//Todo Cambiare i ms
const timer = setInterval(counter, 100);
