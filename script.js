const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const words = [
  "Albania",
  "Andorra",
  "Austria",
  "Belarus",
  "Belgium",
  "Bulgaria",
  "Croatia",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Gibraltar",
  "Greece",
  "Guernsey",
  "Hungary",
  "Iceland",
  "Ireland",
  "Italy",
  "Jersey",
  "Kosovo",
  "Latvia",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Malta",
  "Monaco",
  "Montenegro",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "San Marino",
  "Serbia",
  "Slovakia",
  "Slovenia",
  "Spain",
  "Sweden",
  "Switzerland",
  "Ukraine",
];

let lives = 10;

/*
html - buttons for start and reset; +
html - 2 divs for letters and word in progress; +
css- along the way; +
JS: 
array letters, words to guess; +
query selector startgame ir resetgame; 
generate leters html; 
get word random; 
set html element for word; 
event listeners ant characters; 
handle guess : 
    show letters guessed; 
    handle finish scenario; 
    lives; 
    (hangman pic)
*/

function startGame() {
  function generateLetters() {
    const list = document.createElement("ul");
    alphabet.forEach((letter) => {
      let listItem = document.createElement("li");
      listItem.classList.add("letter");
      listItem.textContent = letter;
      list.appendChild(listItem);
    });
    document.querySelector("#letters").appendChild(list);
  }

  function setWordToDisplay(wordToGuess) {
    const list = document.createElement("ul");
    list.classList.add("word");
    for (let i = 0; i < wordToGuess.length; i++) {
      let listItem = document.createElement("li");
      listItem.classList.add("wordToGuessLetter");
      listItem.textContent = "_";
      list.appendChild(listItem);
    }
    document.querySelector("#guess-word").appendChild(list);
    document.querySelector("h2").textContent = `Lives left: ${lives}`;
  }

  function handleGuess(event) {
    event.target.classList.add("selected");
    event.target.removeEventListener("click", handleGuess);
    let lettersToGuess = document.querySelectorAll(".wordToGuessLetter");
    for (let i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === event.target.innerText) {
        lettersToGuess[i].innerText = event.target.innerText;
      }
    }
    if (!wordToGuess.includes(event.target.innerText)) {
      lives--;
      document.querySelector("h2").textContent = `Lives left: ${lives}`;
      drawArray[lives]();
      if (lives === 0) {
        setTimeout(function () {
          alert("game over"), 0;
        });
      }
    }
  }

  document.querySelector("#start").style.visibility = "hidden";

  generateLetters();
  canvas();

  let wordToGuess =
    words[Math.floor(Math.random() * words.length)].toUpperCase();
  console.log(wordToGuess);

  setWordToDisplay(wordToGuess);

  document.querySelectorAll(".letter").forEach((item) => {
    item.addEventListener("click", handleGuess);
  });

  //handle guess;
  //   show letters guessed; +
  //   handle finish scenario;
  //   lives;
  //   (hangman pic)
}

function resetGame() {
  document.location.reload();
}

document.querySelector("#start").addEventListener("click", startGame);
document.querySelector("#reset").addEventListener("click", resetGame);

canvas = function () {
  myStickman = document.getElementById("hangman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.strokeStyle = "aqua";
  context.lineWidth = 2;
};

head = function () {
  myStickman = document.getElementById("hangman");
  context = myStickman.getContext("2d");
  context.beginPath();
  context.arc(60, 25, 10, 0, Math.PI * 2, true);
  context.stroke();
};

draw = function (pathFromx, pathFromy, pathTox, pathToy) {
  context.moveTo(pathFromx, pathFromy);
  context.lineTo(pathTox, pathToy);
  context.stroke();
};

frame1 = function () {
  draw(0, 150, 150, 150);
};

frame2 = function () {
  draw(10, 0, 10, 600);
};

frame3 = function () {
  draw(0, 5, 70, 5);
};

frame4 = function () {
  draw(60, 5, 60, 15);
};

torso = function () {
  draw(60, 36, 60, 70);
};

rightArm = function () {
  draw(60, 46, 100, 50);
};

leftArm = function () {
  draw(60, 46, 20, 50);
};

rightLeg = function () {
  draw(60, 70, 100, 100);
};

leftLeg = function () {
  draw(60, 70, 20, 100);
};

drawArray = [
  rightLeg,
  leftLeg,
  rightArm,
  leftArm,
  torso,
  head,
  frame4,
  frame3,
  frame2,
  frame1,
];
